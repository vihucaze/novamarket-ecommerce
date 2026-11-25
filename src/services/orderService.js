import api from './api';

function normalizeOrder(raw) {
  if (!raw) return raw;

  return {
    ...raw,
    _id: raw._id ?? raw.id,
    id: raw.id ?? raw._id,
    totalAmount: Number(raw.totalAmount ?? raw.total ?? 0),
    status: raw.status || 'pending',
    createdAt: raw.createdAt || raw.created_at,
  };
}

function extractList(data) {
  if (Array.isArray(data)) return data;
  return data?.orders || data?.items || data?.data || data?.results || [];
}

function extractOne(data) {
  return data?.order || data?.data || data;
}

export const orderService = {
  async createOrder(payload) {
    const response = await api.post('/orders', payload);
    return normalizeOrder(extractOne(response.data));
  },

  async getMyOrders() {
    const response = await api.get('/orders/my');
    return extractList(response.data).map(normalizeOrder);
  },

  async getAllOrders() {
    const response = await api.get('/orders');
    return extractList(response.data).map(normalizeOrder);
  },

  async updateOrderStatus(orderId, status) {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return normalizeOrder(extractOne(response.data));
  },
};

export default orderService;
