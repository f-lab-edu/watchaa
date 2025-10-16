import { trendingQueryKeys } from '@/features/trending/hooks/queries/query-keys';
import { TrendingRequestParams, TrendingResult } from '@/features/trending/types';
import { api } from '@/utils/api';
import { useSuspenseQuery } from '@tanstack/react-query';

type TrendingFetcher = (params: TrendingRequestParams) => Promise<Paging<TrendingResult>>;

const fetchTrending: TrendingFetcher = ({ mediaType, timeWindow, language }) =>
  api
    .get(`/3/trending/${mediaType}/${timeWindow}`, {
      params: {
        language,
      },
    })
    .then((res) => res.data);

export const useTrendingQuery = (params: TrendingRequestParams) => {
  return useSuspenseQuery({
    queryKey: trendingQueryKeys.trending(params),
    queryFn: () => fetchTrending(params),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
