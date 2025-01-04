import { MediaItem, SliderItem } from '../types/media';
import { MediaType } from '../types/common';

export function mapToMediaItem(item: any, mediaType: MediaType): MediaItem {
  return {
    id: item.id,
    title: item.title,
    name: item.name,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    overview: item.overview,
    vote_average: item.vote_average,
    release_date: item.release_date,
    first_air_date: item.first_air_date,
    media_type: mediaType
  };
}

export function mapToSliderItem(item: any, type: 'movie' | 'tv'): SliderItem {
  return {
    ...mapToMediaItem(item, type),
    type
  };
}