import Spinner from '@/components/spinner';

const PosterCarouselLoading = () => {
  return (
    <div>
      <p className="text-red-500">Loading posters...</p>
      <Spinner />
    </div>
  );
};

export default PosterCarouselLoading;
