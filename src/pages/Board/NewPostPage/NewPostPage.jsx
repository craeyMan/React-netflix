import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NewPostPage.style.css';
import { useBoard } from '../BoardContext';



const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const { posts, addPost } = useBoard();


  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      author,
      date: new Date().toISOString().slice(0, 10),
    };

    addPost(newPost); 
    alert('게시글이 등록되었습니다!');
    navigate('/board');
  };

  return (
    <Container className="new-post-page">
      <h2>글쓰기</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>작성자</Form.Label>
          <Form.Control
            type="text"
            placeholder="작성자 이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          등록하기
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostPage;
