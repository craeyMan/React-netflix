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
import { useAuth } from '../../../../context/AuthContext'; // ✅ 로그인 체크

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 6 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 5 },
};

const Top10Slider = ({ onMovieClick }) => {
  const [topMovies, setTopMovies] = useState([]);
  const [likedMap, setLikedMap] = useState({}); // ✅ 영화별 좋아요 상태 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth(); // ✅ 로그인 확인

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

        // ✅ 좋아요 상태 미리 불러오기
        const likedStatus = {};
        for (const movie of movieDetails) {
          try {
            const res = await authApi.get(`/likes/${movie.id}`);
            likedStatus[movie.id] = res.data.liked;
          } catch (e) {
            likedStatus[movie.id] = false;
          }
        }
        setLikedMap(likedStatus);

      } catch (err) {
        console.error(err);
        setError('Top10 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTop10();
  }, []);

  const handleLike = async (movieId) => {
    if (!isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    try {
      const isLiked = likedMap[movieId];
      if (isLiked) {
        await authApi.delete(`/likes/${movieId}`);
      } else {
        await authApi.post(`/likes`, { movieId });
      }
      setLikedMap((prev) => ({ ...prev, [movieId]: !isLiked }));
    } catch (err) {
      console.error('좋아요 처리 실패:', err.message);
    }
  };

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
        itemClass="top10-carousel-item"
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
                <FaThumbsUp
                  className={`icon ${likedMap[movie.id] ? 'liked' : ''}`}
                  onClick={() => handleLike(movie.id)}
                />
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
