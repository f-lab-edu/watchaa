import { Movie } from '@/features/movie/types/movie';

export type MovieCreditsRequestParams = {
  person_id: number;
  language?: string;
};

export type MovieCreditsResponse = {
  cast: Movie[];
  crew: Movie[];
};
