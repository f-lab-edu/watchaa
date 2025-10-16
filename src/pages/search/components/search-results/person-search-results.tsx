import AsyncBoundary from '@/components/async-boundary';
import Profile from '@/components/profile';
import { FALLBACK_AVATAR_IMAGE_URL, TMDB_API_POSTER_BASE_URL } from '@/constants';
import { useSearchInfiniteQuery } from '@/features/search/hooks/queries/use-search-infinite-query';
import ResultEmpty from '@/pages/search/components/search-results/result-empty';
import ResultError from '@/pages/search/components/search-results/result-error';
import { useMemo } from 'react';
import { InView } from 'react-intersection-observer';
import { Link, useSearchParams } from 'react-router-dom';

const ListContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-[10px] gap-y-8 pt-[55px] px-10 pb-8">
      {children}
    </ul>
  );
};

const ProfileLoading = () => {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <li key={index} className="max-size-[12.5%] size-full animate-pulse">
          <div className="shrink-0 aspect-square bg-[var(--color-background30)] rounded-full" />
          <div className="mt-2 h-4 bg-[var(--color-background30)] rounded-md" />
          <div className="mt-1 h-3 bg-[var(--color-background30)] rounded-md w-3/4 mx-auto" />
        </li>
      ))}
    </>
  );
};

const Contents = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchInfiniteQuery(
    'person',
    {
      query,
      language: 'ko',
    },
  );

  const results = useMemo(() => data?.pages?.flatMap((page) => page.results) || [], [data]);

  if (!results.length) {
    return <ResultEmpty />;
  }
  return (
    <>
      <ListContainer>
        {results.map((result) => (
          <li key={result.id} className="max-size-[12.5%] size-full">
            <Link to={`/people/${result.id}?name=${result.name}`}>
              <Profile className="flex-col gap-[3px]">
                <Profile.Image
                  src={
                    result.profilePath
                      ? `${TMDB_API_POSTER_BASE_URL}/${result.profilePath}`
                      : FALLBACK_AVATAR_IMAGE_URL
                  }
                  alt={`${result.name}의 프로필 사진`}
                  className="shrink-0 size-full aspect-square"
                />
                <div className="text-center">
                  <Profile.Name className="text-white text-[15px] font-[var(--font-weight-medium)]">
                    {result.name}
                  </Profile.Name>
                  {result.knownForDepartment && (
                    <Profile.Role className="text-[14px]">{result.knownForDepartment}</Profile.Role>
                  )}
                </div>
              </Profile>
            </Link>
          </li>
        ))}
        {isFetchingNextPage && <ProfileLoading />}
      </ListContainer>
      <InView
        onChange={(inView) => {
          if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
};

const PersonSearchResults = () => {
  return (
    <AsyncBoundary
      pendingFallback={
        <ListContainer>
          <ProfileLoading />
        </ListContainer>
      }
      rejectedFallbackComponent={ResultError}
    >
      <Contents />
    </AsyncBoundary>
  );
};

export default PersonSearchResults;
