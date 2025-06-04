import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchBox.style.css';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 경로가 검색이 아닐 때 keyword 리셋
  useEffect(() => {
    if (!location.pathname.startsWith('/movies/search')) {
      setKeyword('');
    }
  }, [location.pathname]);

  // keyword 변경 시 검색 수행
  useEffect(() => {
    const delay = setTimeout(() => {
      if (keyword.trim().length > 0) {
        navigate(`/movies/search?q=${keyword}`);
      } else {
        // 검색창 비웠을 때만 홈으로
        if (location.pathname.startsWith('/movies/search')) {
          navigate('/');
        }
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword, navigate, location]);

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
