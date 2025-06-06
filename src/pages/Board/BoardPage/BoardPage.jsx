import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Pagination } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import authApi from '../../../utils/authApi';
import './BoardPage.style.css';
import { useAuth } from '../../../context/AuthContext';

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPosts = async () => {
    try {
      const res = await authApi.get('/posts');
      setPosts(res.data.reverse());
    } catch (err) {
      console.error('📛 게시글 목록 불러오기 실패:', err.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.get(`/posts/search?keyword=${keyword}`);
      setPosts(res.data.reverse());
      setCurrentPage(1);
    } catch (err) {
      console.error('📛 검색 실패:', err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPosts();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (location.state?.updated) {
      fetchPosts();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      />
    );

    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
    );

    return <Pagination className="custom-pagination">{items}</Pagination>;
  };

  return (
    <Container className="board-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-white"></h2>
        <div className="d-flex align-items-center gap-2">
          <Form onSubmit={handleSearch} className="d-flex align-items-center gap-2">
            <input
              type="text"
              placeholder="제목 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="common-input"
            />
            <Button type="submit" className="outline-red-btn ms-2">
              검색
            </Button>
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
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, idx) => (
            <tr key={post.id}>
              <td>{indexOfFirstPost + idx + 1}</td>
              <td>
                <span
                  className="post-title-hover"
                  onClick={() => {
                    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                    if (!token) return;

                    const { sub: username, role } = JSON.parse(atob(token.split('.')[1]));
                    const isAdmin = role === 'ADMIN';
                    const isAuthor = post.author === username;

                    if (post.isSecret && !isAdmin && !isAuthor) {
                      alert('🔒 비밀글입니다.');
                      return;
                    }

                    navigate(`/board/${post.id}`);
                  }}
                >
                  {post.title}
                  {post.isSecret && (
                    <span style={{ marginLeft: '6px', color: 'red' }}>🔒</span>
                  )}
                </span>
              </td>
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
                }).format(new Date(post.createdAt))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-3">
        {renderPagination()}
      </div>
    </Container>
  );
};

export default BoardPage;
