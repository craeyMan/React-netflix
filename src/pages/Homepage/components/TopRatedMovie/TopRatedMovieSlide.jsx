import React from 'react';
import { useTopRatedMovies } from '../../../../hooks/useTopRatedMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import Alert from 'react-bootstrap/Alert';
import Spinner from '../Spinner/Spinner';
import { responsive } from '../../../../constants/responsive';

const TopRatedMovieSlide = ({ onMovieClick }) => {
  const { data, isLoading, isError, error } = useTopRatedMovies();

  if (isLoading) return <Spinner />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <MovieSlider
      title="평점 높은 영화"
      movies={data?.results}
      onMovieClick={onMovieClick} 
      responsive={responsive}
    />
  );
};

export default TopRatedMovieSlide;
