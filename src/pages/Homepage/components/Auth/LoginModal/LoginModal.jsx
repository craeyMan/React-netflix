import React, { useState } from 'react';
import './LoginModal.style.css';
import { useAuth } from '../../../../../context/AuthContext';
import SignupPage from '../SignupPage/SignupPage';
import authApi from '../../../../../utils/authApi';

const LoginModal = () => {
  const { login, setShowLoginModal } = useAuth();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');
  const [autoLogin, setAutoLogin] = useState(false); // ✅ 자동 로그인 체크 상태

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authApi.post('/api/users/login', {
        username: id,
        password: pw,
      });

      const token = response.data.token;
      if (!token) {
        setMessage('⚠️ 토큰이 응답에 없습니다.');
        return;
      }

      // ✅ 자동 로그인 여부에 따라 저장소 분기
      if (autoLogin) {
        localStorage.setItem('token', token); // 자동 로그인 유지
      } else {
        sessionStorage.setItem('token', token); // 일시 로그인
      }

      login();
      setShowLoginModal(false);
      setMessage('✅ 로그인 성공!');
    } catch (error) {
      console.error('로그인 에러:', error);

      if (error.response?.status === 401) {
        setMessage('❌ 아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setMessage('⚠️ 로그인 중 오류가 발생했습니다.');
      }
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('login-modal-overlay')) {
      setShowLoginModal(false);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleBackgroundClick}>
      <button className="close-button" onClick={() => setShowLoginModal(false)}>×</button>

      {isSignup ? (
        <SignupPage setIsSignup={setIsSignup} />
      ) : (
        <div className="login-modal-content">
          <h2>로그인</h2>
          <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            name="login_id"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
            name="login_pw"
            autoComplete="new-password"
          />

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="auto-login"
              checked={autoLogin}
              onChange={() => setAutoLogin(!autoLogin)}
            />
            <label htmlFor="auto-login">자동 로그인</label>
          </div>

          <button type="submit" className="login-button">로그인</button>
          </form>

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
