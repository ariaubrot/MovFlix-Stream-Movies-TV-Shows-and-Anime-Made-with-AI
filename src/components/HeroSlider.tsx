import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTrendingMovies, getTrendingTVShows, getImageUrl } from '../services/tmdb';
import { SliderItem } from '../types/media';
import { mapToSliderItem } from '../utils/mediaMapper';

export default function HeroSlider() {
  const [items, setItems] = useState<SliderItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const [movieData, tvData] = await Promise.all([
          getTrendingMovies(),
          getTrendingTVShows()
        ]);
        
        const combinedItems = [
          ...movieData.data.results.slice(0, 5).map(item => mapToSliderItem(item, 'movie')),
          ...tvData.data.results.slice(0, 5).map(item => mapToSliderItem(item, 'tv'))
        ];
        
        setItems(combinedItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching trending items');
        console.error('Error fetching trending items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const slideChange = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % items.length;
      }
      return (prev - 1 + items.length) % items.length;
    });

    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => slideChange('next');
  const prevSlide = () => slideChange('prev');

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [items.length, isAnimating]);

  if (error) {
    return (
      <div className="h-[500px] sm:h-[600px] bg-black/20 flex items-center justify-center">
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

  if (isLoading || items.length === 0) {
    return (
      <div className="h-[500px] sm:h-[600px] bg-black/20 animate-pulse flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff4d00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const nextItem = items[(currentIndex + 1) % items.length];
  const prevItem = items[(currentIndex - 1 + items.length) % items.length];

  return (
    <div className="relative h-[300px] sm:h-[500px] w-full overflow-hidden bg-black border-2 border-[#ff4d00] rounded-xl">
      {/* Backdrop Image with Ken Burns effect */}
      <div className="absolute inset-0 transition-transform duration-[8s] ease-out transform scale-105">
        <img
          src={getImageUrl(currentItem.backdrop_path)}
          alt=""
          className="w-full h-full object-cover opacity-50 transition-opacity duration-500"
          style={{ transform: isAnimating ? 'scale(1.1)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        {/* Text Content */}
        <div 
          className="w-full lg:w-1/2 z-10 space-y-4 sm:space-y-6 transition-all duration-500 ease-out"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(20px)' : 'translateY(0)'
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
            {currentItem.title || currentItem.name}
          </h1>
          
          <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl line-clamp-3 animate-fade-in delay-100">
            {currentItem.overview}
          </p>
          
          <div className="flex items-center gap-4 animate-fade-in delay-200">
            <Link
              to={`/${currentItem.type}/${currentItem.id}`}
              className="group inline-flex items-center gap-2 bg-[#ff4d00] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#ff6b2c] hover:shadow-lg hover:shadow-[#ff4d00]/20 transform hover:scale-105"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm sm:text-base">Watch Now</span>
            </Link>
          </div>
        </div>

        {/* Cards Carousel */}
        <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 gap-4">
          {/* Previous Card */}
          <div 
            className="relative w-40 xl:w-48 aspect-[2/3] rounded-2xl overflow-hidden opacity-40 transform transition-all duration-500 ease-out hover:opacity-60 cursor-pointer"
            style={{ transform: `scale(0.9) ${isAnimating ? 'translateX(-20px)' : ''}` }}
            onClick={prevSlide}
          >
            <img
              src={getImageUrl(prevItem.poster_path)}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Current Card */}
          <div 
            className="relative w-40 xl:w-48 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ease-out hover:scale-115"
            style={{ transform: `scale(1.1) ${isAnimating ? 'translateY(-10px)' : ''}` }}
          >
            <img
              src={getImageUrl(currentItem.poster_path)}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Next Card */}
          <div 
            className="relative w-40 xl:w-48 aspect-[2/3] rounded-2xl overflow-hidden opacity-40 transform transition-all duration-500 ease-out hover:opacity-60 cursor-pointer"
            style={{ transform: `scale(0.9) ${isAnimating ? 'translateX(20px)' : ''}` }}
            onClick={nextSlide}
          >
            <img
              src={getImageUrl(nextItem.poster_path)}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex gap-2">
        <button
          onClick={prevSlide}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 disabled:opacity-50"
          disabled={isAnimating}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 disabled:opacity-50"
          disabled={isAnimating}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>
    </div>
  );
}