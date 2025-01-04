import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Anime from './pages/Anime';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import ComingSoon from './pages/ComingSoon';
import TopRated from './pages/TopRated';
import NewReleases from './pages/NewReleases';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a1014] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TVShows />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/new-releases" element={<NewReleases />} />
          </Routes>
        </main>
        {/* Sidebar at the bottom */}
        <Sidebar />
      </div>
    </BrowserRouter>
  );
}

export default App;