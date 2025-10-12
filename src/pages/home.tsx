import PopularMoviesCarousel from '@/features/movie/components/popular-movies-carousel';
import PosterCarousel from '@/features/movie/components/poster-carousel';
import { Suspense } from 'react';

function Home() {
  return (
    <main className="bg-[var(--color-background)]">
      <div className="max-w-[1680px] mx-auto">
        <Suspense>
          <PopularMoviesCarousel />
        </Suspense>
        <div className="mt-8 space-y-8 px-10 pb-8">
          <Suspense>
            <PosterCarousel type="top_rated" carouselTitle="Top Rated" />
          </Suspense>
          <Suspense>
            <PosterCarousel type="now_playing" carouselTitle="Now Playing" />
          </Suspense>
          <Suspense>
            <PosterCarousel type="upcoming" carouselTitle="Upcoming" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default Home;
