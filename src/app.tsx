import Layout from '@/components/layout';
import Home from '@/pages/home';
import MovieDetail from '@/pages/movie-detail';
import NotFound from '@/pages/not-found';
import Search from '@/pages/search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
