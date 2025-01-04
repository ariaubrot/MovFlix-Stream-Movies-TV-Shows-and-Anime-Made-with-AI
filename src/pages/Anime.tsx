import { useMedia } from '../hooks/useMedia';
import MovieCard from '../components/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingGrid } from '../components/LoadingGrid';
import { ErrorMessage } from '../components/ErrorMessage';
import { Filter } from 'lucide-react';

export default function Anime() {
  const { items, loading, error, hasMore, loadMore } = useMedia('anime');

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading && items.length === 0) {
    return <LoadingGrid />;
  }

  // Fallback for poster_path when it's null
  const getPosterPath = (posterPath: string | null): string => {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '/path/to/default/image.jpg'; // Replace with your default image URL
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Anime Series</h1>
        <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-4">
            <div className="w-8 h-8 border-2 border-[#00a6ed] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {items.map((item) => (
          <MovieCard 
            key={item.id} 
            item={{
              ...item,
              media_type: 'tv',
              title: item.name, // Ensure title is set for anime series
              poster_path: getPosterPath(item.poster_path), // Use fallback if null
            }} 
          />
        ))}
      </InfiniteScroll>

      {items.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">No anime series found</p>
        </div>
      )}
    </div>
  );
}