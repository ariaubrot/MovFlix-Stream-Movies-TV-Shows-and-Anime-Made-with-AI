export const TMDB_API_KEY = 'API KEY';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const STREAMING_PROVIDERS = [
  {
    id: 'netflix',
    name: 'Netflix',
    icon: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico',
    url: 'https://www.netflix.com/search?q=',
    color: '#E50914'
  },
  {
    id: 'prime',
    name: 'Prime Video',
    icon: 'https://m.media-amazon.com/images/G/01/digital/video/DVUI/favicons/favicon.ico',
    url: 'https://www.primevideo.com/search?k=',
    color: '#00A8E1'
  },
  {
    id: 'disney',
    name: 'Disney+',
    icon: 'https://static-assets.bamgrid.com/product/disneyplus/favicons/favicon.ico',
    url: 'https://www.disneyplus.com/search?q=',
    color: '#113CCF'
  },
  {
    id: 'hbo',
    name: 'Max',
    icon: 'https://www.max.com/favicon.ico',
    url: 'https://www.max.com/search?q=',
    color: '#5822B4'
  }
];

export const VIDEO_PROVIDERS = [
  {
    id: 'vidsrc',
    name: 'Vidsrc',
    quality: '4K',
    embedUrl: (type: string, id: string) => 
      `https://vidsrc.dev/embed/${type}/${id}${type === 'tv' ? '/1/1' : ''}`
  },
  {
    id: 'superembed',
    name: 'SuperEmbed',
    quality: '1080p',
    embedUrl: (type: string, id: string) =>
      `https://multiembed.mov/?video_id=${id}&tmdb=1${type === 'tv' ? '&s=1&e=1' : ''}`
  },
  {
    id: 'vidplay',
    name: 'VidPlay',
    quality: '1080p',
    embedUrl: (type: string, id: string) =>
      `https://vidplay.site/e/${type}/${id}${type === 'tv' ? '/1/1' : ''}`
  },
  {
    id: 'smashystream',
    name: 'SmashyStream',
    quality: '4K',
    embedUrl: (type: string, id: string) =>
      `https://embed.smashystream.com/${type}/${id}${type === 'tv' ? '/1/1' : ''}`
  }
];

export const DOWNLOAD_PROVIDERS = [
  {
    id: 'torrentgalaxy',
    name: 'TorrentGalaxy',
    quality: '4K HDR',
    type: 'Torrent',
    icon: 'https://torrentgalaxy.to/favicon.ico',
    searchUrl: 'https://torrentgalaxy.to/torrents.php?search=',
    features: ['HDR', 'Dolby Vision', 'Atmos'],
    releaseGroup: 'TGx'
  },
  {
    id: '1337x',
    name: '1337x',
    quality: '1080p',
    type: 'Torrent',
    icon: 'https://1337x.to/favicon.ico',
    searchUrl: 'https://1337x.to/search/',
    features: ['x264', 'DTS'],
    releaseGroup: 'RARBG'
  },
  {
    id: 'yts',
    name: 'YTS',
    quality: '1080p',
    type: 'Magnet',
    icon: 'https://yts.mx/assets/images/website/favicon.ico',
    searchUrl: 'https://yts.mx/browse-movies/',
    features: ['x264', 'AAC'],
    releaseGroup: 'YTS'
  }
];

export const GENRES = {
  movie: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ],
  tv: [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' }
  ]
};
