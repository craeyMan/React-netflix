import React, { useState } from 'react';
import './LoginModal.style.css';
import { useAuth } from '../../../../../hooks/useAuth';

const LoginModal = () => {
  const { login, toggleLoginModal } = useAuth();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} required />
          <input type="password" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} required />
          <button type="submit">로그인</button>
          <button type="button" onClick={toggleLoginModal}>회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
