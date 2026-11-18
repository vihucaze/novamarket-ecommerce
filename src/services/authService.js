import api from './api';
import { extractAuthPayload } from './authNormalizer';

const MISSING_USER = 'El servidor no devolvió los datos del usuario.';

function readUser(data, token) {
  const payload = extractAuthPayload(data);

  if (!payload.user) {
    throw new Error(MISSING_USER);
  }

  return { token: payload.token || token, user: payload.user };
}

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return readUser(response.data);
  },

  // The backend ignores `name` and derives it from the email local part.
  async register(name, email, password) {
    const response = await api.post('/auth/register', { name, email, password });
    return readUser(response.data);
  },
};

export default authService;
