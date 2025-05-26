import React from 'react'
import { usePopularMoviesQuery } from '../../../../../hooks/usePopularMovies'
import { Alert } from 'react-bootstrap'
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../../../../constants/responsive';
import MovieSlider from '../../../../../common/MovieSlider/MovieSlider';


const PopularMovieSlide = ({onMovieClick}) => {
    const {data,isLoading,isError,error} = usePopularMoviesQuery()

    if(isLoading) {
        return <h1>Loading...</h1>
    }
    if(isError) {
        return <Alert varient="danger">{error.massage}</Alert>
    }if (!data || !Array.isArray(data.results)) return <h1>No data available</h1>;
    return (
    <div>
        <MovieSlider 
        title="Popular Movies" 
        movies={data.results} 
        responsive={responsive}
        onMovieClick={onMovieClick} 
        />
    </div>
  )
}

export default PopularMovieSlide