import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import analytics from '../services/analyticsService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function OrderSuccessPage() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const { cartId } = useCart();

  useEffect(() => {
    analytics.trackPurchaseCompleted({
      userId: user?._id || user?.id,
      orderId: orderId || 'ord-unknown',
      cartId,
    });
  }, [orderId, user, cartId]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
      <div className="w-24 h-24 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto shadow-inner animate-bounce">
        <CheckCircle className="w-14 h-14" />
      </div>

      <div className="space-y-3">
        <span className="badge badge-success text-white font-bold text-xs uppercase px-3 py-1">
          ¡Compra Confirmada!
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
          ¡Gracias por tu compra en NovaMarket!
        </h1>
        <p className="text-sm text-base-content/70 max-w-md mx-auto">
          Tu pedido ha sido registrado con éxito en nuestro sistema. En breve recibirás el correo transaccional de confirmación.
        </p>
      </div>

      <div className="card bg-base-100 border border-base-200 p-6 rounded-2xl shadow-sm max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between border-b border-base-200 pb-3">
          <span className="text-xs text-base-content/60">Número de Orden</span>
          <span className="font-mono font-bold text-primary">{orderId}</span>
        </div>

        <div className="flex items-center justify-between border-b border-base-200 pb-3">
          <span className="text-xs text-base-content/60">Estado</span>
          <span className="badge badge-success badge-sm text-white font-semibold">Confirmado</span>
        </div>

        <div className="p-3 bg-base-200/50 rounded-xl flex items-center gap-3 text-xs text-left text-base-content/80">
          <Package className="w-5 h-5 text-primary shrink-0" />
          <span>El paquete será despachado de acuerdo a los tiempos estimados de entrega.</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link to="/" className="btn btn-ghost btn-sm sm:btn-md gap-2">
          <Home className="w-4 h-4" /> Ir al Inicio
        </Link>
        <Link to="/catalog" className="btn btn-primary btn-sm sm:btn-md gap-2">
          Seguir Explorando <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
