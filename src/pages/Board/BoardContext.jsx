import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../../utils/authApi'; // ✅ 인증 토큰 포함된 axios 인스턴스 사용

const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await authApi.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('📛 게시글 불러오기 실패:', err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (post) => {
    try {
      await authApi.post('/posts', post);
      fetchPosts();
    } catch (err) {
      console.error('📛 게시글 등록 실패:', err.message);
    }
  };

  const getPostById = (id) => posts.find((p) => p.id === parseInt(id));

  return (
    <BoardContext.Provider value={{ posts, getPostById, addPost }}>
      {children}
    </BoardContext.Provider>
  );
};