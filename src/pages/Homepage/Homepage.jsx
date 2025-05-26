import React, { useState } from 'react'; // useState 꼭 있어야 함!
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/Banner/PopularMovieSlide/PopularMovieSlide';
import UpcomingMovie from './components/upcomingMovie/upcomingMovie';
import TopRatedMovieSlide from './components/TopRatedMovie/TopRatedMovieSlide';
import MovieModal from './MovieModal/MovieModal'; // 모달 import도 잊지마!

const Homepage = () => {
  // ✅ 상태 정의
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // ✅ 핸들러 정의
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <div>
      <Banner />
      <PopularMovieSlide onMovieClick={handleMovieClick} />
      <UpcomingMovie onMovieClick={handleMovieClick} />
      <TopRatedMovieSlide onMovieClick={handleMovieClick} />

      {/* ✅ 모달 삽입 */}
      <MovieModal
        show={showModal}
        onClose={() => setShowModal(false)}
        movie={selectedMovie}
      />
    </div>
  );
};

export default Homepage;
