import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminPage from '../pages/AdminPage';
import ProfilePage from '../pages/ProfilePage';
import CloseAccountPage from '../pages/CloseAccountPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

export function AppRouter() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/close-account" element={<CloseAccountPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
