import PopularMovies from '@/features/movie/components/popular-movies';
import { Suspense } from 'react';

function Home() {
  return (
    <div className="p-2">
      <Suspense>
        <PopularMovies />
      </Suspense>
    </div>
  );
}

export default Home;
