import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import './PostDetailPage.style.css';
import { useBoard } from '../BoardContext';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, deletePost } = useBoard();  // ✅

  const post = getPostById(id);  // ✅ context에서 게시글 가져오기

  if (!post) {
    return (
      <Container className="post-detail-page">
        <h2>해당 게시글을 찾을 수 없습니다.</h2>
        <Button onClick={() => navigate('/board')}>목록으로</Button>
      </Container>
    );
  }

  const handleDelete = () => {
    deletePost(post.id);
    alert('삭제되었습니다.');
    navigate('/board');
  };

  return (
    <Container className="post-detail-page">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span>작성자: {post.author}</span>
        <span>작성일: {post.date}</span>
      </div>
      <hr />
      <p className="post-content">{post.content}</p>

      <div className="d-flex gap-2">
        <Button onClick={() => navigate('/board')} variant="secondary">
          목록으로
        </Button>
        <Button onClick={handleDelete} variant="danger">
          삭제하기
        </Button>
        <Button onClick={() => navigate(`/board/edit/${post.id}`)} variant="warning">
          수정하기
        </Button>
      </div>
    </Container>
  );
};

export default PostDetailPage;