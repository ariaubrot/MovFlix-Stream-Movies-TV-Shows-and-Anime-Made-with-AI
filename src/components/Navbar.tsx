import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, Film, Star } from 'lucide-react';
import { searchMovies, getImageUrl } from '../services/tmdb';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        try {
          const { data } = await searchMovies(searchQuery);
          setSearchResults(data.results.slice(0, 5));
        } catch (error) {
          console.error('Error searching:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleResultClick = (item: any) => {
    const path = `/${item.media_type}/${item.id}`;
    navigate(path);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Title on Left */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <Film className="w-8 h-8 text-[#ff4d00] transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#ff4d00] to-[#ff6b2c] bg-clip-text text-transparent">
                MovFlix
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-xl mx-8" ref={searchContainerRef}>
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search movies & TV shows..."
                className="w-full bg-white/10 text-gray-300 rounded-full py-2 px-4 pl-10 
                  focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/50 transition-all duration-200
                  placeholder-gray-500 border border-white/10 group-hover:border-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-colors" />

              {/* Live Search Results */}
              {(searchResults.length > 0 || isLoading) && (
                <div className="absolute mt-2 w-full bg-[#1a2630] rounded-xl shadow-xl border border-gray-700/50 overflow-hidden">
                  {isLoading ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#ff4d00] border-t-transparent mx-auto"></div>
                    </div>
                  ) : (
                    searchResults.map((item) => (
                      <div
                        key={`${item.id}-${item.media_type}`}
                        className="flex items-center gap-3 p-2 hover:bg-white/5 cursor-pointer transition-colors"
                        onClick={() => handleResultClick(item)}
                      >
                        <img
                          src={getImageUrl(item.poster_path, 'w92')}
                          alt=""
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">
                            {item.title || item.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{new Date(item.release_date || item.first_air_date).getFullYear()}</span>
                            <span>•</span>
                            <span className="capitalize">{item.media_type}</span>
                            {item.vote_average > 0 && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{item.vote_average.toFixed(1)}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Mobile Search Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? (
                <X className="h-6 w-6 text-[#ff4d00]" />
              ) : (
                <Search className="h-6 w-6 text-[#ff4d00]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Form */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 px-2" ref={searchContainerRef}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies & TV shows..."
                className="w-full bg-white/10 text-gray-300 rounded-full py-2 px-4 pl-10 
                  focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/50 transition-all duration-200
                  placeholder-gray-500 border border-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

              {/* Mobile Live Search Results */}
              {(searchResults.length > 0 || isLoading) && (
                <div className="absolute mt-2 w-full bg-[#1a2630] rounded-xl shadow-xl border border-gray-700/50 overflow-hidden z-50">
                  {isLoading ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#ff4d00] border-t-transparent mx-auto"></div>
                    </div>
                  ) : (
                    searchResults.map((item) => (
                      <div
                        key={`${item.id}-${item.media_type}`}
                        className="flex items-center gap-3 p-2 hover:bg-white/5 cursor-pointer transition-colors"
                        onClick={() => handleResultClick(item)}
                      >
                        <img
                          src={getImageUrl(item.poster_path, 'w92')}
                          alt=""
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">
                            {item.title || item.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{new Date(item.release_date || item.first_air_date).getFullYear()}</span>
                            <span>•</span>
                            <span className="capitalize">{item.media_type}</span>
                            {item.vote_average > 0 && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{item.vote_average.toFixed(1)}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}