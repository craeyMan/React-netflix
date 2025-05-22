import React from 'react';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies'; // ✅ 수정
import { Alert } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../../../common/MovieCard/MovieCard'; // ✅ 수정

const responsive = {
  superLargeDesktop: 
  { breakpoint: { max: 3000, min: 1600 }, items: 6 },

  desktop: 
  { breakpoint: { max: 1600, min: 1024 }, items: 4 },

  tablet: 
  { breakpoint: { max: 1024, min: 768 }, items: 4 },

  mobile: 
  { breakpoint: { max: 768, min: 0 }, items: 2 },
};

const UpcomingMovie = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();


  console.log("Upcoming Movies Data:", data);
  if (isLoading) 
    return <h1>Loading upcoming movies...</h1>;
  if (isError) 
    return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div>
      <h3>Upcoming Movies</h3>
      <Carousel
        infinite={responsive}
        centerMode={true}
        itemClass="carousel-item-padding"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default UpcomingMovie;
