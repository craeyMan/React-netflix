import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const logoutTimer = useRef(null);

  const login = (token, rememberMe = false) => {
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
    setIsLoggedIn(true);

    try {
      const decoded = jwtDecode(token);
      const exp = decoded.exp * 1000;
      const now = Date.now();
      const timeout = exp - now;

      if (timeout > 0) {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(() => {
          logout();
          toast.info("로그인 시간이 만료되어 자동 로그아웃되었습니다.");
        }, timeout);
      }
    } catch (e) {
      // JWT 디코딩 실패 시 무시
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(prev => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      try {
        const decoded = jwtDecode(token);
        const exp = decoded.exp * 1000;
        const now = Date.now();
        const timeout = exp - now;

        if (timeout > 0) {
          logoutTimer.current = setTimeout(() => {
            logout();
            toast.info("로그인 시간이 만료되어 자동 로그아웃되었습니다.");
          }, timeout);
        } else {
          logout();
        }
      } catch (e) {
        logout(); 
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        showLoginModal,
        toggleLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
