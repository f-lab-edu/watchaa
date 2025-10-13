import { MultiSearchRequestParams } from '@/features/search/types';

export const searchQueryKeys = {
  all: ['search'] as const,
  multi: ({ query, include_adult, page, language }: MultiSearchRequestParams) =>
    [...searchQueryKeys.all, 'multi', { query, include_adult, page, language }] as const,
};
