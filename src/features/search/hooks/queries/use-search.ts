import { searchQueryKeys } from '@/features/search/hooks/queries/query-keys';
import { SearchRequestParams, SearchResponse, SearchType } from '@/features/search/types';
import { api } from '@/utils/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const search = async <T extends SearchType>(
  type: T,
  params: SearchRequestParams,
): Promise<SearchResponse<T>> => (await api.get(`/3/search/${type}`, { params })).data;

export const useSearch = <T extends SearchType>(type: T, params: SearchRequestParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: searchQueryKeys.search(type, params),
    queryFn: ({ pageParam = 1 }) => search(type, { ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
