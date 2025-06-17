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
import { useAuth } from '../../../../context/AuthContext';
import { responsive } from '../../../../constants/responsive';
import { toast } from 'react-toastify'; 

const Top10Slider = ({ onMovieClick }) => {
  const [topMovies, setTopMovies] = useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
         // 서버에서 좋아요 기준 Top10 영화 ID 목록 받아오기 + 각 영화 상세 정보 요청
        const res = await authApi.get('/likes/top10');
        const movieDetails = await Promise.all(
          res.data.map(async (item) => {
            const detailRes = await Api.get(`/movie/${item.movieId}`);
            return detailRes.data;
          })
        );
        setTopMovies(movieDetails);

        // 로그인된 유저의 영화별 좋아요 상태 조회
        const likedStatus = {};
        for (const movie of movieDetails) {
          try {
            const res = await authApi.get(`/likes/${movie.id}`);
            likedStatus[movie.id] = res.data.liked;
          } catch {
            likedStatus[movie.id] = false;
          }
        }
        setLikedMap(likedStatus);
      } catch {
        setError('Top10 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTop10();
  }, []);

  // 좋아요 버튼 클릭 처리, 삭제 처리
  const handleLike = async (movieId) => {
    if (!isLoggedIn) {
      toast.warn('로그인 후 이용 가능합니다.');
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
    } catch {}
  };

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="top10-slider-wrapper">
      <h2 className="top10-title">Top 10</h2>
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
