import { movieQueryKeys } from '@/features/movie/hooks/queries/query-keys';
import { MovieDetailRequestParams, MovieDetailResponse } from '@/features/movie/types';
import { api } from '@/utils/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { produce } from 'immer';

const fetchMovie = async ({
  id,
  language,
  append_to_response,
}: MovieDetailRequestParams): Promise<MovieDetailResponse> => {
  return (await api.get(`/3/movie/${id}`, { params: { language, append_to_response } })).data;
};

// 감독을 cast 맨 앞에 추가하고 crew 배열은 빈 배열로 변환
const transformCreditsData = (data: MovieDetailResponse) => {
  if (!data?.credits) return data;

  return produce(data, (draft) => {
    const directors = draft.credits!.crew.filter(
      (member: { job: string }) => member.job === 'Director',
    );

    if (directors.length > 0) {
      const director = directors[0];
      const directorAsCast = {
        ...director,
        cast_id: -1,
        character: director.job,
        order: -1,
      };
      draft.credits!.cast = [directorAsCast, ...draft.credits!.cast];
    }

    draft.credits!.crew = [];
  });
};

const useMovieQuery = ({ id, language, append_to_response }: MovieDetailRequestParams) => {
  return useSuspenseQuery({
    queryKey: movieQueryKeys.detail({ id, language, append_to_response }),
    queryFn: () => fetchMovie({ id, language, append_to_response }),
    select: transformCreditsData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export default useMovieQuery;
