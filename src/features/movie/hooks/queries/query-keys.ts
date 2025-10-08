import { PopularMoviesRequestParams } from '@/features/movie/types/popular-movie';

export const movieQueryKeys = {
  all: ['movies'] as const,
  popular: ({ page, language }: PopularMoviesRequestParams) =>
    [...movieQueryKeys.all, 'popular', { page, language }] as const,
};
