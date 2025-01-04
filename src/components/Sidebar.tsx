import { Home, Film, Tv, Clock, Star, Calendar, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Film, label: 'Movies', path: '/movies' },
  { icon: Tv, label: 'TV', path: '/tv' },
  { icon: Gamepad2, label: 'Anime', path: '/anime' },
  { icon: Clock, label: 'Coming', path: '/coming-soon' },
  { icon: Star, label: 'Top', path: '/top-rated' },
  { icon: Calendar, label: 'New', path: '/new-releases' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-black/20 backdrop-blur-sm shadow-lg z-20 py-2"
    >
      <div className="flex justify-evenly items-center w-full">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative
                ${isActive
                  ? 'bg-gradient-to-r from-[#ff4d00] to-[#ff6b2c] text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
              {/* Title below the icon */}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}