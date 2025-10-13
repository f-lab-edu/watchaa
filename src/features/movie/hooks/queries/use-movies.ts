import { MovieFetchType, Movies, MoviesRequestParams } from '@/features/movie/types';
import { api } from '@/utils/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { movieQueryKeys } from './query-keys';

const fetchMovies = async (type: MovieFetchType, params: MoviesRequestParams): Promise<Movies> =>
  (await api.get(`/3/movie/${type}`, { params })).data;

export const useMovies = (type: MovieFetchType, params?: MoviesRequestParams) => {
  const { page, language } = params || { page: 1, language: 'ko' };

  return useSuspenseInfiniteQuery({
    queryKey: movieQueryKeys.list(type, { page, language }),
    queryFn: ({ pageParam = 1 }) => fetchMovies(type, { page: pageParam, language }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
