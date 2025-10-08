import { TMDB_API_POSTER_BASE_URL } from '@/constants';
import { usePopularMovies } from '@/features/movie/hooks/queries/use-popular-movies';
import { Link } from 'react-router-dom';

const PopularMovies = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePopularMovies();

  return (
    <div>
      <h2>Popular Movies</h2>
      <ul>
        {data?.pages.map((page) =>
          page.results.map((movie) => {
            const imageUrl = movie.poster_path ?? movie.backdrop_path;

            return (
              <li key={movie.id} className="mb-4 block w-80">
                <Link to={`/contents/${movie.id}`}>
                  <img
                    src={`${TMDB_API_POSTER_BASE_URL}/${imageUrl}`}
                    alt={movie.title}
                    loading="lazy"
                    className="w-80 h-96 object-cover"
                  />
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </Link>
              </li>
            );
          }),
        )}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default PopularMovies;
