import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const fallbackImage = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="card bg-base-100 border border-base-200 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full group">
      <figure className="relative pt-[70%] overflow-hidden bg-base-200">
        <img
          src={product.imageUrl || fallbackImage}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          <span className="badge badge-sm badge-neutral uppercase font-semibold text-[10px] tracking-wider opacity-90">
            {product.category}
          </span>
          {isOutOfStock && (
            <span className="badge badge-sm badge-error text-white font-bold text-[10px]">
              Sin Stock
            </span>
          )}
          {isLowStock && (
            <span className="badge badge-sm badge-warning text-white font-bold text-[10px]">
              ¡Últimas {product.stock}!
            </span>
          )}
        </div>
      </figure>

      <div className="card-body p-4 sm:p-5 flex flex-col flex-1">
        <Link to={`/product/${product._id}`} className="group-hover:text-primary transition-colors">
          <h3 className="font-bold text-base leading-snug line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-base-content/70 line-clamp-2 mt-1 mb-3">
          {product.description}
        </p>

        <div className="mt-auto pt-3 border-t border-base-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-base-content/60 block">Precio contado</span>
            <span className="text-lg sm:text-xl font-extrabold text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/product/${product._id}`}
              className="btn btn-square btn-ghost btn-sm"
              title="Ver especificaciones"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`btn btn-sm ${
                added ? 'btn-success text-white' : 'btn-primary'
              } gap-1.5`}
              aria-label="Agregar al carrito"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Listo</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Agregar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
