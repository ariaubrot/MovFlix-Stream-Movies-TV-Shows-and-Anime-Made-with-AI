import { MediaType } from './common';

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: MediaType;
  original_language?: string;
  genre_ids?: number[];
  popularity?: number;
  origin_country?: string[];
}

export interface SliderItem extends MediaItem {
  type: 'movie' | 'tv';
}