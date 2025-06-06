import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import authApi from '../../../utils/authApi';
import './PostDetailPage.style.css';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import CommentSection from '../Comment/CommentSection';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(null);
  const [canEdit, setCanEdit] = useState(false);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  const username = decoded?.sub || '';
  const role = decoded?.role || '';

  useEffect(() => {
    authApi.get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        if (username && username === res.data.author) {
          setCanEdit(true);
        }
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          toast.warn('🔒 비밀글입니다.');
          navigate('/board');
        } else {
          alert('게시글을 찾을 수 없습니다.');
          navigate('/board');
        }
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

      {/* ✅ 댓글 섹션 props 전달 */}
      <CommentSection
        postId={post.id}
        postTitle={post.title}
        postAuthor={post.author}
        isSecret={post.isSecret}
      />
    </Container>
  );
};

export default PostDetailPage;
