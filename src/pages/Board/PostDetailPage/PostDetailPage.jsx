import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import authApi from '../../../utils/authApi';
import './PostDetailPage.style.css';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import CommentSection from '../Comment/CommentSection';
import Spinner from '../../Homepage/components/Spinner/Spinner';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  const username = decoded?.sub || '';
  const role = decoded?.role || '';
  const isAdmin = role === 'ADMIN';

  useEffect(() => {
    // 토큰이 없으면 로그인 페이지로 이동
    if (!token) {
      toast.warn('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 게시글 불러오기 및 비밀글 접근 권한 검사
    const fetchPost = async () => {
      try {
        const res = await authApi.get(`/posts/${id}`);
        const fetchedPost = res.data;
        const isAuthor = username === fetchedPost.author;

        if (!fetchedPost.isSecret || isAuthor || isAdmin) {
          setPost(fetchedPost);
          if (isAuthor) setCanEdit(true);
        } else {
          toast.warn('비밀글 접근 권한이 없습니다.');
          navigate('/board');
        }
      } catch {
        toast.error('게시글을 불러오지 못했습니다.');
        navigate('/board');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, location.key]);

  const handleDelete = async () => {
    // 게시글 삭제 확인 및 삭제 처리
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await authApi.delete(`/posts/${id}`);
        toast.success('게시글이 삭제되었습니다!');
        navigate('/board');
      } catch {
        toast.error('삭제 중 오류 발생');
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container className="post-detail-page">
      <div className="post-box">
        <div className="post-header-row">
          <h2 className="post-title">
            {post.isSecret ? '🔒 ' : ''}{post.title}
          </h2>
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
