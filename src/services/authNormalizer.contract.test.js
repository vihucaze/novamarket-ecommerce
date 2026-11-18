import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractAuthPayload,
  getApiErrorMessage,
  validatePassword,
  isTokenExpired,
} from './authNormalizer.js';

// Backend policy, copied verbatim from origin/QA src/services/create.user.service.js
const BACKEND_SPECIAL = /[!@#$%^&*(),.?":{}|<>]/;
const backendAccepts = (password) =>
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password) &&
  BACKEND_SPECIAL.test(password);

// S3: real 201 register shape from auth.controller.js
test('S3 maps the real register response', () => {
  const data = {
    jwt_token: 'h.p.s',
    user: {
      id: 7,
      name: 'sofia',
      lastName: '',
      email: 'sofia@example.com',
      roleId: 1,
      lastLogin: null,
      createdAt: '2026-11-18T10:00:00.000Z',
    },
    status_code: 201,
    status_description: 'Usuario registrado exitosamente.',
  };

  const { token, user } = extractAuthPayload(data);

  assert.equal(token, 'h.p.s');
  assert.equal(user.id, 7);
  assert.equal(user.email, 'sofia@example.com');
  assert.equal(user.roleId, 1);
});

// S8: backend text shown as-is
test('S8 surfaces { error } verbatim', () => {
  assert.equal(
    getApiErrorMessage({
      response: { status: 409, data: { error: 'El email ya está registrado' } },
    }),
    'El email ya está registrado'
  );
});

test('S8 surfaces the 501 { message } verbatim', () => {
  assert.equal(
    getApiErrorMessage({
      response: {
        status: 501,
        data: { message: 'Endpoint registrado, pendiente de implementar' },
      },
    }),
    'Endpoint registrado, pendiente de implementar'
  );
});

// S5: network failure is an error, never a fake session
test('S5 reports a network failure', () => {
  assert.match(getApiErrorMessage({ request: {}, code: 'ERR_NETWORK' }, 'x'), /servidor/i);
});

// S7: every password the backend rejects must be rejected client-side
test('S7 rejects every password the backend rejects', () => {
  const rejected = [
    'Password1-',
    'Password1_',
    'Password1~',
    'Password1 ',
    'Password1+',
    'Password1ñ',
    'password1!',
    'PASSWORD1!',
    'Password!',
    'Password1',
  ];

  for (const password of rejected) {
    assert.equal(backendAccepts(password), false, `backend rejects ${JSON.stringify(password)}`);
    assert.notEqual(
      validatePassword(password),
      null,
      `frontend must reject ${JSON.stringify(password)}`
    );
  }
});

test('S7 accepts passwords the backend accepts', () => {
  for (const password of ['Secreto1!', 'Good1@pass', 'Az9#kLm']) {
    assert.equal(backendAccepts(password), true, `backend accepts ${JSON.stringify(password)}`);
    assert.equal(validatePassword(password), null);
  }
});

// S6: only expired JWTs are dropped; valid/malformed are kept
test('S6 drops only expired JWTs', () => {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const makeJwt = (payload) => `${encode({ alg: 'HS256' })}.${encode(payload)}.sig`;

  assert.equal(isTokenExpired(makeJwt({ sub: '1', exp: 1_700_000_000 }), 1_800_000_000_000), true);
  assert.equal(isTokenExpired(makeJwt({ sub: '1', exp: 4_000_000_000 }), 1_800_000_000_000), false);
  assert.equal(isTokenExpired('not-a-jwt', 1_800_000_000_000), false);
});
