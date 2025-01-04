import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/Loading';

// Lazy load route components
const Home = lazy(() => import('@/pages/Home'));
const Movies = lazy(() => import('@/pages/Movies'));
const TVShows = lazy(() => import('@/pages/TVShows'));
const Anime = lazy(() => import('@/pages/Anime'));
const MovieDetails = lazy(() => import('@/pages/MovieDetails'));
const Search = lazy(() => import('@/pages/Search'));
const ComingSoon = lazy(() => import('@/pages/ComingSoon'));
const TopRated = lazy(() => import('@/pages/TopRated'));
const NewReleases = lazy(() => import('@/pages/NewReleases'));

export const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/movies',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Movies />
      </Suspense>
    ),
  },
  {
    path: '/tv',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <TVShows />
      </Suspense>
    ),
  },
  {
    path: '/anime',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Anime />
      </Suspense>
    ),
  },
  {
    path: '/movie/:id',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MovieDetails />
      </Suspense>
    ),
  },
  {
    path: '/tv/:id',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MovieDetails />
      </Suspense>
    ),
  },
  {
    path: '/search',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Search />
      </Suspense>
    ),
  },
  {
    path: '/coming-soon',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ComingSoon />
      </Suspense>
    ),
  },
  {
    path: '/top-rated',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <TopRated />
      </Suspense>
    ),
  },
  {
    path: '/new-releases',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NewReleases />
      </Suspense>
    ),
  },
];