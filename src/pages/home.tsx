import AsyncBoundary from '@/components/async-boundary';
import PopularMoviesCarousel from '@/features/movie/components/popular-movies-carousel';
import PopularMoviesCarouselError from '@/features/movie/components/popular-movies-carousel/error';
import PopularMoviesCarouselLoading from '@/features/movie/components/popular-movies-carousel/loading';
import PosterCarousel from '@/features/movie/components/poster-carousel';
import PosterCarouselError from '@/features/movie/components/poster-carousel/error';
import PosterCarouselLoading from '@/features/movie/components/poster-carousel/loading';

function Home() {
  return (
    <AsyncBoundary>
      <main className="bg-[var(--color-background)]">
        <div className="max-w-[1680px] mx-auto">
          <AsyncBoundary
            pendingFallback={<PopularMoviesCarouselLoading />}
            rejectedFallback={<PopularMoviesCarouselError />}
          >
            <PopularMoviesCarousel />
          </AsyncBoundary>
          <div className="mt-8 space-y-8 pb-8">
            <AsyncBoundary
              pendingFallback={<PosterCarouselLoading />}
              rejectedFallback={<PosterCarouselError />}
            >
              <PosterCarousel type="topRated" carouselTitle="Top Rated" />
            </AsyncBoundary>
            <AsyncBoundary
              pendingFallback={<PosterCarouselLoading />}
              rejectedFallback={<PosterCarouselError />}
            >
              <PosterCarousel type="nowPlaying" carouselTitle="Now Playing" />
            </AsyncBoundary>
            <AsyncBoundary
              pendingFallback={<PosterCarouselLoading />}
              rejectedFallback={<PosterCarouselError />}
            >
              <PosterCarousel type="upcoming" carouselTitle="Upcoming" />
            </AsyncBoundary>
          </div>
        </div>
      </main>
    </AsyncBoundary>
  );
}

export default Home;
