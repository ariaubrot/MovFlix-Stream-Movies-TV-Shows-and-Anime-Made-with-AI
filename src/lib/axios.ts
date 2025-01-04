import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@/config/constants';

// Create axios instance with default config
export const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
  headers: {
    'Cache-Control': 'max-age=3600'
  }
});

// Add request interceptor for error handling
tmdb.interceptors.request.use(
  (config) => {
    // Add any request preprocessing here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling and retries
tmdb.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    
    // Retry logic for network errors or 5xx responses
    if (!response || (response.status >= 500 && response.status <= 599)) {
      config._retryCount = config._retryCount || 0;
      
      if (config._retryCount < 3) {
        config._retryCount += 1;
        const delay = Math.pow(2, config._retryCount) * 1000;
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return tmdb(config);
      }
    }
    
    return Promise.reject(error);
  }
);

// Image URL helper with WebP support
export const getImageUrl = (path: string | null, size = 'original') => {
  if (!path) return null;
  
  // Check for WebP support
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
    
  const baseUrl = `https://image.tmdb.org/t/p/${size}${path}`;
  
  if (supportsWebP) {
    return `${baseUrl}.webp`;
  }
  
  return baseUrl;
};