import { searchQueryKeys } from '@/features/search/hooks/queries/query-keys';
import { MultiSearchRequestParams, MultiSearchResponse } from '@/features/search/types';
import { api } from '@/utils/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const multiSearch = async (params: MultiSearchRequestParams): Promise<MultiSearchResponse> =>
  (await api.get('/3/search/multi', { params })).data;

export const useMultiSearch = (params: MultiSearchRequestParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: searchQueryKeys.multi(params),
    queryFn: ({ pageParam = 1 }) => multiSearch({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
