import AsyncBoundary from '@/components/async-boundary';
import Profile from '@/components/profile';
import { FALLBACK_AVATAR_IMAGE_URL, TMDB_API_POSTER_BASE_URL } from '@/constants';
import useMovie from '@/features/movie/hooks/queries/use-movie';
import { Link, useParams } from 'react-router-dom';

const CreditsContent = ({ id }: { id: number }) => {
  const { data } = useMovie({
    id,
    language: 'ko',
    append_to_response: 'credits',
  });

  console.log(data);

  const credits = data?.credits?.cast || [];

  return (
    <ul>
      {credits.map((cast) => (
        <li key={cast.id} className="py-2">
          {/* TODO. 배우 상세 페이지(출연작 리스트 페이지) 만들기 */}
          <Link to={`/people/${cast.id}`}>
            <Profile
              name={cast.name}
              role={cast.character}
              imageUrl={
                cast.profile_path
                  ? `${TMDB_API_POSTER_BASE_URL}/${cast.profile_path}`
                  : FALLBACK_AVATAR_IMAGE_URL
              }
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Credits = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className="px-10">
      <h1 className="text-white text-[28px] font-[var(--font-weight-bold)] mb-3 mt-[54px]">
        감독/출연
      </h1>
      <hr className="h-[1px] bg-[var(--color-divider)] mb-[18px]" />
      <AsyncBoundary>
        <CreditsContent id={Number(id)} />
      </AsyncBoundary>
    </div>
  );
};

export default Credits;
