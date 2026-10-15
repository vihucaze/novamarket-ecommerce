import api from './api';

function getLocalOrders() {
  const stored = localStorage.getItem('novamarket_mock_orders');
  return stored ? JSON.parse(stored) : [];
}

function saveLocalOrders(orders) {
  localStorage.setItem('novamarket_mock_orders', JSON.stringify(orders));
}

export const orderService = {
  async createOrder(orderPayload) {
    try {
      const response = await api.post('/orders', orderPayload);
      return response.data;
    } catch (err) {
      console.warn('⚠️ Guardando orden en almacenamiento local (Modo Demo)');
      const orders = getLocalOrders();
      const newOrder = {
        _id: 'ord-' + Math.floor(1000 + Math.random() * 9000),
        items: orderPayload.items,
        totalAmount: orderPayload.totalAmount,
        shippingAddress: orderPayload.shippingAddress,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        user: orderPayload.user || 'usr-guest',
      };
      orders.unshift(newOrder);
      saveLocalOrders(orders);
      return newOrder;
    }
  },

  async getMyOrders() {
    try {
      const response = await api.get('/orders/my');
      return response.data;
    } catch (err) {
      return getLocalOrders();
    }
  },

  async getAllOrders() {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (err) {
      return getLocalOrders();
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (err) {
      const orders = getLocalOrders();
      const order = orders.find((o) => o._id === orderId);
      if (order) {
        order.status = status;
        saveLocalOrders(orders);
        return order;
      }
      throw new Error('Orden no encontrada');
    }
  },
};

export default orderService;
