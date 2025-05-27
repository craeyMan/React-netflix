import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useBoard } from '../BoardContext';
import './EditPostPage.style.css';

const EditPostPage = () => {
  const { id } = useParams();
  const { getPostById, updatePost } = useBoard();
  const navigate = useNavigate();
  const post = getPostById(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (!post) {
    return (
      <Container className="edit-post-page">
        <h2>게시글을 찾을 수 없습니다.</h2>
        <Button onClick={() => navigate('/board')}>목록으로</Button>
      </Container>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost({
      ...post,
      title,
      content,
    });
    alert('게시글이 수정되었습니다!');
    navigate(`/board/${post.id}`);
  };

  return (
    <Container className="edit-post-page">
      <h2>게시글 수정</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          저장하기
        </Button>
      </Form>
    </Container>
  );
};

export default EditPostPage;
