import React, { useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import LoginModal from './LoginModal/LoginModal';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import { toast } from 'react-toastify'; // ✅ 추가

const AuthButton = () => {
  const { isLoggedIn, logout, toggleLoginModal, showLoginModal } = useAuth();
  const navigate = useNavigate(); // ✅ 추가

  // ✅ 로그인 성공 시 모달 자동 닫기 보정
  useEffect(() => {
    if (isLoggedIn && showLoginModal) {
      toggleLoginModal();
    }
  }, [isLoggedIn]);

  const handleClick = () => {
    if (isLoggedIn) {
      logout();
      toast.success('👋 로그아웃 되었습니다.');
      navigate('/');
    } else {
      toggleLoginModal();
    }
  };

  return (
    <>
      <span
        onClick={handleClick}
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
