import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import LoginModal from './LoginModal/LoginModal';

const AuthButton = () => {
  const { isLoggedIn, logout, toggleLoginModal, showLoginModal } = useAuth();

  return (
    <>
      <span
        onClick={isLoggedIn ? logout : toggleLoginModal}
        className="nav-login-text"
        style={{ color: 'white', cursor: 'pointer', fontSize: '1rem', padding: '8px 12px' }}
      >
        {isLoggedIn ? '로그아웃' : '로그인'}
      </span>
      {showLoginModal && <LoginModal />}
    </>
  );
};

export default AuthButton;
