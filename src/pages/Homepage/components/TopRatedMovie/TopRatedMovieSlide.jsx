import React from 'react';
import { useTopRatedMovies } from '../../../../hooks/useTopRatedMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import Alert from 'react-bootstrap/Alert';

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMovies();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <MovieSlider
      title="Top Rated Movies"
      movies={data?.results}
      responsive={{
        desktop: { 
        breakpoint: {
        max: 3000, min: 1024 }, items: 6 },
        tablet: {
        breakpoint: {
        max: 1024, min: 464 }, items: 3 },
        mobile: {
        breakpoint: {
        max: 464, min: 0 }, items: 2 },
      }}
    />
  );
};

export default TopRatedMovieSlide;
