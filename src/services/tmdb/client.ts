import { ApiClient } from '@/lib/api/client';
import { validateEnvVariables } from '@/config/api';

export const tmdbClient = new ApiClient(validateEnvVariables());

export const endpoints = {
  movie: {
    details: (id: string) => `/movie/${id}`,
    similar: (id: string) => `/movie/${id}/similar`,
    recommendations: (id: string) => `/movie/${id}/recommendations`,
    videos: (id: string) => `/movie/${id}/videos`,
  },
  tv: {
    details: (id: string) => `/tv/${id}`,
    similar: (id: string) => `/tv/${id}/similar`,
    recommendations: (id: string) => `/tv/${id}/recommendations`,
    videos: (id: string) => `/tv/${id}/videos`,
  },
  search: {
    multi: '/search/multi',
  },
} as const;