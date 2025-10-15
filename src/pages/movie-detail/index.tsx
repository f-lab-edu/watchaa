import AsyncBoundary from '@/components/async-boundary';
import Button from '@/components/button';
import ChatIcon from '@/components/icons/chat';
import GiftIcon from '@/components/icons/gift';
import MoreIcon from '@/components/icons/more';
import PlusIcon from '@/components/icons/plus';
import StarIcon from '@/components/icons/star';
import StarOutlinedIcon from '@/components/icons/start-outlined';
import TvIcon from '@/components/icons/tv';
import Profile from '@/components/profile';
import { FALLBACK_AVATAR_IMAGE_URL, TMDB_API_POSTER_BASE_URL } from '@/constants';
import useMovieQuery from '@/features/movie/hooks/queries/use-movie-query';
import { memo, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';

const MAX_CREDITS_DISPLAY_COUNT = 9;

const AgeIndicator = memo(({ age }: { age: number }) => {
  return (
    <span className="py-[1px] px-[5px] h-5 flex items-center text-white justify-center text-[12px] leading-0 rounded-[3px] bg-[var(--color-background70)]">
      {age}
    </span>
  );
});
AgeIndicator.displayName = 'AgeIndicator';

const StatItem = memo(
  ({ icon, value, label }: { icon?: ReactNode; value: string | number; label: string }) => {
    return (
      <li className="flex flex-col">
        <div className="flex items-center h-11">
          {icon}
          <span className="text-white text-4xl font-[var(--font-weight-bold)]">{value}</span>
        </div>
        <div className="text-[var(--color-opacity70)] text-sm">{label}</div>
      </li>
    );
  },
);
StatItem.displayName = 'StatItem';

const MovieInfo = ({ id }: { id: number }) => {
  const { data } = useMovieQuery({
    id,
    language: 'ko',
    appendToResponse: 'credits',
  });

  return (
    <div className="w-full overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${TMDB_API_POSTER_BASE_URL}/${data.backdropPath})`,
        }}
        className="aspect-[1680/622] relative bg-cover pt-10 h-[622px]"
      >
        {/* background image blur */}
        <div className="absolute inset-0 backdrop-blur-3xl brightness-50 size-full" />
        {/* hero area contents */}
        <div className="absolute gap-8 px-10 flex justify-between w-full h-[calc(100%-2.5rem)]">
          <section className="flex-1 flex flex-col gap-6">
            <section className="flex flex-col gap-[10px]">
              <h1 className="text-white text-5xl h-[190px] items-end flex">{data.title}</h1>
              <div className="flex gap-[6px] items-center">
                <AgeIndicator age={data.adult ? 19 : 15} />
                <div className="text-white">{new Date(data.releaseDate).getFullYear()}</div>
                <div className="text-white">{'\u2022'}</div>
                <div className="text-white">
                  {Math.floor(data.runtime / 60) > 0 && `${Math.floor(data.runtime / 60)}시간 `}
                  {data.runtime % 60}분
                </div>
                <div className="text-white">{'\u2022'}</div>
                <div className="text-white flex items-center">
                  {data.genres.map((genre, idx) => {
                    const isLast = data.genres.length - 1 === idx;
                    return (
                      <div key={genre.id}>
                        {/* TODO. tag 페이지 만들기 */}
                        <Link to={`/tag?domain=video&ids=${genre.id}`} className="hover:underline">
                          {genre.name}
                        </Link>
                        {!isLast && <span className="mx-1">{'\u2022'}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-[var(--color-opacity70)] line-clamp-3 my-2">
                {data.overview || '영화의 overview가 없습니다.'}
              </p>
            </section>
            <section className="p-1">
              <ul className="flex items-center gap-8">
                <StatItem
                  icon={<StarIcon className="fill-white size-6 mr-1" />}
                  value={data.voteAverage.toFixed(1)}
                  label="평균 별점"
                />
                <StatItem value={data.voteCount.toLocaleString()} label="보고싶어요" />
              </ul>
            </section>
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-[10px]">
                <Button className="px-4 h-10">감상하기</Button>
                <Button priority="secondary" className="px-4 h-10 flex items-center gap-[6px]">
                  <TvIcon className="fill-white size-4" />
                  <span className="mb-[2px]">구매하기</span>
                </Button>
                <Button priority="secondary" className="px-4 h-10">
                  <GiftIcon className="fill-white size-4" />
                </Button>
              </div>
              <div className="flex gap-[10px] items-center">
                {[
                  {
                    icon: <PlusIcon className="fill-white size-5" />,
                    label: '보고싶어요',
                  },
                  {
                    icon: <StarOutlinedIcon className="size-5" />,
                    label: '평가하기',
                  },
                  {
                    icon: <ChatIcon className="fill-white size-5" />,
                    label: '왓챠파티',
                  },
                  {
                    icon: <MoreIcon className="fill-white size-5" />,
                    label: '더보기',
                  },
                ].map(({ icon, label }) => (
                  <Button
                    key={label}
                    priority="tertiary"
                    className="py-[14px] h-[78px] flex justify-center items-center flex-col gap-2 flex-1 rounded-[6px] text-xs"
                  >
                    {icon}
                    {label}
                  </Button>
                ))}
              </div>
            </section>
          </section>
          <section className="self-end max-w-[968px] max-h-full">
            <img
              src={`${TMDB_API_POSTER_BASE_URL}/${data.backdropPath}`}
              alt={`${data.title} poster`}
              className="rounded-xl size-full object-cover"
            />
          </section>
          {/* 하단부 그라데이션 */}
          <div className="absolute left-0 right-0 bottom-0 w-full h-[8%] bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
        </div>
      </div>
      <section className="my-8 pl-[var(--page-side-margin)]">
        <div className="flex items-start gap-[6px]">
          <img
            src="https://an2-mars.amz.wtchn.net/assets/icon/message-b82841d4d764ea370bd5588d0c16bc52ab2138de010b7267c64fb307f8d68c71.png"
            alt="message"
            className="size-5"
          />
          <div className="text-white">
            <p>구독하면 바로 감상할 수 있어요.</p>
            <p>개별 구매로 소장하거나 대여할 수도 있어요.</p>
          </div>
        </div>
      </section>
      <section className="px-[var(--page-side-margin)] mb-8">
        <div className="mb-[5px] flex justify-between">
          <div className="text-white text-xl font-[var(--font-weight-bold)]">감독/출연</div>
          {data.credits?.cast.length && data.credits.cast.length > MAX_CREDITS_DISPLAY_COUNT && (
            <Link
              to={`/contents/${id}/credits`}
              className="text-[var(--color-tertiary-text)] text-[15px]"
            >
              더보기
            </Link>
          )}
        </div>
        <ul className="grid grid-cols-2">
          {data.credits?.cast.slice(0, MAX_CREDITS_DISPLAY_COUNT).map((cast) => (
            <li key={cast.id} className="py-2">
              <Link to={`/people/${cast.id}?name=${cast.name}`}>
                <Profile>
                  <Profile.Image
                    src={
                      cast.profilePath
                        ? `${TMDB_API_POSTER_BASE_URL}/${cast.profilePath}`
                        : FALLBACK_AVATAR_IMAGE_URL
                    }
                    alt={`${cast.name}의 프로필 사진`}
                  />
                  <div>
                    <Profile.Name>{cast.name}</Profile.Name>
                    <Profile.Role>{cast.character}</Profile.Role>
                  </div>
                </Profile>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const MovieDetail = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <div className="max-w-[1680px] mx-auto">
      <AsyncBoundary>
        <MovieInfo id={Number(id)} />
      </AsyncBoundary>
    </div>
  );
};

export default MovieDetail;
