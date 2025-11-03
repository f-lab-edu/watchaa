import { genreKeys } from '@/features/genre/hooks/quries/query-keys';
import { GenresRequestParams, GenresResponse } from '@/features/genre/types';
import { api } from '@/utils/api';
import { useSuspenseQuery } from '@tanstack/react-query';

type GenresFetcher = (params: GenresRequestParams) => Promise<GenresResponse>;

const fetchGenres: GenresFetcher = ({ genre, language }) =>
  api.get(`/3/genre/${genre}/list`, { params: { language } }).then((res) => res.data);

const useGenresQuery = (params: GenresRequestParams) => {
  return useSuspenseQuery({
    queryKey: genreKeys.list(params),
    queryFn: () => fetchGenres(params),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export default useGenresQuery;
