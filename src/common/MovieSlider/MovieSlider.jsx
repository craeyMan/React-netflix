import React from 'react'
import "./MovieSlider.style.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieSlider = ({ title, movies, responsive }) => {
  return ( 
    <div>
    <h3>{title}</h3>
    <Carousel
    infinite={true}
    centerMode={true} 
    itemClass="movie-slider p-1"
    containerClass="carousel-container"
    responsive={responsive}
    partialVisible={false}
    ssr={true}
    keyBoardControl={true}
    minimumTouchDrag={80}
    >
    {movies.map((movie,index) => (
        <MovieCard movie={movie} key={index}/>
    ))}
        </Carousel>
    </div>
  )
}

export default MovieSlider