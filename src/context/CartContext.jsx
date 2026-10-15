import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import analytics from '../services/analyticsService';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();

  const [cartId] = useState(() => {
    let savedId = localStorage.getItem('novamarket_cart_id');
    if (!savedId) {
      savedId = 'cart-' + Math.floor(1000 + Math.random() * 9000);
      localStorage.setItem('novamarket_cart_id', savedId);
    }
    return savedId;
  });

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('novamarket_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('novamarket_cart', JSON.stringify(items));
  }, [items]);

  const { totalItems, totalAmount } = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems: count, totalAmount: amount };
  }, [items]);

  const addItem = (product, quantityToAdd = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);
      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [
        ...prevItems,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
          stock: product.stock,
          quantity: quantityToAdd,
        },
      ];
    });

    analytics.trackAddToCart({
      userId: user?._id || user?.id,
      cartId,
      productId: product._id,
      quantity: quantityToAdd,
      unitPrice: product.price,
    });
  };

  const removeItem = (productId, quantityToRemove = null) => {
    const item = items.find((i) => i._id === productId);
    if (!item) return;

    const actualRemoved = quantityToRemove ? Math.min(quantityToRemove, item.quantity) : item.quantity;

    setItems((prevItems) => {
      if (!quantityToRemove || item.quantity <= quantityToRemove) {
        return prevItems.filter((i) => i._id !== productId);
      }
      return prevItems.map((i) =>
        i._id === productId ? { ...i, quantity: i.quantity - quantityToRemove } : i
      );
    });

    analytics.trackRemoveFromCart({
      userId: user?._id || user?.id,
      cartId,
      productId: item._id,
      quantity: actualRemoved,
      unitPrice: item.price,
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    const current = items.find((i) => i._id === productId);
    if (!current) return;

    const diff = newQuantity - current.quantity;
    if (diff > 0) {
      addItem(current, diff);
    } else if (diff < 0) {
      removeItem(productId, Math.abs(diff));
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        items,
        totalItems,
        totalAmount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}

export default CartContext;
