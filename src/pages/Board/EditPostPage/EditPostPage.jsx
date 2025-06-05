import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import authApi from '../../../utils/authApi';
import './EditPostPage.style.css';
import { toast } from 'react-toastify';
import { jwtDecode }from 'jwt-decode'; // ✅ 추가

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // ✅ 로그인 유저 확인 (디버깅용)
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("🔐 현재 로그인한 사용자:", decoded.sub);
    }
  }, []);

  // 게시글 불러오기
  useEffect(() => {
    authApi.get(`/posts/${id}`)
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
      await authApi.put(`/posts/${id}`, updatedPost);
      toast.success('✏️ 게시글이 수정되었습니다!');
      navigate('/board', { state: { updated: true } });
    } catch (error) {
      toast.error('❌ 수정 중 오류 발생');
      console.error(error);
    }
  };

  return (
    <Container className="edit-post-page">
      <h2>게시글 수정</h2>
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

      <Form.Group className="mb-3">
        <Form.Label>작성자</Form.Label>
        <Form.Control
          type="text"
          value={author}
          disabled
          className="custom-input"
        />
      </Form.Group>

      <Form.Group className="mb-3" style={{ position: 'relative' }}>
        <Form.Label>내용</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
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
        <Button className="outline-red-btn" type="submit">
          저장하기
        </Button>
      </Form>
    </Container>
  );
};

export default EditPostPage;
