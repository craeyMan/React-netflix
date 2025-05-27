import React from 'react';
import { useTopRatedMovies } from '../../../../hooks/useTopRatedMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import Alert from 'react-bootstrap/Alert';
import Spinner from '../Spinner/Spinner';

// ✅ onMovieClick props 받기
const TopRatedMovieSlide = ({ onMovieClick }) => {
  const { data, isLoading, isError, error } = useTopRatedMovies();

  if (isLoading) return <Spinner />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <MovieSlider
      title="Top Rated Movies"
      movies={data?.results}
      onMovieClick={onMovieClick} // ✅ 여기서도 넘김
      responsive={{
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 6 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 5 },
      }}
    />
  );
};

export default TopRatedMovieSlide;
