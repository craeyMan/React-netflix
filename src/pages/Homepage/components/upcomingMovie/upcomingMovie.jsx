import React from 'react';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import { Alert } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import './UpcomingMovie.style.css';
import Spinner from '../Spinner/Spinner';
import { responsive } from '../../../../constants/responsive';

const UpcomingMovie = ({ onMovieClick }) => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();
  if (isLoading) return <Spinner />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div className="Upcoming-slider-wrapper">
      <h3>개봉 예정 영화</h3>
      <Carousel
        infinite={true}
        centerMode={false}
        itemClass="upcoming-carousel-item"
        containerClass="carousel-container"
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} onMovieClick={onMovieClick} />
        ))}
      </Carousel>
    </div>
  );
};

export default UpcomingMovie;
