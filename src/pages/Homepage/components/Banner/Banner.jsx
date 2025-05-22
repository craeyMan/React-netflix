import React, {useState} from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import "./Banner.style.css"
import MovieModal from '../MovieModal/MovieModal';


const Banner = () => {

  const {data, isLoading, isError, error} = usePopularMoviesQuery()
  const [show, setShow] = useState(false);
  
  if(isLoading) {
    <h1>Loading....</h1>
  }
  if(isError) {
    <Alert variant="danger">{error.message}</Alert>
  }

  const movie = data?.results[0];
  
  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie?.poster_path})`
        }}
      >
        <div className="text-white banner-text-area">
          <h1>{movie?.title}</h1>
          <p>{movie?.overview}</p>

            <button
            className="banner-play-button"
            onClick={() => setShow(true)}
          >
            ▶ 재생
          </button>

        </div>
      </div>

      {/* ✅ 모달 표시 */}
      <MovieModal show={show} handleClose={() => setShow(false)} movie={movie} />
    </>
  );
};

export default Banner;