import {
  MovieDetailRequestParams,
  MovieFetchType,
  MoviesRequestParams,
} from '@/features/movie/types/movie';

export const movieQueryKeys = {
  all: ['movies'] as const,
  list: (type: MovieFetchType, { page, language }: MoviesRequestParams) =>
    [...movieQueryKeys.all, 'list', { type, page, language }] as const,
  detail: ({ id, language, append_to_response }: MovieDetailRequestParams) =>
    [...movieQueryKeys.all, 'detail', { id, language, append_to_response }] as const,
};
