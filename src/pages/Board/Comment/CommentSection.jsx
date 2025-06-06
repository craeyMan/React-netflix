import React, { useEffect, useState } from 'react';
import authApi from '../../../utils/authApi';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './CommentSection.style.css';

const CommentSection = ({ postId, postTitle, postAuthor, isSecret }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  const username = decoded?.sub || '';
  const role = decoded?.role || ''; // "ADMIN" 또는 "USER"

  const canView = !isSecret || username === postAuthor || role === 'ADMIN';
  const canWrite = username === postAuthor || role === 'ADMIN'; // ✅ 작성자 or 관리자만 작성 가능

  useEffect(() => {
    fetchComments();
  }, [postId, canView]);

  const fetchComments = async () => {
    if (!canView) return;
    try {
      const res = await authApi.get(`/api/comments/${postId}`);
      console.log("✅ 서버에서 받은 댓글:", res.data);
      setComments(res.data || []);
    } catch (err) {
      console.error('❌ 댓글 불러오기 실패:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await authApi.post('/api/comments', {
        postId,
        author: username,
        content,
      });
      setContent('');
      await fetchComments();
    } catch (err) {
      console.error('❌ 댓글 작성 실패:', err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await authApi.delete(`/api/comments/${commentId}`);
      await fetchComments();
    } catch (err) {
      console.error('❌ 댓글 삭제 실패:', err);
    }
  };

  return (
    <div className="comment-section">
      <h5 className="comment-title">댓글</h5>

      {!canView ? (
        <p className="text-muted">비밀글입니다. 댓글을 볼 수 없습니다.</p>
      ) : comments.length === 0 ? (
        <p className="no-comments">게시판 작성자만 댓글을 볼 수 있습니다.</p>
      ) : (
        comments.map((c) => (
            <div key={c.id} className="comment-item">
              <div className="comment-header">
                {/* ✅ 댓글 상단에 제목 표시 */}
                <div className="comment-title-in-box">{postTitle}</div>
                <button className="delete-x-btn" onClick={() => handleDelete(c.id)}>×</button>
              </div>
              <div className="comment-divider"></div>
              <div className="comment-body">
                <div className="comment-content">{c.content}</div>
                <div className="comment-meta">
                  <div className="comment-meta-author">작성자: {c.author}</div>
                  <div className="comment-meta-date">
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
                  </div>
                </div>
              </div>
            </div>
          ))
      )}

      {canWrite && (
        <Form onSubmit={handleSubmit} className="comment-form mt-4">
          <Row className="mb-2">
            <Col>
              <Form.Label className="comment-label">게시글 제목</Form.Label>
              <Form.Control type="text" value={postTitle || ''} placeholder="제목 불러오는 중..." readOnly />
            </Col>
            <Col>
              <Form.Label className="comment-label">작성자</Form.Label>
              <Form.Control type="text" value={username} readOnly />
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label className="comment-label">댓글 내용</Form.Label>
            <Form.Control
                as="textarea"
                rows={4}
                placeholder="댓글을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={500}
            />
            {/* ✅ 입력창 바깥 아래쪽에 고정되는 글자 수 */}
            <div className="char-count-outside">
                {content.length} / 500자
            </div>
            </Form.Group>
          <Button type="submit" className="outline-red-btn mt-2">댓글 작성</Button>
        </Form>
      )}
    </div>
  );
};

export default CommentSection;
