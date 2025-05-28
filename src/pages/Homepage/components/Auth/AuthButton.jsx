import React from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import LoginModal from './LoginModal/LoginModal';

const AuthButton = () => {
  const { isLoggedIn, logout, showLoginModal, toggleLoginModal } = useAuth();

  return (
    <>
      <button onClick={isLoggedIn ? logout : toggleLoginModal} className="btn btn-danger">
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
      {showLoginModal && <LoginModal />}
    </>
  );
};

export default AuthButton;
