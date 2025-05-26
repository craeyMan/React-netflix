import React from 'react'
import "./MovieSlider.style.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';


const MovieSlider = ({ title, movies, responsive, onMovieClick }) => {
  return ( 
    <div className="movie-slider-wrapper">
      <h3>{title}</h3>
      <Carousel
      autoPlay={true}
      autoPlaySpeed={3000}
      infinite={true}
      ssr={true}
      responsive={responsive}
      centerMode={false}
      partialVisible={false}
      keyBoardControl={true}
      minimumTouchDrag={80}
      itemClass="movie-slider p-1"
      containerClass="carousel-container"
      >
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} onMovieClick={onMovieClick} />
      ))}
    </Carousel>


    </div>
  )
  
}

export default MovieSlider