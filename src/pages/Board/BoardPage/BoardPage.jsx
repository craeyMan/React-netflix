import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './BoardPage.style.css';
import { useBoard } from '../BoardContext';


const dummyPosts = [
  { id: 1, title: '첫 번째 글입니다', author: '성준', date: '2025-05-27' },
  { id: 2, title: 'React 게시판 만들기', author: '지피티', date: '2025-05-26' },
];

const BoardPage = () => {
  const { posts } = useBoard(); 
  const navigate = useNavigate();

  return (
    <Container className="board-page">
      <div className="board-header">
        <h2>게시판</h2>
        <Button variant="primary" onClick={() => navigate('/board/new')}>
          글쓰기
        </Button>
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
          {dummyPosts.map((post, idx) => (
            <tr key={post.id} onClick={() => navigate(`/board/${post.id}`)} style={{ cursor: 'pointer' }}>
              <td>{idx + 1}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BoardPage;