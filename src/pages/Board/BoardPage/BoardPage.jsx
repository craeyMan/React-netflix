import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Pagination } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import authApi from '../../../utils/authApi';
import './BoardPage.style.css';

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const navigate = useNavigate();
  const location = useLocation();

  const fetchPosts = async () => {
    try {
      const res = await authApi.get('/posts');
      setPosts(res.data.reverse()); // 최신글이 위로 오게
    } catch (err) {
      console.error('📛 게시글 목록 불러오기 실패:', err.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.get(`/posts/search?keyword=${keyword}`);
      setPosts(res.data.reverse());
      setCurrentPage(1); // 검색 시 페이지 초기화
    } catch (err) {
      console.error('📛 검색 실패:', err.message);
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

  // 페이징 계산
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

    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        1
      </Pagination.Item>
    );

    if (currentPage > 4 && totalPages > 5) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      if (pageNum > 1 && pageNum < totalPages) {
        items.push(
          <Pagination.Item
            key={pageNum}
            active={currentPage === pageNum}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </Pagination.Item>
        );
      }
    }

    if (currentPage < totalPages - 3 && totalPages > 5) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    // 7) 항상 보이는 마지막 페이지(totalPages)
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    // 8) Next 버튼
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
            <th>#</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, idx) => (
            <tr
              key={post.id}
              onClick={() => navigate(`/board/${post.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <td>{indexOfFirstPost + idx + 1}</td>
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
