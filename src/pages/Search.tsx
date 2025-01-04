import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/tmdb';
import { Filter } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      if (!query) {
        setMovies([]);  // Reset results when query is empty
        setLoading(false);
        return;
      }

      try {
        // Fetching search results from TMDB API
        const { data } = await searchMovies(query);

        // Ensure to map media_type correctly
        const results = data.results.map((item: any) => ({
          ...item,
          media_type: item.media_type,  // Directly use the media_type field
        }));

        setMovies(results);  // Set the search results state
      } catch (error) {
        console.error('Error searching movies and TV shows:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Search Results for "{query}"</h2>
        <button className="flex items-center space-x-2 bg-[#1a2630] px-4 py-2 rounded-lg hover:bg-[#243340] transition-colors">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-700 aspect-[2/3] rounded-lg"></div>
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
