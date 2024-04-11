import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [captcha, setCaptcha] = useState(null);
  const [csrf, setCsrf] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const setCaptchaStatus = (value) => {
    setCaptcha(value);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, captcha, setCaptchaStatus, csrf, setCsrf }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
