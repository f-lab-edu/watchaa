import { Movie } from '@/features/movie/types';
import { MovieWithMediaType, TvWithMediaType } from '@/features/search/types';

export type MovieCreditsRequestParams = {
  person_id: number;
  language?: string;
};

export type MovieCreditsResponse = {
  cast: Movie[];
  crew: Movie[];
};

export type Person = {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string | null;
  known_for: (MovieWithMediaType | TvWithMediaType)[];
};
