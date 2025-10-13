import { peopleQueryKeys } from '@/features/people/hooks/queries/query-keys';
import { MovieCreditsRequestParams, MovieCreditsResponse } from '@/features/people/types';
import { api } from '@/utils/api';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchMovieCredits = async ({
  person_id,
  language,
}: MovieCreditsRequestParams): Promise<MovieCreditsResponse> => {
  return (await api.get(`/3/person/${person_id}/movie_credits`, { params: { language } })).data;
};

const useMovieCredits = ({ person_id, language }: MovieCreditsRequestParams) => {
  return useSuspenseQuery({
    queryKey: peopleQueryKeys.movieCredits({ person_id, language }),
    queryFn: () => fetchMovieCredits({ person_id, language }),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export default useMovieCredits;
