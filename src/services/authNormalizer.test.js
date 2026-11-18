import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractAuthPayload,
  normalizeUser,
  getApiErrorMessage,
  validatePassword,
  isTokenExpired,
} from './authNormalizer.js';

function makeJwt(payload) {
  const encode = (value) =>
    Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(payload)}.signature`;
}

test('extractAuthPayload maps jwt_token to token and normalizes the user', () => {
  const data = {
    jwt_token: 'abc.def.ghi',
    user: {
      id: 7,
      email: 'sofia@example.com',
      name: 'sofia',
      lastName: 'gomez',
      roleId: 1,
      lastLogin: null,
      createdAt: '2026-11-18T10:00:00.000Z',
    },
    status_code: 201,
    status_description: 'Usuario registrado exitosamente.',
  };

  const result = extractAuthPayload(data);

  assert.equal(result.token, 'abc.def.ghi');
  assert.deepEqual(result.user, {
    id: 7,
    name: 'sofia',
    lastName: 'gomez',
    email: 'sofia@example.com',
    roleId: 1,
    role: null,
    lastLogin: null,
    createdAt: '2026-11-18T10:00:00.000Z',
  });
});

test('extractAuthPayload falls back to a legacy token field', () => {
  const result = extractAuthPayload({ token: 'legacy-token', user: { id: 1 } });

  assert.equal(result.token, 'legacy-token');
  assert.equal(result.user.id, 1);
});

test('extractAuthPayload rejects a response without token', () => {
  assert.throws(() => extractAuthPayload({ user: { id: 1 } }), /token/i);
  assert.throws(() => extractAuthPayload(null), /respuesta/i);
});

test('normalizeUser keeps _id based users working', () => {
  const user = normalizeUser({ _id: 'usr-1', name: 'Carlos', role: 'admin' });

  assert.equal(user.id, 'usr-1');
  assert.equal(user.role, 'admin');
  assert.equal(user.email, '');
});

test('getApiErrorMessage prefers the backend error field', () => {
  const error = {
    response: { status: 409, data: { error: 'El email ya está registrado.' } },
  };

  assert.equal(getApiErrorMessage(error), 'El email ya está registrado.');
});

test('getApiErrorMessage reads the 501 stub message', () => {
  const error = {
    response: {
      status: 501,
      data: { message: 'Endpoint registrado, pendiente de implementar' },
    },
  };

  assert.equal(
    getApiErrorMessage(error),
    'Endpoint registrado, pendiente de implementar'
  );
});

test('getApiErrorMessage reports a network failure instead of a fake session', () => {
  assert.match(getApiErrorMessage({ request: {}, code: 'ERR_NETWORK' }, 'x'), /servidor/i);
  assert.equal(getApiErrorMessage(null, 'fallback'), 'fallback');
});

test('validatePassword mirrors the backend policy', () => {
  assert.match(validatePassword('secreto'), /mayúscula/i);
  assert.match(validatePassword('Secreto1'), /especial/i);
  assert.equal(validatePassword('Secreto1!'), null);
});

test('isTokenExpired compares exp against now', () => {
  const expired = makeJwt({ sub: '1', exp: 1_700_000_000 });
  const valid = makeJwt({ sub: '1', exp: 4_000_000_000 });

  assert.equal(isTokenExpired(expired, 1_800_000_000_000), true);
  assert.equal(isTokenExpired(valid, 1_800_000_000_000), false);
  assert.equal(isTokenExpired('not-a-jwt', 1_800_000_000_000), false);
  assert.equal(isTokenExpired('', 1_800_000_000_000), false);
});
