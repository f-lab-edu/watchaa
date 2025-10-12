export type MovieFetchType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export type MoviesRequestParams = {
  page?: number;
  language?: 'ko' | 'en-US';
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Movies = Paging<Movie>;
