import React, { useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import LoginModal from './LoginModal/LoginModal';

const AuthButton = () => {
  const { isLoggedIn, logout, toggleLoginModal, showLoginModal } = useAuth();

  // ✅ 로그인 성공 시 모달 자동 닫기 보정
  useEffect(() => {
    if (isLoggedIn && showLoginModal) {
      toggleLoginModal();
    }
  }, [isLoggedIn]);

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
