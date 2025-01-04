import { tmdb } from '@/lib/axios';
import { Media, MediaDetails } from '@/types';

interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export async function getTrending(page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/trending/all/week', { params: { page } });
  return data;
}

export async function getTrendingAll() {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/trending/all/day');
  return { data };
}

export async function getTrendingMovies() {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/trending/movie/day');
  return { data };
}

export async function getTrendingTVShows() {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/trending/tv/day');
  return { data };
}

export async function getPopularMovies(page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/movie/popular', { params: { page } });
  return { data };
}

export async function getPopularTVShows(page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/tv/popular', { params: { page } });
  return { data };
}

export async function getTopRatedMovies(page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/movie/top_rated', { params: { page } });
  return { data };
}

export async function getTopRatedTVShows(page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/tv/top_rated', { params: { page } });
  return { data };
}

export async function getUpcomingMovies(page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/movie/upcoming', { params: { page } });
  return { data };
}

export async function getUpcomingTVShows(page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/tv/on_the_air', { params: { page } });
  return { data };
}

export async function getNewReleaseMovies(page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/movie/now_playing', { params: { page } });
  return { data };
}

export async function getNewReleaseTVShows(page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/tv/airing_today', { params: { page } });
  return { data };
}

export async function getMovieDetails(id: string) {
  const { data } = await tmdb.get<MediaDetails>(`/movie/${id}`, {
    params: { append_to_response: 'videos,credits,recommendations' }
  });
  return { data };
}

export async function getTVDetails(id: string) {
  const { data } = await tmdb.get<MediaDetails>(`/tv/${id}`, {
    params: { append_to_response: 'videos,credits,recommendations' }
  });
  return { data };
}

export async function searchMovies(query: string, page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/search/multi', {
    params: { query, page }
  });
  return { data };
}

export async function searchMedia(query: string, page = 1) {
  const { data } = await tmdb.get<TMDBResponse<Media>>('/search/multi', {
    params: { query, page }
  });
  return { data };
}

export function getImageUrl(path: string | null, size = 'original') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}