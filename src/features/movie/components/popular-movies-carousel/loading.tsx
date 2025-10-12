import Spinner from '@/components/spinner';

const PopularMoviesCarouselLoading = () => {
  return (
    <div className="flex items-center justify-center h-48">
      <p className="text-red-500">Loading popular movies...</p>
      <Spinner />
    </div>
  );
};

export default PopularMoviesCarouselLoading;
