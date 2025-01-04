import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getTopRatedMovies, getTopRatedTVShows } from '../services/tmdb';
import { LoadingGrid } from '../components/LoadingGrid';
import { ErrorMessage } from '../components/ErrorMessage';

export default function TopRated() {
  const [movies, setMovies] = useState<any[]>([]);
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [moviesData, tvData] = await Promise.all([
          getTopRatedMovies(),
          getTopRatedTVShows()
        ]);
        
        setMovies(moviesData.data.results.map(movie => ({
          ...movie,
          media_type: 'movie'
        })));
        
        setTvShows(tvData.data.results.map(show => ({
          ...show,
          media_type: 'tv'
        })));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching content');
        console.error('Error fetching top rated content:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading) {
    return <LoadingGrid />;
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-[85px]">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Top Rated Movies</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.slice(0, 18).map((movie) => (
            <MovieCard key={movie.id} item={movie} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Top Rated TV Shows</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {tvShows.slice(0, 18).map((show) => (
            <MovieCard key={show.id} item={show} />
          ))}
        </div>
      </section>
    </div>
  );
}