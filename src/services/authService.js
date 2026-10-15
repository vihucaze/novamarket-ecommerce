import api from './api';

const MOCK_ADMIN = {
  _id: 'usr-admin-1',
  name: 'Admin NovaMarket',
  email: 'admin@novamarket.com',
  role: 'admin',
};

const MOCK_USER = {
  _id: 'usr-client-1',
  name: 'Carlos Tech',
  email: 'cliente@novamarket.com',
  role: 'client',
};

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        console.warn('⚠️ Backend no disponible. Usando autenticación simulada (Modo Demo).');
        if (email.includes('admin')) {
          return { token: 'mock-jwt-admin-token-12345', user: MOCK_ADMIN, isMock: true };
        }
        return {
          token: 'mock-jwt-client-token-67890',
          user: { ...MOCK_USER, email: email, name: email.split('@')[0] },
          isMock: true,
        };
      }
      throw err;
    }
  },

  async register(name, email, password) {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return response.data;
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        console.warn('⚠️ Backend no disponible. Usando registro simulado (Modo Demo).');
        return {
          token: 'mock-jwt-token-newuser-' + Date.now(),
          user: { _id: 'usr-' + Date.now(), name, email, role: 'client' },
          isMock: true,
        };
      }
      throw err;
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      const stored = localStorage.getItem('novamarket_user');
      if (stored) {
        return { user: JSON.parse(stored) };
      }
      throw err;
    }
  },
};

export default authService;
