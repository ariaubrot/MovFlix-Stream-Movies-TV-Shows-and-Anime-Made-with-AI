import create from 'zustand';

interface AppState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProvider: string;
  setSelectedProvider: (provider: string) => void;
}

export const useStore = create<AppState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedProvider: 'vidsrc',
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
}));