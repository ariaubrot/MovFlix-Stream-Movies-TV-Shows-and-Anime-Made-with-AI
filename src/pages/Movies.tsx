import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../components/MovieCard';
import { getPopularMovies } from '../services/tmdb';

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async () => {
    try {
      const { data } = await getPopularMovies(page);
      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }
      const moviesWithType = data.results.map(movie => ({
        ...movie,
        media_type: 'movie'
      }));
      setMovies(prev => [...prev, ...moviesWithType]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mb-[85px]">
      <h1 className="text-2xl font-bold mb-6">Movies</h1>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={hasMore}
        loader={<div className="text-center py-4">Loading...</div>}
        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {movies.map((movie, index) => (
          <MovieCard 
            key={`${movie.id}-${page}-${index}`} 
            item={{
              ...movie,
              media_type: 'movie'
            }} 
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}