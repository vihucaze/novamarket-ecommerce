import test from 'node:test';
import assert from 'node:assert/strict';
import { isCatalogNavigationItemActive, resolveCategoryId } from './categoryRouting.js';

const categoryIds = ['todos', 'periféricos', 'accesorios', 'gadgets'];

test('resolves an unaccented category query to its canonical catalog id', () => {
  assert.equal(resolveCategoryId('perifericos', categoryIds), 'periféricos');
});

test('activates only the catalog navigation item matching the current category', () => {
  const location = { pathname: '/catalog', search: '?cat=perifericos' };

  assert.equal(isCatalogNavigationItemActive(location, null), false);
  assert.equal(isCatalogNavigationItemActive(location, 'periféricos'), true);
  assert.equal(isCatalogNavigationItemActive(location, 'accesorios'), false);
  assert.equal(isCatalogNavigationItemActive(location, 'gadgets'), false);
});

test('activates the catalog navigation item only when no category is selected', () => {
  assert.equal(isCatalogNavigationItemActive({ pathname: '/catalog', search: '' }, null), true);
  assert.equal(isCatalogNavigationItemActive({ pathname: '/', search: '' }, null), false);
});
