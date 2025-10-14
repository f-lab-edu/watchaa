import { Movie } from '@/features/movie/types';
import { Person } from '@/features/people/types';
import { Tv } from '@/features/tv/types';

export type SearchRequestParams = {
  query: string;
  include_adult?: boolean;
  page?: number;
  language?: string;
};

export type SearchResultMap = {
  movie: Movie;
  tv: Tv;
  person: Person;
};

export type SearchType = keyof SearchResultMap;

export type SearchResponse<T extends SearchType> = Paging<SearchResultMap[T]>;

export type MovieWithMediaType = Movie & {
  media_type: 'movie';
};
export type TvWithMediaType = Tv & {
  media_type: 'tv';
};
export type PersonWithMediaType = Person & {
  media_type: 'person';
};

export type MultiSearchResult = MovieWithMediaType | TvWithMediaType | PersonWithMediaType;

export type MultiSearchResponse = Paging<MultiSearchResult>;
