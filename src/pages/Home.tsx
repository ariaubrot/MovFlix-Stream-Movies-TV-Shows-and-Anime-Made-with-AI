import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';
import HeroSlider from '../components/HeroSlider';
import { getPopularMovies, getTrendingAll } from '../services/tmdb';
import { MediaItem } from '../types/media';
import { mapToMediaItem } from '../utils/mediaMapper';

export default function Home() {
  const [popularItems, setPopularItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [popularData, trendingData] = await Promise.all([
          getPopularMovies(),
          getTrendingAll()
        ]);

        const mappedPopularItems = popularData.data.results.map(item => 
          mapToMediaItem(item, 'movie')
        );

        setPopularItems(mappedPopularItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching content');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleFilterChange = (filteredItems: any[]) => {
    const mappedItems = filteredItems.map(item => 
      mapToMediaItem(item, item.media_type || 'movie')
    );
    setPopularItems(mappedItems);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#00a6ed] text-white px-4 py-2 rounded-lg hover:bg-[#0095d6] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00a6ed]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 sm:px-8 lg:px-16 mb-[90px]">
      <HeroSlider />

      <div className="space-y-8">
        <FilterBar onFilterChange={handleFilterChange} />

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="text-[#00a6ed] mr-2">▶</span> Only For You
            </h2>
            <Link
              to="/movies"
              className="text-sm text-gray-400 hover:text-white flex items-center"
            >
              View more <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {popularItems.slice(0, 18).map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}