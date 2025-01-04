export interface DownloadProvider {
  id: string;
  name: string;
  quality: string;
  size: number;
  type: string;
  icon: string;
  searchUrl: string;
  features: string[];
  releaseGroup: string;
}

export type DownloadQuality = '4K HDR' | '1080p' | '720p';
export type DownloadType = 'Torrent' | 'Magnet' | 'Direct';