// src/pages/Board/EditPostPage/EditPostPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import './EditPostPage.style.css';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:2222/posts/${id}`)
      .then((res) => {
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
      })
      .catch(() => {
        alert('게시글을 불러오는 데 실패했습니다.');
        navigate('/board');
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, content, author };

    try {
      await axios.put(`http://localhost:2222/posts/${id}`, updatedPost);
      alert('게시글이 수정되었습니다!');
      navigate('/board', { state: { updated: true } }); // ✅ 상태와 함께 이동
    } catch (error) {
      alert('수정 중 오류 발생');
      console.error(error);
    }
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
            maxLength={15}
            className="custom-input" 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>작성자</Form.Label>
          <Form.Control
            type="text"
            value={author}
            disabled
            className="custom-input" 
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
            className="custom-input" 
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
