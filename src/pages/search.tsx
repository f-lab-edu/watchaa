import posterFallbackImage from '@/assets/images/poster-fallback.svg';
import AsyncBoundary from '@/components/async-boundary';
import Button from '@/components/button';
import PosterCard from '@/components/poster-card';
import Profile from '@/components/profile';
import { FALLBACK_AVATAR_IMAGE_URL, TMDB_API_POSTER_BASE_URL } from '@/constants';
import { useMultiSearch } from '@/features/search/hooks/queries/use-multi-search';
import { useMemo } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { InView } from 'react-intersection-observer';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

type SearchListItemProps = {
  title: string;
  posterPath: string;
  date: string;
  category: '영화' | '시리즈';
};

const SearchListItem = ({ title, date, posterPath, category }: SearchListItemProps) => {
  return (
    <li className="flex items-center gap-[14px] py-2">
      <PosterCard
        imageUrl={posterPath ? `${TMDB_API_POSTER_BASE_URL}/${posterPath}` : posterFallbackImage}
        title={title}
        className="size-12"
      />
      <div className="flex flex-col">
        <div className="text-white">{title}</div>
        <div className="flex text-[var(--color-tertiary-text)] text-[13px] gap-1">
          <div>{category}</div>
          <div>{'\u00B7'}</div>
          <div>{new Date(date).getFullYear()}</div>
        </div>
      </div>
    </li>
  );
};

const ListLoading = () => {
  return (
    <ul>
      {[...Array(5)].map((_, index) => (
        <li key={index} className="flex items-center gap-[14px] py-2 animate-pulse">
          <div className="size-12 bg-[var(--color-background30)] rounded-md" />
          <div className="flex flex-col gap-2">
            <div className="w-[200px] h-5 bg-[var(--color-background30)] rounded-md" />
            <div className="w-[100px] h-4 bg-[var(--color-background30)] rounded-md" />
          </div>
        </li>
      ))}
    </ul>
  );
};

const ListError = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-[var(--color-tertiary-text)]">
      <p>검색 결과를 불러오는 중에 오류가 발생했습니다.</p>
      {error.message && <p>Error Message: {error.message}</p>}
      <Button priority="secondary" onClick={resetErrorBoundary} className="p-2">
        다시 시도하기
      </Button>
    </div>
  );
};

const SearchResults = ({ query }: { query: string }) => {
  const location = useLocation();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useMultiSearch({
    query,
    language: 'ko',
    include_adult: true,
  });

  const results = useMemo(() => data?.pages?.flatMap((page) => page.results) || [], [data]);

  if (!results.length) {
    return <div className="text-[var(--color-tertiary-text)]">검색 결과가 없습니다.</div>;
  }

  return (
    <>
      {results.map((result) => {
        if (result.media_type === 'movie') {
          return (
            <Link key={result.id} to={`/contents/${result.id}`}>
              <SearchListItem
                title={result.title}
                date={result.release_date}
                posterPath={result.poster_path || result.backdrop_path || ''}
                category="영화"
              />
            </Link>
          );
        }

        if (result.media_type === 'tv') {
          return (
            // TODO. 시리즈 상세 페이지 구현 후 링크 수정
            <Link
              key={result.id}
              to={location.pathname + location.search}
              onClick={() => alert('준비중입니다.')}
            >
              <SearchListItem
                title={result.name}
                date={result.first_air_date}
                posterPath={result.poster_path || result.backdrop_path || ''}
                category="시리즈"
              />
            </Link>
          );
        }

        if (result.media_type === 'person') {
          const peopleId = result.id;
          return (
            <Link key={peopleId} to={`/people/${peopleId}`}>
              <Profile className="py-2">
                <Profile.Image
                  name={result.name}
                  imageUrl={
                    result.profile_path
                      ? `${TMDB_API_POSTER_BASE_URL}/${result.profile_path}`
                      : FALLBACK_AVATAR_IMAGE_URL
                  }
                  className="size-[42px]"
                />
                <div>
                  <Profile.Name>{result.name}</Profile.Name>
                  <Profile.Role>{result.known_for_department}</Profile.Role>
                </div>
              </Profile>
            </Link>
          );
        }

        return null;
      })}
      {isFetchingNextPage && <ListLoading />}
      <InView
        rootMargin="20px"
        onChange={(inView) => {
          if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  if (!query) {
    return null;
  }

  return (
    <div className="p-2">
      <ul className="pt-[22px] px-10">
        <AsyncBoundary pendingFallback={<ListLoading />} rejectedFallbackComponent={ListError}>
          <SearchResults query={query} />
        </AsyncBoundary>
      </ul>
    </div>
  );
};

export default Search;
