import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import FilterBar from '../components/FilterBar';
import { getPopularMovies, getTrendingMovies, getTopRatedMovies } from '../services/tmdb';

export default function Discover() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'popular';
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let data;
        switch (category) {
          case 'trending':
            data = await getTrendingMovies();
            break;
          case 'top-rated':
            data = await getTopRatedMovies();
            break;
          default:
            data = await getPopularMovies();
        }
        setItems(data.data.results);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Discover</h1>
      <FilterBar onFilterChange={setItems} />
      
      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-700 h-[280px] rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {items.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}