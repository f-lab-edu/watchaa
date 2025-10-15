import { Movie } from '@/features/movie/types';
import { Person } from '@/features/people/types';
import { Tv } from '@/features/tv/types';

export type SearchRequestParams = {
  query: string;
  includeAdult?: boolean;
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
  mediaType: 'movie';
};
export type TvWithMediaType = Tv & {
  mediaType: 'tv';
};
export type PersonWithMediaType = Person & {
  mediaType: 'person';
};

export type MultiSearchResult = MovieWithMediaType | TvWithMediaType | PersonWithMediaType;
