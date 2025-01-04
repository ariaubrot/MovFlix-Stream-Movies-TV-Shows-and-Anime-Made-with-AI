import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Star, Calendar, Clock, Globe, Play, Heart, Share2 } from 'lucide-react';
import { getMovieDetails, getTVDetails } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import VideoProviders from '../components/VideoProviders';
import StreamingProviders from '../components/StreamingProviders';
import DownloadOptions from '../components/DownloadOptions';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const isTV = location.pathname.includes('/tv/');

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const response = isTV ? await getTVDetails(id) : await getMovieDetails(id);
        setDetails(response.data);
        document.title = `${response.data.title || response.data.name} - Watch Online`;
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, isTV]);

  if (loading || !details) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00a6ed]"></div>
      </div>
    );
  }

  const title = details.title || details.name;
  const releaseYear = new Date(details.release_date || details.first_air_date).getFullYear();
  const runtime = isTV ? `${details.episode_run_time?.[0] || 'N/A'} min` : `${details.runtime || 'N/A'} min`;
  const trailerKey = details.videos?.results?.find((v: any) => v.type === 'Trailer')?.key;

  // Fixed getImageUrl function (handling null paths)
  const getImageUrlWithFallback = (path: string | null, size: string = 'original'): string => {
    if (!path) {
      return '/path/to/default/image.jpg';  // Use a default fallback image URL
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  return (
    <div className="min-h-screen bg-[#0a1014]">
      {/* Hero Section */}
      <div className="relative h-[95vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getImageUrlWithFallback(details.backdrop_path)}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1014] via-[#0a1014]/60 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            {/* Poster */}
            <div className="w-64 md:w-80 flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
              <img
                src={getImageUrlWithFallback(details.poster_path)}
                alt={title}
                className="w-full rounded-lg shadow-2xl border-4 border-white/10"
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{title}</h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white">{details.vote_average?.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="w-5 h-5" />
                  <span>{releaseYear}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5" />
                  <span>{runtime}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Globe className="w-5 h-5" />
                  <span>{details.original_language?.toUpperCase()}</span>
                </div>
              </div>

              <p className="text-lg text-gray-300 mb-8 line-clamp-3 md:line-clamp-none">
                {details.overview}
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="flex items-center gap-2 bg-[#00a6ed] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0095d6] transition-all duration-300 transform hover:scale-105">
                  <Play className="w-5 h-5" />
                  Watch Now
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 ${
                    isLiked ? 'text-red-500' : 'text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </button>
                <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Providers with Trailer */}
      {id && (
        <VideoProviders
          id={id}
          type={isTV ? 'tv' : 'movie'}
          title={title}
          trailerKey={trailerKey}
        />
      )}

      {/* Streaming Providers */}
      <StreamingProviders title={title} />

      {/* Download Options */}
      <DownloadOptions title={title} year={releaseYear} />

      {/* Cast Section */}
      {details.credits?.cast?.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {details.credits.cast.slice(0, 10).map((actor: any) => (
              <div key={actor.id} className="flex-shrink-0 w-32">
                <img
                  src={getImageUrlWithFallback(actor.profile_path, 'w185')}
                  alt={actor.name}
                  className="w-32 h-32 object-cover rounded-full border-2 border-white/10"
                />
                <h3 className="text-center mt-2 font-medium">{actor.name}</h3>
                <p className="text-center text-sm text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Section */}
      {details.recommendations?.results?.length > 0 && (
        <div className="container mx-auto px-4 py-12 mb-[90px]">
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {details.recommendations.results.slice(0, 12).map((item: any) => (
              <MovieCard
                key={item.id}
                item={{
                  ...item,
                  media_type: isTV ? 'tv' : 'movie',
                  poster_path: item.poster_path || '', // Use fallback if null
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
