import { useQuery as useReactQuery, UseQueryOptions } from 'react-query';
import { ApiError } from '@/lib/api/errors';

export function useQuery<TData = unknown, TError = ApiError>(
  key: string | readonly unknown[],
  fetcher: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery<TData, TError>(key, fetcher, {
    retry: (failureCount, error) => {
      if (error instanceof ApiError) {
        // Don't retry on client errors
        if (error.status && error.status >= 400 && error.status < 500) {
          return false;
        }
        // Retry network errors up to 3 times
        if (error.isNetworkError() && failureCount < 3) {
          return true;
        }
      }
      return false;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}