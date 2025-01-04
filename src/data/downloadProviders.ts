import { DownloadProvider } from '../types/download';

// Group providers by quality tier
export const downloadProviders: DownloadProvider[] = [



  
  //insert your download provider api link 




// Helper function to get providers by quality
export const getProvidersByQuality = (quality: string) => {
  return downloadProviders.filter(provider => provider.quality === quality);
};

// Helper function to get providers by type
export const getProvidersByType = (type: string) => {
  return downloadProviders.filter(provider => provider.type === type);
};
