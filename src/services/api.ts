import axios from 'axios';
import { MediaType } from '../types/common';
import { MediaItem } from '../types/media';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../config/constants';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export async function fetchData<T>(endpoint: string, params = {}): Promise<T> {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    const apiError = new Error('API request failed') as ApiError;
    if (axios.isAxiosError(error)) {
      apiError.status = error.response?.status;
      apiError.code = error.code;
      apiError.message = error.response?.data?.status_message || error.message;
    }
    throw apiError;
  }
}

export async function fetchMediaItems(type: MediaType, page = 1): Promise<MediaItem[]> {
  const endpoint = type === 'anime' 
    ? '/discover/tv'
    : `/${type}/popular`;

  const params = type === 'anime' 
    ? {
        page,
        with_keywords: '210024|222243', // Anime keywords
        with_original_language: 'ja',    // Japanese content
        sort_by: 'popularity.desc',
        with_genres: '16',               // Animation genre
        include_adult: false,
        include_null_first_air_dates: false,
        'vote_count.gte': 50,            // Minimum vote count for quality
        'vote_average.gte': 7            // Minimum rating for quality
      }
    : { page };

  const data = await fetchData(endpoint, params);
  return data.results.map((item: any) => ({
    id: item.id,
    title: item.title || item.name,
    name: item.name,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    overview: item.overview,
    vote_average: item.vote_average,
    release_date: item.release_date,
    first_air_date: item.first_air_date,
    media_type: type,
    original_language: item.original_language,
    genre_ids: item.genre_ids,
    popularity: item.popularity,
    origin_country: item.origin_country
  }));
}