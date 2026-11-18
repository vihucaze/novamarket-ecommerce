import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import analytics from '../services/analyticsService';
import { isTokenExpired } from '../services/authNormalizer';
import { UNAUTHORIZED_EVENT } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('novamarket_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('novamarket_token') || null);
  const [loading, setLoading] = useState(true);

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('novamarket_token');
    localStorage.removeItem('novamarket_user');
  };

  // The API exposes no profile endpoint (`GET /auth/me` does not exist), so the
  // session is restored from storage and only discarded when the JWT expired.
  useEffect(() => {
    const storedToken = localStorage.getItem('novamarket_token');

    if (storedToken && isTokenExpired(storedToken)) {
      clearSession();
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => clearSession();
    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, []);

  const persistSession = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('novamarket_token', data.token);
    localStorage.setItem('novamarket_user', JSON.stringify(data.user));
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    persistSession(data);
    analytics.trackLogin({ userId: data.user.id });
    return data.user;
  };

  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    persistSession(data);
    analytics.trackSignUp({ userId: data.user.id });
    return data.user;
  };

  const logout = () => clearSession();

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

export default AuthContext;
