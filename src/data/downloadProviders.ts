import { DownloadProvider } from '../types/download';

// Group providers by quality tier
export const downloadProviders: DownloadProvider[] = [
  // 4K HDR Premium Sources
  {
    id: 'rarbg',
    name: 'RARBG',
    quality: '4K HDR',
    size: 45000000000, // 45GB
    type: 'Torrent',
    icon: 'https://rarbg.to/favicon.ico',
    searchUrl: 'https://rarbg.to/torrents.php?search=',
    features: ['HDR', 'Dolby Vision', 'Atmos'],
    releaseGroup: 'RARBG'
  },
  {
    id: 'beyondhd',
    name: 'BeyondHD',
    quality: '4K HDR',
    size: 55000000000, // 55GB
    type: 'Torrent',
    icon: 'https://beyond-hd.me/favicon.ico',
    searchUrl: 'https://beyond-hd.me/torrents?search=',
    features: ['HDR10+', 'Dolby Vision', 'TrueHD'],
    releaseGroup: 'BeyondHD'
  },
  
  // 1080p High Quality Sources
  {
    id: 'yts',
    name: 'YTS',
    quality: '1080p',
    size: 2500000000, // 2.5GB
    type: 'Magnet',
    icon: 'https://yts.mx/assets/images/website/favicon.ico',
    searchUrl: 'https://yts.mx/browse-movies/',
    features: ['x264', 'AAC'],
    releaseGroup: 'YTS'
  },
  {
    id: '1337x',
    name: '1337x',
    quality: '1080p',
    size: 8000000000, // 8GB
    type: 'Torrent',
    icon: 'https://1337x.to/favicon.ico',
    searchUrl: 'https://1337x.to/category-search/',
    features: ['x264', 'DTS'],
    releaseGroup: 'SPARKS'
  },
  
  // Specialized Content
  {
    id: 'animetosho',
    name: 'AnimeTosho',
    quality: '1080p',
    size: 1400000000, // 1.4GB
    type: 'Torrent',
    icon: 'https://animetosho.org/favicon.ico',
    searchUrl: 'https://animetosho.org/search?q=',
    features: ['Dual Audio', 'Softsubs'],
    releaseGroup: 'SubsPlease'
  },
  {
    id: 'rutor',
    name: 'Rutor',
    quality: '2160p',
    size: 40000000000, // 40GB
    type: 'Magnet',
    icon: 'https://rutor.info/favicon.ico',
    searchUrl: 'https://rutor.info/search/',
    features: ['HDR', 'Multi-Language'],
    releaseGroup: 'HYBRID'
  },
  
  // Web Sources
  {
    id: 'pahe',
    name: 'Pahe',
    quality: '1080p',
    size: 3000000000, // 3GB
    type: 'Direct',
    icon: 'https://pahe.ph/favicon.ico',
    searchUrl: 'https://pahe.ph/?s=',
    features: ['x265', 'Web-DL'],
    releaseGroup: 'PSA'
  },
  {
    id: 'megaddl',
    name: 'MegaDDL',
    quality: '1080p',
    size: 4500000000, // 4.5GB
    type: 'Direct',
    icon: 'https://megaddl.co/favicon.ico',
    searchUrl: 'https://megaddl.co/?s=',
    features: ['Web-DL', 'Multi-Host'],
    releaseGroup: 'EVO'
  }
];

// Helper function to get providers by quality
export const getProvidersByQuality = (quality: string) => {
  return downloadProviders.filter(provider => provider.quality === quality);
};

// Helper function to get providers by type
export const getProvidersByType = (type: string) => {
  return downloadProviders.filter(provider => provider.type === type);
};