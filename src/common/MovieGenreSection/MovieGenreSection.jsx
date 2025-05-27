import React from 'react';
import { Alert } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery';
import './MovieGenreSection.style.css';
import Spinner from '../../pages/Homepage/components/Spinner/Spinner';


const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 6 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 3 },
};

const MovieGenreSection = ({ genreId, title, onMovieClick }) => {
  const { data, isLoading, isError, error } = useMovieGenreQuery(genreId);

  const movies = data?.results;
  const filteredMovies = movies?.filter((movie) => movie.poster_path);

  if (isLoading) return <Spinner />;
  if (isError) return <Alert variant="danger">{title} 에러: {error.message}</Alert>;
  if (!filteredMovies || filteredMovies.length === 0) return <p>{title} 영화 없음</p>;

  return (
    <div className="genre-slider-wrapper">
      <h3 className="section-title">{title}</h3>
      <Carousel
        autoPlay
        autoPlaySpeed={3000}
        infinite
        responsive={responsive}
        itemClass="carousel-item-padding"
        containerClass="carousel-container"
        keyBoardControl
      >
        {filteredMovies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            onMovieClick={onMovieClick}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieGenreSection;
