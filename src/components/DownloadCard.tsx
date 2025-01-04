import { Download, Check } from 'lucide-react';
import { DownloadProvider } from '../types/download';

interface DownloadCardProps {
  provider: DownloadProvider;
  onDownload: () => void;
  formatSize: (size: number) => string;
}

export default function DownloadCard({ provider, onDownload, formatSize }: DownloadCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={provider.icon}
            alt={provider.name}
            className="w-8 h-8 rounded-lg"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{provider.quality}</span>
            <span className="text-xs text-gray-400">{provider.releaseGroup}</span>
          </div>
        </div>
        <span className="text-sm text-gray-400">{formatSize(provider.size)}</span>
      </div>

      {/* Features */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {provider.features.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-xs bg-white/10 px-2 py-1 rounded-full"
            >
              <Check className="w-3 h-3 text-[#00a6ed]" />
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Provider Info */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-400">{provider.type}</span>
        <span className="text-sm font-medium text-[#00a6ed]">{provider.name}</span>
      </div>

      {/* Download Button */}
      <button
        onClick={onDownload}
        className="w-full flex items-center justify-center gap-2 bg-[#00a6ed] text-white px-4 py-2 rounded-lg hover:bg-[#0095d6] transition-all duration-300 transform group-hover:scale-105"
      >
        <Download className="w-4 h-4" />
        <span>Search on {provider.name}</span>
      </button>
    </div>
  );
}