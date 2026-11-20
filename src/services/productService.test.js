import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

// Node has no localStorage; provide a minimal in-memory shim before tests run.
const store = new Map();
globalThis.localStorage = {
  getItem: (key) => (store.has(key) ? store.get(key) : null),
  setItem: (key, value) => store.set(key, String(value)),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear(),
};

const { productService } = await import('./productService.js');
const { default: api } = await import('./api.js');

const originalGet = api.get;
const originalPost = api.post;

beforeEach(() => {
  store.clear();
});

afterEach(() => {
  api.get = originalGet;
  api.post = originalPost;
});

test('getProducts falls back to mock when API returns 200 with a non-array body', async () => {
  api.get = async () => ({ data: { message: 'Listado de productos' } });

  const products = await productService.getProducts();

  assert.ok(Array.isArray(products), 'expected an array, got ' + typeof products);
  assert.ok(products.length > 0, 'expected mock products, got empty list');
});

test('getProducts keeps category filtering on the mock fallback path', async () => {
  api.get = async () => ({ data: { message: 'Listado de productos' } });

  const products = await productService.getProducts('accesorios');

  assert.ok(Array.isArray(products));
  assert.ok(products.length > 0);
  for (const p of products) {
    assert.equal(p.category.toLowerCase(), 'accesorios');
  }
});

test('getProducts returns the API array untouched when it is a valid list', async () => {
  const apiList = [{ _id: 'api-1', name: 'API Product', category: 'gadgets', price: 100, active: true }];
  api.get = async () => ({ data: apiList });

  const products = await productService.getProducts();

  assert.strictEqual(products, apiList);
});

test('getProducts falls back to mock when the API request fails', async () => {
  api.get = async () => {
    throw new Error('Network down');
  };

  const products = await productService.getProducts();

  assert.ok(Array.isArray(products));
  assert.ok(products.length > 0);
});

test('getProductById falls back to mock when API returns a non-product body', async () => {
  api.get = async () => ({ data: { message: 'Detalle de producto' } });

  const product = await productService.getProductById('prod-1');

  assert.equal(product._id, 'prod-1');
  assert.ok(product.name);
});

test('getProductById returns the API product when the body is a real product', async () => {
  const apiProduct = { _id: 'api-9', name: 'API Detail', category: 'gadgets', price: 50 };
  api.get = async () => ({ data: apiProduct });

  const product = await productService.getProductById('api-9');

  assert.strictEqual(product, apiProduct);
});
