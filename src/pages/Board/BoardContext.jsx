import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../../utils/authApi';

const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await authApi.get('/posts');
      setPosts(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (post) => {
    try {
      await authApi.post('/posts', post);
      fetchPosts();
    } catch {}
  };

  const getPostById = (id) => posts.find((p) => p.id === parseInt(id));

  return (
    <BoardContext.Provider value={{ posts, getPostById, addPost }}>
      {children}
    </BoardContext.Provider>
  );
};
