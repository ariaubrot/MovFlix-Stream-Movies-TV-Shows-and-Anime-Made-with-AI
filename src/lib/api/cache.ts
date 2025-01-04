import { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const ONE_HOUR = 60 * 60 * 1000;

export function setupCache(client: AxiosInstance) {
  return setupCache(client, {
    ttl: ONE_HOUR,
    interpretHeader: false,
    methods: ['get'],
    storage: {
      async get(key: string) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      },
      async set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
      },
      async remove(key: string) {
        localStorage.removeItem(key);
      },
      async clear() {
        localStorage.clear();
      },
    },
  });
}