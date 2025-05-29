import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get('http://localhost:2222/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('게시글 불러오기 실패:', err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (post) => {
    await axios.post('http://localhost:2222/posts', post);
    fetchPosts(); // 🎯 등록 후 다시 불러오기 (자동 반영)
  };

  const getPostById = (id) => posts.find((p) => p.id === parseInt(id));

  return (
    <BoardContext.Provider value={{ posts, getPostById, addPost }}>
      {children}
    </BoardContext.Provider>
  );
};
