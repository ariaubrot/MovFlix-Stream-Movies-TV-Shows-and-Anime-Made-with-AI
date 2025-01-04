import { Download, Filter } from 'lucide-react';
import { useState } from 'react';
import { downloadProviders, getProvidersByQuality, getProvidersByType } from '../data/downloadProviders';
import DownloadCard from './DownloadCard';
import { formatFileSize } from '../utils/formatters';
import { DownloadQuality, DownloadType } from '../types/download';

interface DownloadOptionsProps {
  title: string;
  year: number;
}

export default function DownloadOptions({ title, year }: DownloadOptionsProps) {
  const [selectedQuality, setSelectedQuality] = useState<DownloadQuality | 'all'>('all');
  const [selectedType, setSelectedType] = useState<DownloadType | 'all'>('all');

  const handleDownload = (providerId: string) => {
    const provider = downloadProviders.find(p => p.id === providerId);
    if (provider) {
      const searchQuery = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '+'));
      window.open(`${provider.searchUrl}${searchQuery}`, '_blank');
    }
  };

  const filteredProviders = downloadProviders.filter(provider => {
    const qualityMatch = selectedQuality === 'all' || provider.quality === selectedQuality;
    const typeMatch = selectedType === 'all' || provider.type === selectedType;
    return qualityMatch && typeMatch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Download Options</h2>
          <div className="flex items-center gap-4">
            {/* Quality Filter */}
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value as DownloadQuality | 'all')}
              className="bg-white/10 text-white px-4 py-2 rounded-lg"
            >
              <option value="all">All Qualities</option>
              <option value="4K HDR">4K HDR</option>
              <option value="1080p">1080p</option>
              <option value="720p">720p</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as DownloadType | 'all')}
              className="bg-white/10 text-white px-4 py-2 rounded-lg"
            >
              <option value="all">All Types</option>
              <option value="Torrent">Torrent</option>
              <option value="Magnet">Magnet</option>
              <option value="Direct">Direct</option>
            </select>
          </div>
        </div>

        {/* Download Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredProviders.map((provider) => (
            <DownloadCard
              key={provider.id}
              provider={provider}
              onDownload={() => handleDownload(provider.id)}
              formatSize={formatFileSize}
            />
          ))}
        </div>

        {/* Footer Notice */}
        <div className="text-center text-sm text-gray-400">
          <p className="mb-2">
            Download availability may vary by region and provider. Always use legitimate sources.
          </p>
          <p>
            File sizes are approximate and may vary based on quality and encoding.
          </p>
        </div>
      </div>
    </div>
  );
}