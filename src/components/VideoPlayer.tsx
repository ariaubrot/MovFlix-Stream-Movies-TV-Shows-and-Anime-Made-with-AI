import { useState } from 'react';
import { Play, Maximize2, Film } from 'lucide-react';

interface Video {
  key: string;
  name: string;
  type: string;
  site: string;
}

interface VideoPlayerProps {
  videos: Video[];
  title: string;
}

export default function VideoPlayer({ videos, title }: VideoPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(videos.find(v => v.type === 'Trailer') || videos[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!videos.length) return null;

  const videoUrl = `https://www.youtube.com/embed/${selectedVideo.key}?autoplay=0&controls=1&rel=0`;

  const toggleFullscreen = () => {
    const iframe = document.querySelector('.video-iframe') as HTMLIFrameElement;
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Official Videos</h2>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
            <span>Fullscreen</span>
          </button>
        </div>

        {/* Video Selection */}
        <div className="flex flex-wrap gap-4">
          {videos.map((video) => (
            <button
              key={video.key}
              onClick={() => setSelectedVideo(video)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedVideo.key === video.key
                  ? 'bg-[#00a6ed] text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>{video.type}</span>
            </button>
          ))}
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            className="video-iframe w-full h-full"
            src={videoUrl}
            title={`${title} - ${selectedVideo.type}`}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Video Info */}
        <div className="text-center">
          <h3 className="text-lg font-medium">{selectedVideo.name}</h3>
          <p className="text-sm text-gray-400 mt-1">
            {selectedVideo.type} • {selectedVideo.site}
          </p>
        </div>
      </div>
    </div>
  );
}