import AsyncBoundary from '@/components/async-boundary';
import PosterCard from '@/components/poster-card';
import { TMDB_API_POSTER_BASE_URL } from '@/constants';
import useMovieCreditsQuery from '@/features/people/hooks/queries/use-movie-credits-query';
import { MovieCreditsResponse } from '@/features/people/types';
import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

const extractCreditData = (data: MovieCreditsResponse, type: 'cast' | 'crew') =>
  data[type].map(({ id, title, poster_path }) => ({ id, title, poster_path }));

const getMovies = (data: MovieCreditsResponse) => {
  const casts = extractCreditData(data, 'cast');
  const crews = extractCreditData(data, 'crew');
  const allMovies = casts.concat(crews).filter((movie) => !!movie.poster_path);

  // 중복 id 제거
  const movieData = allMovies.filter(
    (movie, index, arr) => arr.findIndex((m) => m.id === movie.id) === index,
  );

  return movieData;
};

const CreditsContent = ({ personId }: { personId: number }) => {
  const { data } = useMovieCreditsQuery({ person_id: personId, language: 'ko' });

  const movieData = useMemo(() => getMovies(data), [data]);

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
      {movieData.map(({ id, title, poster_path }) => (
        <li key={id}>
          <Link key={id} to={`/contents/${id}`}>
            <PosterCard
              title={title}
              imageUrl={`${TMDB_API_POSTER_BASE_URL}/${poster_path}`}
              className="aspect-[2/3] hover:brightness-80"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

const People = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  if (!params.id) {
    return null;
  }

  return (
    <>
      <section className="px-[var(--page-side-margin)] pt-[54px]">
        <h1 className="text-white font-[var(--font-weight-bold)] text-[28px]">
          {searchParams.get('name')}
        </h1>
      </section>
      <section className="px-[var(--page-side-margin)] mt-8">
        <AsyncBoundary>
          <CreditsContent personId={Number(params.id)} />
        </AsyncBoundary>
      </section>
    </>
  );
};

export default People;
