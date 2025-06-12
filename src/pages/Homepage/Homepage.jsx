import React, { useState } from 'react'; 
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/Banner/PopularMovieSlide/PopularMovieSlide';
import UpcomingMovie from './components/upcomingMovie/upcomingMovie';
import TopRatedMovieSlide from './components/TopRatedMovie/TopRatedMovieSlide';
import MovieModal from './MovieModal/MovieModal'; 
import Top10Slider from './components/Top10Slider/Top10Slider';


const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <div>
      <Banner />
      <Top10Slider onMovieClick={handleMovieClick}/>
      <PopularMovieSlide onMovieClick={handleMovieClick} />
      <UpcomingMovie onMovieClick={handleMovieClick} />
      <TopRatedMovieSlide onMovieClick={handleMovieClick} />

      <MovieModal
        show={showModal}
        onClose={() => setShowModal(false)}
        movie={selectedMovie}
      />
    </div>
  );
};

export default Homepage;
