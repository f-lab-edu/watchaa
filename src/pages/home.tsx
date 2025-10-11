import PopularMoviesCarousel from '@/features/movie/components/popular-movies-carousel';
import { Suspense } from 'react';

function Home() {
  return (
    <main className="bg-[var(--color-background)]">
      <div className="max-w-[1680px] mx-auto px-5">
        <Suspense>
          <PopularMoviesCarousel />
        </Suspense>
      </div>
    </main>
  );
}

export default Home;
