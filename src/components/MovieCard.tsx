import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import { formatRating, formatDate } from '@/utils/formatters';
import { useInView } from 'react-intersection-observer';
import { getImageUrl } from '@/services/tmdb';

interface MovieCardProps {
  item: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    overview: string;
    media_type: string;
  };
}

export default function MovieCard({ item }: MovieCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const title = item.title || item.name || '';
  const date = item.release_date || item.first_air_date;
  const year = date ? new Date(date).getFullYear() : '';
  const type = item.media_type === 'tv' ? 'TV Show' : 'Movie';
  const link = item.media_type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`;

  // Generate srcset for responsive images
  const generateSrcSet = (path: string | null) => {
    if (!path) return '';
    return `
      ${getImageUrl(path, 'w200')} 200w,
      ${getImageUrl(path, 'w300')} 300w,
      ${getImageUrl(path, 'w400')} 400w,
      ${getImageUrl(path, 'w500')} 500w
    `;
  };

  return (
    <div
      ref={ref}
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Link to={link} className="block">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
          {inView && (
            <>
              <img
                src={getImageUrl(item.poster_path, 'w200')}
                srcSet={generateSrcSet(item.poster_path)}
                sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                alt={title}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transform transition-all duration-300 ${
                  isLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
                }`}
              />
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
              )}
            </>
          )}
          <div className="absolute top-2 left-2">
            <span className="bg-[#00a6ed] text-xs font-medium px-2 py-1 rounded">
              HD
            </span>
          </div>
        </div>

        <div className="mt-2 space-y-1">
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <span>{year}</span>
            <span>•</span>
            <span>{type}</span>
            {item.vote_average > 0 && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{formatRating(item.vote_average)}</span>
                </div>
              </>
            )}
          </div>
          <h3 className="text-sm font-medium text-white group-hover:text-[#00a6ed] transition-colors line-clamp-2">
            {title}
          </h3>
        </div>
      </Link>

      {showTooltip && (
        <div className="absolute z-50 w-72 bg-[#1a2630] rounded-lg shadow-xl p-4 left-full ml-4 top-0">
          <h4 className="font-semibold text-lg mb-2">{title}</h4>

          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm">{formatRating(item.vote_average)}</span>
            </div>
            {year && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">{year}</span>
              </div>
            )}
            <span className="text-sm text-gray-400">{type}</span>
          </div>

          <p className="text-sm text-gray-300 line-clamp-4">{item.overview}</p>

          <Link
            to={link}
            className="mt-4 block w-full bg-[#00a6ed] text-white text-center py-2 rounded-lg hover:bg-[#0095d6] transition-colors"
          >
            Watch Now
          </Link>
        </div>
      )}
    </div>
  );
}