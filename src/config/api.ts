import { z } from 'zod';

export const apiConfig = z.object({
  baseUrl: z.string().url(),
  apiKey: z.string().min(1),
  apiVersion: z.number().default(3),
  language: z.string().default('en-US'),
  region: z.string().optional(),
  timeout: z.number().default(30000), // Increased default timeout
  retryAttempts: z.number().default(3),
  retryDelay: z.number().default(1000),
});

export type ApiConfig = z.infer<typeof apiConfig>;

export const validateEnvVariables = () => {
  const config = {
    baseUrl: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    apiVersion: 3,
    language: 'en-US',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
    retryAttempts: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '3'),
    retryDelay: parseInt(import.meta.env.VITE_API_RETRY_DELAY || '1000'),
  };

  return apiConfig.parse(config);
};