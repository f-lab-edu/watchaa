import PosterCard from '@/components/poster-card';
import { TMDB_API_POSTER_BASE_URL } from '@/constants';
import { useMovies } from '@/features/movie/hooks/queries/use-movies';
import { MovieFetchType } from '@/features/movie/types';
import { Carousel } from '@/lib/carousel';
import { memo } from 'react';

type PosterCarouselProps = {
  type: MovieFetchType;
  carouselTitle: string;
};

const PosterCarousel = ({ type, carouselTitle }: PosterCarouselProps) => {
  const { data } = useMovies(type);

  const movies = data?.pages[0]?.results || [];

  if (!movies.length) {
    return (
      <div className="flex justify-center items-center h-10">
        <p className="text-gray-500">No {carouselTitle} movies found.</p>
      </div>
    );
  }

  return (
    <div className="group">
      <h2 className="text-[var(--color-primary-text)] text-xl mb-[5px]">{carouselTitle}</h2>
      <Carousel.Root slidesPerView={8} spaceBetween={12} loop>
        <Carousel.Content>
          {movies.map((movie) => (
            <PosterCard
              key={movie.id}
              title={movie.title}
              imageUrl={`${TMDB_API_POSTER_BASE_URL}${movie.poster_path}`}
              to={`/contents/${movie.id}`}
              className="aspect-[2/3]"
            />
          ))}
        </Carousel.Content>
        <div className="group-hover:visible invisible">
          <Carousel.PrevButton className="-left-10" />
          <Carousel.NextButton className="-right-10" />
        </div>
      </Carousel.Root>
    </div>
  );
};

export default memo(PosterCarousel);
