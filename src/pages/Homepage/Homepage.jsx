import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/Banner/PopularMovieSlide/PopularMovieSlide'
import UpcomingMovie from './components/upcomingMovie/upcomingMovie'
import TopRatedMovieSlide from './components/TopRatedMovie/TopRatedMovieSlide'



const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <UpcomingMovie />
      <TopRatedMovieSlide />
    </div>

  )
}

export default Homepage