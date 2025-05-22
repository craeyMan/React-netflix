import React from 'react'
import { usePopularMoviesQuery } from '../../../../../hooks/usePopularMovies'
import { Alert } from 'bootstrap'
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../../../../constants/respontsive';
import MovieSlider from '../../../../../common/MovieSlider/MovieSlider';


const PopularMovieSlide = () => {
    const {data,isLoading,isError,error} = usePopularMoviesQuery()

    if(isLoading) {
        return <h1>Loading...</h1>
    }
    if(isError) {
        return <Alert varient="danger">{error.massage}</Alert>
    }
    return (
    <div>
        <MovieSlider 
        title="Popular Movies" 
        movies={data.results} 
        responsive={responsive} 
        />
    </div>
  )
}

export default PopularMovieSlide