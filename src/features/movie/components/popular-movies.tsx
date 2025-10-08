import { usePopularMovies } from '@/features/movie/hooks/queries/use-popular-movies';

const PopularMovies = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePopularMovies();

  return (
    <div>
      <h2>Popular Movies</h2>
      {data?.pages.map((page) =>
        page.results.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        )),
      )}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default PopularMovies;
