import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(prev => !prev);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, showLoginModal, toggleLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ 여기에 alias 추가
export const useAuth = () => useContext(AuthContext);