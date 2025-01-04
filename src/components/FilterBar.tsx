import React, { useState } from 'react';
import { getPopularMovies, getPopularTVShows, getTrendingAll } from '../services/tmdb';

const filters = [
  { id: 'movies' },
];

export default function FilterBar({ onFilterChange }: { onFilterChange: (items: any[]) => void }) {
  const [activeFilter, setActiveFilter] = useState('movies');

  const handleFilterClick = async (filterId: string) => {
    setActiveFilter(filterId);
    try {
      let data;
      switch (filterId) {
        case 'movies':
          data = await getPopularMovies();
          onFilterChange(data.data.results.map((movie: any) => ({ 
            ...movie, 
            media_type: 'movie',
            id: `movie-${movie.id}` 
          })));
          break;
        
       
      }
    } catch (error) {
      console.error('Error fetching filtered content:', error);
    }
  };

  
  return (
    <div className="flex items-center space-x-4 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={` ${
            activeFilter === filter.id
              ? 'bg-[#00a6ed] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}