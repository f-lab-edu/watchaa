import { PopularMovies, PopularMoviesRequestParams } from '@/features/movie/types/popular-movie';
import { api } from '@/utils/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { movieQueryKeys } from './query-keys';

const fetchPopularMovies = async (params: PopularMoviesRequestParams): Promise<PopularMovies> =>
  (await api.get('/3/movie/popular', { params })).data;

export const usePopularMovies = (params?: PopularMoviesRequestParams) => {
  const { page, language } = params || { page: 1, language: 'ko' };

  return useSuspenseInfiniteQuery({
    queryKey: movieQueryKeys.popular({ page, language }),
    queryFn: ({ pageParam = 1 }) => fetchPopularMovies({ page: pageParam, language }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
