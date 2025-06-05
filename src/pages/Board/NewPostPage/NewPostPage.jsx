import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useBoard } from '../BoardContext';
import { useAuth } from '../../../context/AuthContext'; // ✅ 유저 정보 사용
import { jwtDecode } from 'jwt-decode'; // ✅ 토큰 디코딩
import './NewPostPage.style.css';
import { toast } from 'react-toastify';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const { addPost } = useBoard();
  const { isLoggedIn } = useAuth();

  // ✅ 로그인된 유저 이름 자동 입력
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuthor(decoded.sub); // username 들어있다고 가정
      } catch (e) {
        console.error('JWT 디코딩 실패:', e);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length > 10) {
      toast.error('❌ 제목은 10자 이하여야 합니다.');
      return;
    }

    if (content.length > 500) {
      toast.error('❌ 내용은 500자 이하여야 합니다.');
      return;
    }

    const newPost = { title, content, author };

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
      <Form.Group className="mb-3" style={{ position: 'relative' }}>
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={10}
          className="custom-input"
        />
        <div style={{
          position: 'absolute',
          right: '10px',
          bottom: '-20px',
          fontSize: '0.85rem',
          color: '#aaa'
        }}>
          {title.length}/10자
        </div>
      </Form.Group>

      {/* 작성자 입력창 */}
      <Form.Group className="mb-3">
        <Form.Label>작성자</Form.Label>
        <Form.Control
          type="text"
          value={author}
          readOnly
          className="custom-input"
        />
      </Form.Group>

      {/* 내용 입력창 */}
      <Form.Group className="mb-3" style={{ position: 'relative' }}>
        <Form.Label>내용</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          maxLength={500}
          className="custom-input"
        />
        <div style={{
          position: 'absolute',
          right: '10px',
          bottom: '-20px',
          fontSize: '0.85rem',
          color: '#aaa'
        }}>
          {content.length}/500자
        </div>
      </Form.Group>

        <Button type="submit" className="outline-red-btn">
          등록
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostPage;
