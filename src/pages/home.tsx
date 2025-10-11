import PopularMoviesCarousel from '@/features/movie/components/popular-movies-carousel';
import { Suspense } from 'react';

function Home() {
  return (
    <main className="bg-[var(--color-background)]">
      <div className="max-w-[1680px] mx-auto px-5">
        <Suspense>
          <PopularMoviesCarousel />
        </Suspense>

        {/* 테스트 캐러셀 - API 의존 없음
        <div className="mt-16">
          <TestCarousel />
        </div> */}
      </div>
    </main>
  );
}

export default Home;
