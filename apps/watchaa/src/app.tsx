import Layout from '@/components/layout';
import Home from '@/pages/home';
import MovieDetail from '@/pages/movie-detail';
import Credits from '@/pages/movie-detail/credits';
import NotFound from '@/pages/not-found';
import People from '@/pages/people';
import Search from '@/pages/search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const TanstackDevtools =
  process.env.NODE_ENV === 'development'
    ? lazy(() => import('@/add-ons/tanstack-query-devtools'))
    : () => null;

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/contents/:id',
        element: <MovieDetail />,
      },
      {
        path: '/contents/:id/credits',
        element: <Credits />,
      },
      {
        path: '/people/:id',
        element: <People />,
      },
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Suspense>
        <TanstackDevtools />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
