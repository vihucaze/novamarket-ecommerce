import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import analytics from '../services/analyticsService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('novamarket_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('novamarket_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const storedToken = localStorage.getItem('novamarket_token');
      if (storedToken) {
        try {
          const data = await authService.getProfile();
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('novamarket_user', JSON.stringify(data.user));
          }
        } catch (err) {
          console.warn('Sesión no pudo restaurarse o token expirado');
          if (!storedToken.startsWith('mock-')) {
            logout();
          }
        }
      }
      setLoading(false);
    }
    restoreSession();
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('novamarket_token', data.token);
    localStorage.setItem('novamarket_user', JSON.stringify(data.user));

    analytics.trackLogin({ userId: data.user._id || data.user.id });

    return data.user;
  };

  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('novamarket_token', data.token);
    localStorage.setItem('novamarket_user', JSON.stringify(data.user));

    analytics.trackSignUp({ userId: data.user._id || data.user.id });

    return data.user;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('novamarket_token');
    localStorage.removeItem('novamarket_user');
  };

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
