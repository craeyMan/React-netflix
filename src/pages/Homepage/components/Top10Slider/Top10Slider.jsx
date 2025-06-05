import React, { useEffect, useState } from 'react';
import authApi from '../../../../utils/authApi';
import Api from '../../../../utils/api';
import Spinner from '../Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';
import { FaPlay, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Top10Slider.style.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
  },
};

const Top10Slider = ({ onMovieClick }) => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const res = await authApi.get('/likes/top10');
        const movieDetails = await Promise.all(
          res.data.map(async (item) => {
            const detailRes = await Api.get(`/movie/${item.movieId}`);
            return detailRes.data;
          })
        );
        setTopMovies(movieDetails);
      } catch (err) {
        console.error(err);
        setError('Top10 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTop10();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="top10-slider-wrapper">
      <h2 className="top10-title">
        🔥 실시간 인기 <span className="highlight">Top 10</span>
      </h2>
      <Carousel
        responsive={responsive}
        infinite
        arrows
        containerClass="top10-carousel-container"
        itemClass="top10-carousel-item" // ⭐ 사진 간격 조절용 클래스 추가
      >
        {topMovies.map((movie, index) => (
          <div key={movie.id} className="movie-card">
            <div className="rank-badge">{index + 1}</div>
            <div
              className="movie-thumbnail"
              style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
              }}
            ></div>

            <div className="movie-overlay">
              <div className="button-group">
                <FaPlay className="icon" />
                <FaThumbsUp className="icon" />
                <FaChevronDown
                  className="icon right-icon"
                  onClick={() => onMovieClick(movie)}
                />
              </div>

              <div className="movie-title">{movie.title}</div>

              <div className="movie-genres">
                {movie.genres?.map((genre, idx) => (
                  <Badge bg="danger" key={idx} className="me-1">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Top10Slider;
