// src/pages/Board/BoardContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const BoardContext = createContext();
const STORAGE_KEY = 'board_posts';

export const BoardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    setPosts([...posts, { ...post, id: Date.now() }]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const getPostById = (id) => posts.find((p) => p.id === parseInt(id));

  const updatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  return (
    <BoardContext.Provider
      value={{ posts, addPost, deletePost, getPostById, updatePost }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);
