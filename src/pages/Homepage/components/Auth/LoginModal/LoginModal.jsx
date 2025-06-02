import React, { useState } from 'react';
import './LoginModal.style.css';
import { useAuth } from '../../../../../context/AuthContext';
import SignupPage from '../SignupPage/SignupPage';
import axios from 'axios'; // 🔥 axios 추가

const LoginModal = () => {
  const { toggleLoginModal } = useAuth(); // 로그인 로직은 여기서 처리
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState(''); // ✅ 상태 추가: 로그인 메시지

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3500/api/users/login', {
        username: id,
        password: pw,
      });

      setMessage(response.data); // 로그인 성공 메시지
      // 이 부분에서 로그인 상태로 전환하거나 토큰 저장 가능
      // 예: setIsLoggedIn(true) 등
      setTimeout(() => {
        toggleLoginModal(); // 로그인 성공 시 모달 닫기
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('❌ 아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setMessage('⚠️ 로그인 중 오류가 발생했습니다.');
      }
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('login-modal-overlay')) {
      toggleLoginModal();
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleBackgroundClick}>
      <button className="close-button" onClick={toggleLoginModal}>×</button>

      {isSignup ? (
        <SignupPage setIsSignup={setIsSignup} />
      ) : (
        <div className="login-modal-content">
          <h2>로그인</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="이메일 또는 아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
            <button type="submit" className="login-button">로그인</button>
          </form>

          {/* ✅ 로그인 메시지 표시 */}
          {message && <p className="login-message">{message}</p>}

          <button
            type="button"
            className="signup-link"
            onClick={() => setIsSignup(true)}
          >
            회원가입
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
