import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const params = useParams();

  return <div>movie id: {params.id}</div>;
};

export default MovieDetail;
