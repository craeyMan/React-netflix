// src/components/Search/SearchBox.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBox.style.css';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (keyword.trim().length > 0) {
        navigate(`/movies?q=${keyword}`);
      }else {
        navigate('/');
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  return (
    <input
      type="text"
      placeholder="Search"
      className="search-input"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBox;