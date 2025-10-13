import { Movie } from '@/features/movie/types';
import { Person } from '@/features/people/types';
import { Tv } from '@/features/tv/types';

export type MultiSearchRequestParams = {
  query: string;
  include_adult?: boolean;
  page?: number;
  language?: string;
};

export type MovieWithMediaType = Movie & {
  media_type: 'movie';
};
export type TvWithMediaType = Tv & {
  media_type: 'tv';
};
export type PersonWithMediaType = Person & {
  media_type: 'person';
};

type MultiSearchResult = MovieWithMediaType | TvWithMediaType | PersonWithMediaType;

export type MultiSearchResponse = Paging<MultiSearchResult>;
