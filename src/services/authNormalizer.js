/**
 * Pure helpers to talk to the Nova Market API without importing Vite globals,
 * so they can be unit tested with `node --test`.
 */

const GENERIC_ERROR = 'No se pudo completar la operación.';

export function normalizeUser(rawUser) {
  if (!rawUser || typeof rawUser !== 'object') {
    return null;
  }

  return {
    id: rawUser.id ?? rawUser._id ?? null,
    name: rawUser.name ?? '',
    lastName: rawUser.lastName ?? '',
    email: rawUser.email ?? '',
    roleId: rawUser.roleId ?? null,
    role: rawUser.role ?? null,
    lastLogin: rawUser.lastLogin ?? null,
    createdAt: rawUser.createdAt ?? null,
  };
}

export function extractAuthPayload(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Respuesta inválida del servidor.');
  }

  const token =
    typeof data.jwt_token === 'string' && data.jwt_token.trim()
      ? data.jwt_token
      : typeof data.token === 'string' && data.token.trim()
        ? data.token
        : null;

  if (!token) {
    throw new Error('El servidor no devolvió un token de autenticación.');
  }

  return { token, user: normalizeUser(data.user) };
}

function readMessage(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

export function getApiErrorMessage(error, fallback = GENERIC_ERROR) {
  const data = error?.response?.data;

  if (typeof data === 'string') {
    return readMessage(data) ?? fallback;
  }

  if (data && typeof data === 'object') {
    const message = readMessage(data.error) ?? readMessage(data.message);
    if (message) {
      return message;
    }
  }

  if (error?.response?.status) {
    return `${fallback} (HTTP ${error.response.status})`;
  }

  if (error?.request) {
    return 'No se pudo conectar con el servidor. Verificá que el backend esté corriendo.';
  }

  return fallback;
}

/**
 * Mirrors `create.user.service.js` on the backend: at least one uppercase,
 * one lowercase, one digit and one character from the backend's fixed set.
 * Characters such as `-`, `_`, space or non-ASCII are NOT accepted by the
 * backend, so the client must not let them through either.
 */
export function validatePassword(password) {
  if (typeof password !== 'string' || password.length === 0) {
    return 'Ingresá una contraseña.';
  }

  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe incluir al menos una letra mayúscula.';
  }

  if (!/[a-z]/.test(password)) {
    return 'La contraseña debe incluir al menos una letra minúscula.';
  }

  if (!/\d/.test(password)) {
    return 'La contraseña debe incluir al menos un número.';
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'La contraseña debe incluir al menos un carácter especial (!@#$%^&*(),.?":{}|<>).';
  }

  return null;
}

function decodeJwtPayload(token) {
  const parts = token.split('.');
  if (parts.length !== 3 || !parts[1]) {
    return null;
  }

  try {
    const normalized = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      '='
    );
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

/**
 * The backend issues 1h JWTs and has no refresh endpoint, so an expired token
 * can never be exchanged for a valid session.
 */
export function isTokenExpired(token, now = Date.now()) {
  if (typeof token !== 'string' || token.length === 0) {
    return false;
  }

  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') {
    return false;
  }

  return payload.exp * 1000 <= now;
}
