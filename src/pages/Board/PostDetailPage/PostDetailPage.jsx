import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import './PostDetailPage.style.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3500/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => {
        alert('게시글을 찾을 수 없습니다.');
        navigate('/board');
      });
  }, [id, location.key]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:3500/posts/${id}`);
        alert('삭제되었습니다!');
        navigate('/board');
      } catch (err) {
        alert('삭제 중 오류 발생');
        console.error(err);
      }
    }
  };

  if (!post) {
    return (
      <Container className="post-detail-page">
        <h2>게시글을 불러오는 중...</h2>
      </Container>
    );
  }

  return (
    <Container className="post-detail-page">
      <div className="post-box">
        <div className="post-header-row">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-meta">
            <span className="post-author">작성자: {post.author}</span>
            <span className="post-date">
              {new Date(post.date).toLocaleString()}
            </span>
          </div>
        </div>
  
        <hr />
  
        <p className="post-content">{post.content}</p>
      </div>
  
      <div className="d-flex gap-2 mt-3">
        <Button className="outline-red-btn" onClick={() => navigate('/board')}>
          목록으로
        </Button>
        <Button className="outline-red-btn"onClick={handleDelete}>
          삭제하기
        </Button>
        <Button className="outline-red-btn"onClick={() => navigate(`/board/edit/${post.id}`)}>
          수정하기
        </Button>
      </div>
    </Container>
  );
  
};

export default PostDetailPage;
