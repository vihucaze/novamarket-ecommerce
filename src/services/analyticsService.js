const STORAGE_KEY = 'novamarket_tracking_logs';
const MAX_LOGS = 50;

function generateEventId() {
  return `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

function emitEvent(eventName, payload) {
  const fullPayload = {
    event_id: generateEventId(),
    event_timestamp: new Date().toISOString(),
    ...payload,
  };

  console.groupCollapsed(`[Analytics Event]: ${eventName}`);
  console.log('Payload:', fullPayload);
  console.groupEnd();

  try {
    const history = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
    history.push({ event: eventName, ...fullPayload });
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-MAX_LOGS)));
  } catch (error) {
    return fullPayload;
  }

  return fullPayload;
}

export const analytics = {
  trackViewItemDetail({ userId, productId, categoryId }) {
    return emitEvent('view_item_detail', {
      user_id: userId || null,
      product_id: productId,
      category_id: categoryId,
    });
  },

  trackAddToCart({ userId, cartId, productId, quantity, unitPrice }) {
    return emitEvent('add_to_cart', {
      user_id: userId || null,
      cart_id: cartId,
      product_id: productId,
      quantity: Number(quantity) || 1,
      unit_price: Number(unitPrice),
    });
  },

  trackRemoveFromCart({ userId, cartId, productId, quantity, unitPrice }) {
    return emitEvent('remove_from_cart', {
      user_id: userId || null,
      cart_id: cartId,
      product_id: productId,
      quantity: Number(quantity) || 1,
      unit_price: Number(unitPrice),
    });
  },

  trackBeginCheckout({ userId, cartId }) {
    return emitEvent('begin_checkout', {
      user_id: userId || null,
      cart_id: cartId,
    });
  },

  trackPurchaseCompleted({ userId, orderId, cartId }) {
    return emitEvent('purchase_completed', {
      user_id: userId || null,
      order_id: orderId,
      cart_id: cartId,
    });
  },

  trackLogin({ userId }) {
    return emitEvent('login', { user_id: userId });
  },

  trackSignUp({ userId }) {
    return emitEvent('sign_up', { user_id: userId });
  },
};

export default analytics;
