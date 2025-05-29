import React, { useState } from 'react';
import './LoginModal.style.css';
import { useAuth } from '../../../../../hooks/useAuth';
import SignupPage from '../SignupPage/SignupPage';

const LoginModal = () => {
  const { login, toggleLoginModal } = useAuth();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login();
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