import React, { createContext, useContext, useEffect, useState } from 'react';
import authApi from '../utils/authApi';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [likedMap, setLikedMap] = useState({});
  const [top10, setTop10] = useState([]);

  // 전체 좋아요 상태 불러오기
  useEffect(() => {
    if (!isLoggedIn) return;
    fetchUserLikes();
    fetchTop10(); 
  }, [isLoggedIn]);

  // 로그인된 유저가 좋아요한 영화 ID 목록
  const fetchUserLikes = async () => {
    try {
      const res = await authApi.get('/likes/all');
      const map = {};
      res.data.forEach((item) => {
        map[item.movieId] = true;
      });
      setLikedMap(map);
    } catch (err) {
      console.error('Failed to fetch likes:', err);
    }
  };

  // 좋아요 기준 Top10 불러오기
  const fetchTop10 = async () => {
    try {
      const res = await authApi.get('/likes/top10');
      const movieDetails = await Promise.all(
        res.data.map(async (item) => {
          const detail = await api.get(`/movie/${item.movieId}`);
          return detail.data;
        })
      );
      setTop10(movieDetails);
    } catch (err) {
      console.error('Top10 fetch error:', err);
    }
  };

  // 좋아요 토글, 최신 Top10 갱신
  const toggleLike = async (movieId) => {
    try {
      const isLiked = likedMap[movieId];
      if (isLiked) {
        await authApi.delete(`/likes/${movieId}`);
      } else {
        await authApi.post('/likes', { movieId });
      }
      setLikedMap((prev) => ({ ...prev, [movieId]: !isLiked }));
      await fetchTop10(); 
    } catch (err) {
      console.error('좋아요 처리 실패:', err);
    }
  };

  return (
    <LikeContext.Provider value={{ likedMap, toggleLike, top10 }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => useContext(LikeContext);
