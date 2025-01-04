import { useState, useEffect } from 'react';
import { MediaItem } from '../types/media';
import { fetchMediaItems } from '../services/api';
import { MediaType } from '../types/common';

interface UseMediaReturn {
  items: MediaItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export function useMedia(type: MediaType, initialPage = 1): UseMediaReturn {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    fetchInitialItems();
  }, [type]);

  async function fetchInitialItems() {
    try {
      setLoading(true);
      setError(null);
      const newItems = await fetchMediaItems(type, 1);
      setItems(newItems);
      setHasMore(newItems.length === 20); // Assuming 20 items per page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching items');
      console.error('Error fetching media items:', err);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const newItems = await fetchMediaItems(type, nextPage);
      
      if (newItems.length === 0) {
        setHasMore(false);
        return;
      }

      setItems(prevItems => [...prevItems, ...newItems]);
      setPage(nextPage);
      setHasMore(newItems.length === 20); // Assuming 20 items per page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading more items');
      console.error('Error loading more items:', err);
    } finally {
      setLoading(false);
    }
  }

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore
  };
}