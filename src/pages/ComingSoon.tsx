import  { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getUpcomingMovies, getUpcomingTVShows } from '../services/tmdb';

export default function ComingSoon() {
  const [movies, setMovies] = useState<any[]>([]);
  const [tvShows, setTvShows] = useState<any[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [moviesData, tvData] = await Promise.all([
          getUpcomingMovies(),
          getUpcomingTVShows()
        ]);
        setMovies(moviesData.data.results.map(movie => ({
          ...movie,
          media_type: 'movie'
        })));
        setTvShows(tvData.data.results.map(show => ({
          ...show,
          media_type: 'tv'
        })));
      } catch (error) {
        console.error('Error fetching upcoming content:', error);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mb-[85px]">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Upcoming Movies</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.slice(0, 18).map((movie) => (
            <MovieCard key={movie.id} item={movie} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Upcoming TV Shows</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {tvShows.slice(0, 18).map((show) => (
            <MovieCard key={show.id} item={show} />
          ))}
        </div>
      </section>
    </div>
  );
}