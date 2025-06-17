import React, { useState, useEffect } from 'react';
import './MovieCard.style.css';
import { FaPlay, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../utils/authApi';
import { toast } from 'react-toastify';

const MovieCard = ({ movie, onMovieClick }) => {
  const [liked, setLiked] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // 해당 영화에 대해 로그인 유저가 '좋아요' 했는지 확인
    const checkLiked = async () => {
      try {
        const res = await authApi.get(`/likes/${movie.id}`);
        setLiked(res.data.liked);
      } catch (err) {
        console.error('좋아요 상태 조회 실패:', err.message);
      }
    };
    checkLiked();
  }, [movie.id]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.warn('로그인 후 이용 가능합니다.');
      return;
    }

    try {
      // 좋아요 상태 토글
      if (!liked) {
        await authApi.post('/likes', { movieId: movie.id }); 
      } else {
        await authApi.delete(`/likes/${movie.id}`); 
      }
      setLiked(!liked);
    } catch (err) {
      console.error('좋아요 처리 실패:', err.message);
    }
  };

  const { data: genreData } = useMovieGenreQuery();

  // 장르 ID 배열 → 장르명 배열로 변환
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    return genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj?.name;
    });
  };

  return (
    <div className="movie-card">
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
            className={`icon ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          />
          <FaChevronDown
            className="icon right-icon"
            onClick={() => onMovieClick(movie)} // 상세 모달 열기
          />
        </div>

        <div className="movie-title">{movie.title}</div>

        <div className="movie-genres">
          {showGenre(movie.genre_ids)?.map((genre, index) => (
            <Badge bg="danger" key={index} className="me-1">
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
