import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../utils/api'; // ✅ axios 대신 공통 인스턴스 사용

const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
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
      await api.post('/posts', post);
      fetchPosts(); // 🎯 등록 후 다시 불러오기
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
