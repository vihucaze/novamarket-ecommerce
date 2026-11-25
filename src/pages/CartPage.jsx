import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

export function CartPage() {
  const { items, totalItems, totalAmount, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-base-200 text-base-content/50 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Tu carrito está vacío</h2>
          <p className="text-sm text-base-content/70">
            Aún no agregaste productos a tu compra. ¡Explorá nuestro catálogo de tecnología y encontrá tu próximo upgrade!
          </p>
        </div>
        <div>
          <Link to="/catalog" className="btn btn-primary btn-md gap-2">
            Ver Productos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const fallbackImage = 'https://picsum.photos/seed/novamarket/600/600';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Carrito de Compras</h1>
          <p className="text-xs text-base-content/70 mt-1">
            Tenés {totalItems} {totalItems === 1 ? 'producto' : 'productos'} seleccionados
          </p>
        </div>
        <button
          onClick={clearCart}
          className="btn btn-ghost btn-sm text-error/80 hover:text-error gap-1 self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" /> Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 border border-base-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm"
            >
              <img
                src={item.imageUrl || fallbackImage}
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-base-200 shrink-0"
              />

              <div className="flex-1 space-y-1 text-center sm:text-left w-full">
                <span className="badge badge-sm badge-ghost uppercase text-[10px] font-bold">
                  {item.category}
                </span>
                <Link
                  to={`/product/${item._id}`}
                  className="font-bold text-sm sm:text-base hover:text-primary transition-colors block"
                >
                  {item.name}
                </Link>
                <div className="text-xs text-base-content/60">
                  Unitario: {formatCurrency(item.price)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border border-base-300 rounded-lg overflow-hidden bg-base-200/50">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="p-1.5 hover:bg-base-300 transition-colors"
                    aria-label="Restar una unidad"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1 text-xs font-bold min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="p-1.5 hover:bg-base-300 transition-colors"
                    aria-label="Sumar una unidad"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="btn btn-ghost btn-circle btn-sm text-error/70 hover:text-error"
                  aria-label="Eliminar producto del carrito"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right sm:min-w-[5.5rem]">
                <span className="text-sm sm:text-base font-extrabold text-primary">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link to="/catalog" className="btn btn-ghost btn-sm gap-2">
              <ArrowLeft className="w-4 h-4" /> Continuar comprando
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-200 p-6 rounded-2xl shadow-sm space-y-6">
          <h3 className="font-extrabold text-lg border-b border-base-200 pb-3">Resumen de Compra</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-base-content/70">
              <span>Subtotal ({totalItems} ítems)</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-base-content/70">
              <span>Costo de Envío</span>
              <span className="text-success font-semibold">¡Gratis!</span>
            </div>
            <div className="border-t border-base-200 pt-3 flex justify-between font-black text-lg text-base-content">
              <span>Total Final</span>
              <span className="text-primary">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-md w-full gap-2 shadow-md">
            Iniciar Checkout <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="p-3 bg-base-200/60 rounded-xl flex items-center gap-2 text-xs text-base-content/70">
            <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
            <span>Compra protegida bajo entorno de simulación seguro.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
