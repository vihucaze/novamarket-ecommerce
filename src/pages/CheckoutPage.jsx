import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';
import analytics from '../services/analyticsService';
import { formatCurrency } from '../utils/formatters';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart, cartId } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    dni: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate('/catalog');
      return;
    }

    analytics.trackBeginCheckout({
      userId: user?._id || user?.id,
      cartId,
    });
  }, [items.length, navigate, user, cartId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.address || !formData.city || !formData.phone) {
      setError('Por favor completá los campos obligatorios de entrega.');
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        items: items.map((i) => ({
          product: i._id,
          name: i.name,
          quantity: i.quantity,
          priceAtPurchase: i.price,
        })),
        totalAmount,
        shippingAddress: {
          fullName: formData.fullName,
          dni: formData.dni,
          street: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          phone: formData.phone,
          notes: formData.notes,
        },
      };

      const createdOrder = await orderService.createOrder(orderPayload);

      clearCart();
      navigate(`/order-success/${createdOrder._id}`);
    } catch (err) {
      console.error('Error procesando compra:', err);
      setError('Ocurrió un error al procesar el pedido. Por favor intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-3">
        <Link to="/cart" className="btn btn-ghost btn-sm gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver al Carrito
        </Link>
        <span className="text-sm font-semibold text-base-content/60">Paso Final: Confirmación</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 card bg-base-100 border border-base-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="border-b border-base-200 pb-4">
            <h1 className="text-2xl font-black">Datos de Envío y Facturación</h1>
            <p className="text-xs text-base-content/70 mt-1">
              Ingresá la dirección donde querés recibir tus productos NovaMarket.
            </p>
          </div>

          {error && (
            <div className="alert alert-error text-xs rounded-xl py-2.5">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold">Nombre Completo *</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
                  className="input input-bordered input-sm sm:input-md w-full"
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold">DNI o CUIT *</span>
                </label>
                <input
                  type="text"
                  name="dni"
                  required
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="Ej: 38456789"
                  className="input input-bordered input-sm sm:input-md w-full"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-bold">Dirección de Entrega (Calle y Número) *</span>
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Ej: Av. Corrientes 1234, Piso 4 B"
                className="input input-bordered input-sm sm:input-md w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="form-control sm:col-span-2">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold">Ciudad / Localidad *</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Ej: Córdoba Capital"
                  className="input input-bordered input-sm sm:input-md w-full"
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold">Código Postal *</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Ej: 5000"
                  className="input input-bordered input-sm sm:input-md w-full"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-bold">Teléfono de Contacto *</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ej: +54 9 11 2345-6789"
                className="input input-bordered input-sm sm:input-md w-full"
              />
            </div>

            <div className="pt-4 border-t border-base-200">
              <label className="label py-1">
                <span className="label-text text-xs font-bold">Modalidad de Pago (Simulación MVP)</span>
              </label>
              <div className="p-4 bg-base-200/50 rounded-xl border border-base-300 flex items-center gap-3">
                <input type="radio" checked readOnly className="radio radio-primary radio-sm" />
                <div>
                  <span className="text-sm font-bold block">Pago Simulado / Contra Entrega</span>
                  <span className="text-xs text-base-content/70">
                    Por alcance del MVP (Semana 1-8), no se requiere tarjeta real. El pedido se confirmará inmediatamente.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-md sm:btn-lg w-full gap-2 shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <Lock className="w-5 h-5" /> Confirmar Pedido ({formatCurrency(totalAmount)})
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="card bg-base-100 border border-base-200 p-6 rounded-2xl shadow-sm space-y-5">
          <h3 className="font-extrabold text-base border-b border-base-200 pb-3">Detalle del Pedido</h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between items-center text-xs">
                <div className="pr-2 truncate">
                  <span className="font-bold">{item.quantity}x</span> {item.name}
                </div>
                <span className="font-extrabold shrink-0 text-primary">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-base-200 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-base-content/70">
              <span>Subtotal</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-base-content/70">
              <span>Envío</span>
              <span className="text-success font-semibold">Gratis</span>
            </div>
            <div className="flex justify-between text-base font-black pt-2 border-t border-base-200 text-base-content">
              <span>Total a Pagar</span>
              <span className="text-primary">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <div className="p-3 bg-success/10 text-success-content rounded-xl flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
            <span className="text-success font-medium">Transacción protegida y cifrada</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
