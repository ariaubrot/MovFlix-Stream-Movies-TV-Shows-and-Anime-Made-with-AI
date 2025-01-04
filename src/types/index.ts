export interface Media {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
  genre_ids: number[];
}

export interface MediaDetails extends Media {
  genres: { id: number; name: string }[];
  runtime?: number;
  episode_run_time?: number[];
  videos: {
    results: {
      key: string;
      name: string;
      type: string;
      site: string;
    }[];
  };
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
  recommendations: {
    results: Media[];
  };
}

export interface VideoProvider {
  id: string;
  name: string;
  quality: string;
  embedUrl: (type: string, id: string) => string;
}

export interface StreamingProvider {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
}

export interface DownloadProvider {
  id: string;
  name: string;
  quality: string;
  type: string;
  icon: string;
  searchUrl: string;
  features: string[];
  releaseGroup: string;
}