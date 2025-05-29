import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // ✅ useLocation 추가
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import './PostDetailPage.style.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ✅

  const [post, setPost] = useState(null);

  // ✅ location.key 추가 → 페이지 이동마다 다시 호출됨
  useEffect(() => {
    axios.get(`http://localhost:2222/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => {
        alert('게시글을 찾을 수 없습니다.');
        navigate('/board');
      });
  }, [id, location.key]); // ✅ 핵심 포인트!

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:2222/posts/${id}`);
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
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span>작성자: {post.author}</span> 
        <span>{new Date(post.date).toLocaleString()}</span>
      </div>
      <hr />
      <p className="post-content">{post.content}</p>
      <div className="d-flex gap-2 mt-3">
        <Button variant="secondary" onClick={() => navigate('/board')}>
          목록으로
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          삭제하기
        </Button>
        <Button variant="warning" onClick={() => navigate(`/board/edit/${post.id}`)}>
          수정하기
        </Button>
      </div>
    </Container>
  );
};

export default PostDetailPage;
