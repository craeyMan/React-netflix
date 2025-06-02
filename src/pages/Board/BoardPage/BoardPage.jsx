import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './BoardPage.style.css';

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:3500/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('게시글 목록 불러오기 실패:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3500/posts/search?keyword=${keyword}`);
      setPosts(res.data);
    } catch (err) {
      console.error('검색 실패:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (location.state?.updated) {
      fetchPosts();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <Container className="board-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
  <h2 className="text-white">게시판</h2>

  <div className="d-flex align-items-center gap-2">
  <Form onSubmit={handleSearch} className="d-flex align-items-center gap-2">
  <input
    type="text"
    placeholder="제목 검색"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    className="common-input"
  />
  <Button type="submit" className="outline-red-btn ms-2">검색</Button>
</Form>

      <Button
        variant="primary"
        onClick={() => navigate('/board/new')}
        className="outline-red-btn"
      >
        글쓰기
      </Button>
    </div>
  </div>
      <Table striped bordered hover responsive className="board-table">
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, idx) => (
            <tr
              key={post.id}
              onClick={() => navigate(`/board/${post.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <td>{idx + 1}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>
                {new Intl.DateTimeFormat('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: true,
                }).format(new Date(post.date))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BoardPage;
