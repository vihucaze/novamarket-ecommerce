# Auth backend integration

Objective: connect the existing login and register pages to the real Nova Market API, on a new branch, treating the backend repository as read-only.
Branch: `feat/auth-backend-integration`. Delivery: `ask-on-risk`. Runner: `node --test` (added in T1) plus `npm run build`.

## Specs

- **S1** (verbatim): "ok, apartir de una nueva rama vamos a conectar con el backend la seccion de login y register. creo que solo tenemos login".
- **S2** (verbatim): "backend es solo lectura". No file in `S2619-Nova-Market-API-Backend` may be modified, and no branch may be created there.
- **S3** Target contract is the one actually implemented, on `origin/QA`:
  - `POST /api/auth/register` with body `{ email, password }`; the backend ignores `name` and derives it from the email local part (`create.user.service.js`).
  - Success `201`: `{ jwt_token, user, status_code: 201, status_description: "Usuario registrado exitosamente." }`.
  - Errors: `{ error: "<message>" }` with 400/409 (`error.middleware.js`).
  - Default backend port is `3000`; the frontend default base URL must match, overridable with `VITE_API_URL`.
- **S4** `POST /api/auth/login` returns `501 { message: "Endpoint registrado, pendiente de implementar" }` on every backend branch, and `GET /api/auth/me` does not exist. The frontend must surface those failures instead of hiding them, and must not call `/auth/me`.
- **S5** The mock/demo fallback in `authService` is removed: a network failure surfaces as an error, never as a fake session.
- **S6** Session restore never depends on a profile endpoint: a stored token is kept unless it is an expired JWT (`exp` in the past). A `401` from the API clears the session and the UI state.
- **S7** Client-side register validation mirrors the backend policy (`create.user.service.js`) exactly: at least one uppercase, one lowercase, one digit and one character from `[!@#$%^&*(),.?":{}|<>]`. A password the backend rejects must never reach it.
- **S8** Backend error text is shown to the user as-is (e.g. the 501 message), with a generic fallback only when the response carries no message.

Out of scope (reported, not changed): admin role (`isAdmin` needs a `role` the backend never sends; every real user has `roleId: 1`), demo credential buttons on the login page (those accounts do not exist and no seed exists), `POST /api/analytics/events` (endpoint not implemented), and `.env.example` still documenting port 5000 (permission-restricted file).

## Tasks

- T1 — pure auth normalizer + tests. Route: inline. Specs: S3, S6, S7, S8. Done: `src/services/authNormalizer.js`, `authNormalizer.test.js` (9 cases), `authNormalizer.contract.test.js` (7 cases). RED observed (`ERR_MODULE_NOT_FOUND`), then 16/16 green.
- T2 — `api.js`: default port 3000, global 401 handling. Route: inline. Specs: S3, S6. Done: `API_BASE_URL` defaults to `http://localhost:3000/api`; 401 clears storage and dispatches `novamarket:unauthorized`, except from `/auth/login` and `/auth/register`.
- T3 — `authService.js`: real calls only, contract mapping. Route: inline. Specs: S3, S5. Done: mocks removed, `jwt_token → token`, user normalized, no `getProfile`.
- T4 — `AuthContext.jsx`: restore without `/auth/me`. Route: inline. Specs: S6. Done: localStorage restore, expired-token eviction, `novamarket:unauthorized` listener, analytics uses `user.id`.
- T5 — `LoginPage.jsx` / `RegisterPage.jsx`: error text and password policy. Route: inline. Specs: S7, S8. Done: `getApiErrorMessage` in both pages; backend password policy replaces the old 6-character rule.
- T6 — verification: tests, build, independent verifier. Route: delegated verify. Specs: all. Done: `npm test` 16/16, `npm run build` green, verifier found one S7 blocker (client accepted `-`, `_`, space, `~`, `ñ`), fixed and rechecked RESOLVED with 0 parity mismatches over 294 probes.

## Log

- L1 (verbatim): "ok, apartir de una nueva rama vamos a conectar con el backend la seccion de login y register. creo que solo tenemos login".
- L2 (verbatim): "backend es solo lectura".
- L3: Explored both repositories. Backend `main` has 501 stubs only; `origin/QA` implements register at `POST /api/auth/register`; login is `notImplemented` everywhere; `GET /auth/me` does not exist; no seed users; default port 3000; JWT payload `{ roleId, email, name, lastName }` with `sub = user.id`, `expiresIn 1h`.
- L4: Confirmed `RegisterPage.jsx` already existed and is routed at `/register`, contradicting the user's premise that only login existed.
- L5: `gentle-ai review mode status` reports receipt-driven development off (global), so no native review cycle applies.
- L6: Task classified large: it touches high-risk item 2 (auth, credentials, tokens), so a feature document, work-unit commits and one independent verifier apply.
- L7: Implemented T1-T5 incrementally; `api.js` keeps `VITE_API_URL` as the only override and never clears the session on credential 401s, so a wrong password does not look like a logout.
- L8: Independent verifier reported one blocker: `validatePassword` used `[^A-Za-z0-9]`, broader than the backend's `[!@#$%^&*(),.?":{}|<>]`, so `Password1-`, `Password1_`, `Password1 ` and `Password1ñ` reached the backend and got a 400.
- L9: Corrected the special-character class to the backend literal and pinned it with `authNormalizer.contract.test.js` (S7 parity over rejected/accepted samples). `npm test` 16/16, `npm run build` green.
- L10: Focused recheck of the blocker: regexes byte-identical, 294-pair parity probe with 0 mismatches, no over-rejection. Blocker RESOLVED; no further findings requested.
- L11: Known consequences, not defects: login stays unusable until the backend implements it (501 surfaced verbatim); admin access stays unreachable (`roleId: 1`, no role); the register form's `name` is still sent and ignored by the backend.
- Risk: item 2 (auth tokens and credentials) and item 3 (the API contract consumers rely on). Mitigated by the contract tests and the independent verifier.
