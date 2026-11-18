import test from 'node:test';
import assert from 'node:assert/strict';
import { getProfileFormValues } from './profileForm.js';

test('maps the authenticated user to editable profile fields', () => {
  assert.deepEqual(
    getProfileFormValues({
      name: 'Claudio Peñalva',
      lastName: 'Peñalva',
      email: 'claudio@example.com',
    }),
    {
      firstName: 'Claudio',
      lastName: 'Peñalva',
      email: 'claudio@example.com',
    }
  );
});

test('handles missing profile values without inventing identity data', () => {
  assert.deepEqual(getProfileFormValues(null), {
    firstName: '',
    lastName: '',
    email: '',
  });
});
