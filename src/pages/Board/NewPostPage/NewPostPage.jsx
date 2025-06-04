import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useBoard } from '../BoardContext';
import './NewPostPage.style.css';
import { toast } from 'react-toastify';


const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const { addPost } = useBoard(); // ✅ BoardContext에서 authApi를 써야 함!

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      author,
      // date는 백엔드에서 자동으로 저장하므로 생략
    };

    try {
      await addPost(newPost);
      toast.success('📝 게시글이 등록되었습니다!');
      navigate('/board');
    } catch (error) {
      console.error('등록 실패:', error);
      toast.error('❌ 등록 중 오류 발생');
    }
  };

  return (
    <Container className="new-post-page">
      <h2>새 글 작성</h2>
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
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="custom-input"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="custom-input"
          />
        </Form.Group>

        <Button type="submit" className="outline-red-btn">
          등록
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostPage;
