import React from 'react';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies'; // ✅ 수정
import { Alert } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../../../common/MovieCard/MovieCard'; // ✅ 수정
import './UpcomingMovie.style.css';


const responsive = {
  desktop: 
  { breakpoint: { max: 3000, min: 1024 }, items: 7 },

  tablet: 
  { breakpoint: { max: 1024, min: 768 }, items: 6 },

  mobile: 
  { breakpoint: { max: 768, min: 0 }, items: 5 },
};

const UpcomingMovie = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();
  if (isLoading) 
    return <h1>Loading upcoming movies...</h1>;
  if (isError) 
    return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div className="Upcoming-slider-wrapper">
      <h3>Upcoming Movies</h3>
      <Carousel
        infinite={true}
        centerMode={false}
        itemClass="carousel-item-padding"
        containerClass="carousel-container"
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default UpcomingMovie;