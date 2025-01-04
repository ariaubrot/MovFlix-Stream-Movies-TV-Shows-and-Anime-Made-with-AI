import { useState } from 'react';
import { Play, Monitor, Film } from 'lucide-react';

interface VideoProvider {
  id: string;
  name: string;
  quality: string;
  type: 'stream' | 'trailer';
  embedUrl: (id: string, type: string) => string;
}

const providers: VideoProvider[] = [
  // Streaming Providers
  {
    id: 'vidsrc',
    name: 'Pro',
    quality: '4K',
    type: 'stream',
    embedUrl: (id, type) => `https://vidsrc.dev/embed/${type}/${id}${type === 'tv' ? '/1/1' : ''}`,
  },
  {
    id: 'hnembed',
    name: 'Alpha',
    quality: '1080p',
    type: 'stream',
    embedUrl: (id, type) => `https://hnembed.cc/embed/${type}/${id}`,
  },
  {
    id: 'multiembed',
    name: 'Multi',
    quality: '1080p',
    type: 'stream',
    embedUrl: (id, type) => `https://multiembed.mov/?video_id=${id}&tmdb=1${type === 'tv' ? '&s=1&e=1' : ''}`,
  },
  {
    id: 'vidlink',
    name: 'Beta',
    quality: '1080p',
    type: 'stream',
    embedUrl: (id, type) => type === 'movie' ? `https://vidlink.pro/movie/${id}` : `https://vidlink.pro/tv/${id}/1/1`,
  },
  {
    id: 'embedsoap',
    name: 'Gaama',
    quality: '1080p',
    type: 'stream',
    embedUrl: (id, type) => type === 'movie' ? `https://www.embedsoap.com/embed/movie/${id}` : `https://www.embedsoap.com/embed/tv/${id}/1/1`,
  },
  {
    id: 'autoembed',
    name: 'Hindi',
    quality: '1080p',
    type: 'stream',
    embedUrl: (id, type) => type === 'movie' ? `https://player.autoembed.cc/embed/movie/${id}` : `https://player.autoembed.cc/embed/tv/${id}/1/1`,
  },
  {
    id: 'smashy',
    name: 'Delta',
    quality: '4K',
    type: 'stream',
    embedUrl: (id, type) => type === 'movie' ? `https://player.smashy.stream/movie/${id}` : `https://player.smashy.stream/tv/${id}/1/1`,
  },
  // Trailer Providers
  {
    id: 'youtube',
    name: 'YouTube',
    quality: 'HD',
    type: 'trailer',
    embedUrl: (id) => `https://www.youtube.com/embed/${id}?autoplay=0&controls=1&rel=0`,
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    quality: 'HD',
    type: 'trailer',
    embedUrl: (id) => `https://player.vimeo.com/video/${id}`,
  }
];

interface VideoProvidersProps {
  id: string;
  type: 'movie' | 'tv';
  title: string;
  trailerKey?: string;
}

export default function VideoProviders({ id, type, title, trailerKey }: VideoProvidersProps) {
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'stream' | 'trailer'>('stream');

  const toggleFullscreen = () => {
    const iframe = document.querySelector('.provider-iframe') as HTMLIFrameElement;
    if (!isFullscreen) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const filteredProviders = providers.filter(provider => provider.type === activeTab);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Watch Online</h2>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Monitor className="w-5 h-5" />
            <span>Fullscreen</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 border-b border-white/10">
          <button
            onClick={() => setActiveTab('stream')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'stream'
                ? 'border-[#00a6ed] text-[#00a6ed]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Watch Now</span>
          </button>
          <button
            onClick={() => setActiveTab('trailer')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'trailer'
                ? 'border-[#00a6ed] text-[#00a6ed]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            disabled={!trailerKey}
          >
            <Film className="w-4 h-4" />
            <span>Watch Trailer</span>
          </button>
        </div>

        {/* Provider Selection */}
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => setSelectedProvider(provider)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedProvider.id === provider.id
                  ? 'bg-[#00a6ed] text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{provider.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">
                {provider.quality}
              </span>
            </button>
          ))}
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            className="provider-iframe w-full h-full"
            src={
              activeTab === 'trailer' && trailerKey
                ? selectedProvider.embedUrl(trailerKey, type)
                : selectedProvider.embedUrl(id, type)
            }
            title={`${title} - ${selectedProvider.name}`}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Quality Notice */}
        <div className="text-center text-sm text-gray-400">
          <p>
            Streaming quality may vary depending on your internet connection and the selected provider.
            Try different providers for the best experience.
          </p>
        </div>
      </div>
    </div>
  );
}