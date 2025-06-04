import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import authApi from '../../../utils/authApi';
import './PostDetailPage.style.css';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(null);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    authApi.get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);

        // ✅ JWT에서 로그인한 사용자와 작성자 비교
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
          try {
            const decoded = jwtDecode(token);
            const username = decoded.sub || decoded.username; // 실제 subject 설정에 따라 변경
            if (username === res.data.author) {
              setCanEdit(true);
            }
          } catch (e) {
            console.error('토큰 디코딩 실패:', e);
          }
        }
      })
      .catch(() => {
        alert('게시글을 찾을 수 없습니다.');
        navigate('/board');
      });
  }, [id, location.key]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await authApi.delete(`/posts/${id}`);
        toast.success('🗑️ 게시글이 삭제되었습니다!');
        navigate('/board');
      } catch (err) {
        toast.error('❌ 삭제 중 오류 발생');
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
              {new Date(post.createdAt).toLocaleString()}
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

        {canEdit && (
          <>
            <Button className="outline-red-btn" onClick={handleDelete}>
              삭제하기
            </Button>
            <Button className="outline-red-btn" onClick={() => navigate(`/board/edit/${post.id}`)}>
              수정하기
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};

export default PostDetailPage;
