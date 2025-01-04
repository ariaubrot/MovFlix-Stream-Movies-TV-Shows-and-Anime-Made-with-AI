import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

const providers = [
  { 
    id: 'netflix', 
    label: 'Netflix', 
    className: 'bg-[#E50914] text-white hover:bg-[#f6121d]',
    url: 'https://www.netflix.com',
    logo: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico'
  },
  { 
    id: 'prime', 
    label: 'Prime Video', 
    className: 'bg-[#00A8E1] text-white hover:bg-[#0dbfff]',
    url: 'https://www.primevideo.com',
    logo: 'https://m.media-amazon.com/images/G/01/digital/video/DVUI/favicons/favicon.ico'
  },
  { 
    id: 'disney', 
    label: 'Disney+', 
    className: 'bg-[#113CCF] text-white hover:bg-[#1544e6]',
    url: 'https://www.disneyplus.com',
    logo: 'https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg'
  },
  
  { 
    id: 'hbo', 
    label: 'HBO Max', 
    className: 'bg-[#5822B4] text-white hover:bg-[#6428cc]',
    url: 'https://www.max.com',
    logo: 'https://www.max.com/favicon.ico'
  },
];

interface StreamingProvidersProps {
  title?: string;
}

export default function StreamingProviders({ title }: StreamingProvidersProps) {
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);

  const handleProviderClick = (provider: typeof providers[0]) => {
    setSelectedProvider(provider);
    const searchQuery = encodeURIComponent(title || '');
    window.open(`${provider.url}/search?q=${searchQuery}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available on Streaming</h2>
          <span className="text-sm text-gray-400">Click to search on platform</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {providers.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleProviderClick(provider)}
              className={`group relative flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 ${
                provider.className
              } hover:scale-105`}
            >
              <img 
                src={provider.logo} 
                alt={provider.label}
                className="w-12 h-12 mb-3 rounded-full"
              />
              <span className="font-semibold">{provider.label}</span>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  <span>Visit</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Availability may vary by region. Click on a provider to search for this title on their platform.
        </p>
      </div>
    </div>
  );
}