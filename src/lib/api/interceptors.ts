import { AxiosInstance, AxiosError } from 'axios';
import { ApiError } from './errors';

const INITIAL_RETRY_DELAY = 1000;
const MAX_RETRIES = 3;

export function setupInterceptors(client: AxiosInstance) {
  // Request Interceptor
  client.interceptors.request.use(
    (config) => {
      // Add request timestamp and retry count
      config.metadata = { 
        startTime: new Date().getTime(),
        retryCount: 0
      };
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  client.interceptors.response.use(
    (response) => {
      const startTime = response.config.metadata?.startTime;
      if (startTime) {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;
        console.debug(`Request to ${response.config.url} took ${duration}ms`);
      }
      return response;
    },
    async (error: AxiosError) => {
      const config = error.config as any;
      
      // Don't retry if we've already hit max retries
      if (config.metadata?.retryCount >= MAX_RETRIES) {
        throw new ApiError({
          message: 'Maximum retry attempts reached',
          status: error.response?.status,
          code: error.code,
          data: error.response?.data,
        });
      }

      // Initialize or increment retry count
      config.metadata = config.metadata || {};
      config.metadata.retryCount = (config.metadata.retryCount || 0) + 1;

      // Calculate exponential backoff delay
      const backoffDelay = INITIAL_RETRY_DELAY * Math.pow(2, config.metadata.retryCount - 1);
      
      // Determine if we should retry based on error type
      const shouldRetry = (
        !error.response || // Network error
        error.code === 'ECONNABORTED' || // Timeout
        error.code === 'ERR_NETWORK' || // Network error
        (error.response?.status && error.response?.status >= 500) || // Server error
        error.response?.status === 429 // Rate limit
      );

      if (shouldRetry) {
        console.debug(
          `Retrying request to ${config.url} (Attempt ${config.metadata.retryCount} of ${MAX_RETRIES})`
        );

        // If rate limited, use the retry-after header or default backoff
        const retryAfter = error.response?.headers?.['retry-after'];
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : backoffDelay;

        await new Promise(resolve => setTimeout(resolve, delay));
        return client(config);
      }

      throw new ApiError({
        message: error.message,
        status: error.response?.status,
        code: error.code,
        data: error.response?.data,
      });
    }
  );
}