import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../components/MovieCard';
import { getPopularTVShows } from '../services/tmdb';

export default function TVShows() {
  const [shows, setShows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchShows = async () => {
    try {
      const { data } = await getPopularTVShows(page);
      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }
      const showsWithType = data.results.map(show => ({
        ...show,
        media_type: 'tv'
      }));
      setShows(prev => [...prev, ...showsWithType]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">TV Shows</h1>
      <InfiniteScroll
        dataLength={shows.length}
        next={fetchShows}
        hasMore={hasMore}
        loader={<div className="text-center py-4">Loading...</div>}
        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {shows.map((show, index) => (
          <MovieCard 
            key={`${show.id}-${page}-${index}`}
            item={show}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}