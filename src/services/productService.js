import api from './api';

const FALLBACK_IMAGE = 'https://picsum.photos/seed/novamarket/600/600';

function readCategory(category) {
  if (category && typeof category === 'object') {
    return category.name || category.slug || '';
  }
  return category || '';
}

export function normalizeProduct(raw) {
  if (!raw) return raw;

  return {
    ...raw,
    _id: raw._id ?? raw.id,
    id: raw.id ?? raw._id,
    name: raw.name || raw.title || '',
    description: raw.description || '',
    price: Number(raw.price) || 0,
    stock: Number(raw.stock) || 0,
    category: readCategory(raw.category),
    imageUrl: raw.imageUrl || raw.image_url || raw.image || FALLBACK_IMAGE,
    active: raw.active !== false,
  };
}

function extractList(data) {
  if (Array.isArray(data)) return data;
  return data?.products || data?.items || data?.data || data?.results || [];
}

function extractOne(data) {
  return data?.product || data?.data || data;
}

function toPayload(product) {
  return {
    name: product.name,
    description: product.description,
    price: Number(product.price),
    stock: Number(product.stock),
    category: product.category,
    imageUrl: product.imageUrl,
  };
}

export const productService = {
  async getProducts(category) {
    const params = category && category !== 'todos' ? { category } : undefined;
    const response = await api.get('/products', { params });
    return extractList(response.data).map(normalizeProduct);
  },

  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return normalizeProduct(extractOne(response.data));
  },

  async createProduct(product) {
    const response = await api.post('/products', toPayload(product));
    return normalizeProduct(extractOne(response.data));
  },

  async updateProduct(id, product) {
    const response = await api.put(`/products/${id}`, toPayload(product));
    return normalizeProduct(extractOne(response.data));
  },

  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export default productService;
