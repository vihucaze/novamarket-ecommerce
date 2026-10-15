import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import productService from '../services/productService';
import analytics from '../services/analyticsService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);

        analytics.trackViewItemDetail({
          userId: user?._id || user?.id,
          productId: data._id,
          categoryId: data.category,
        });
      } catch (err) {
        console.error('Error cargando producto:', err);
        setError('El producto solicitado no fue encontrado.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, user]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-error">Producto No Encontrado</h2>
        <p className="text-sm text-base-content/70">{error || 'No pudimos localizar este artículo.'}</p>
        <Link to="/catalog" className="btn btn-primary btn-sm gap-2">
          <ArrowLeft className="w-4 h-4" /> Volver al Catálogo
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const fallbackImage = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-3 text-xs text-base-content/60">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-xs gap-1 text-base-content"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver
        </button>
        <span>/</span>
        <Link to="/catalog" className="hover:text-primary">
          Catálogo
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-base-content font-medium truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 bg-base-100 border border-base-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="relative rounded-2xl overflow-hidden bg-base-200 aspect-square flex items-center justify-center border border-base-200">
          <img
            src={product.imageUrl || fallbackImage}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="badge badge-primary uppercase font-bold text-xs tracking-wider px-3 py-2">
              {product.category}
            </span>
            {isOutOfStock && (
              <span className="badge badge-error text-white font-bold text-xs px-3 py-2">
                Sin Stock
              </span>
            )}
            {isLowStock && (
              <span className="badge badge-warning text-white font-bold text-xs px-3 py-2">
                ¡Solo quedan {product.stock} unidades!
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              NovaMarket Hardware Series
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-base-content">
              {product.name}
            </h1>

            <div className="pt-2">
              <span className="text-xs text-base-content/60 block">Precio final IVA incluido</span>
              <div className="text-3xl sm:text-4xl font-black text-primary">
                {formatCurrency(product.price)}
              </div>
            </div>

            <div className="pt-4 border-t border-base-200 text-sm text-base-content/80 leading-relaxed space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-base-content/70">
                Descripción del Producto
              </h4>
              <p>{product.description}</p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-base-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-base-300 rounded-xl overflow-hidden bg-base-200/50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="px-3 py-2 text-base font-bold hover:bg-base-300 disabled:opacity-40 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                  disabled={quantity >= (product.stock || 99) || isOutOfStock}
                  className="px-3 py-2 text-base font-bold hover:bg-base-300 disabled:opacity-40 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`btn btn-md sm:btn-lg flex-1 ${
                  added ? 'btn-success text-white' : 'btn-primary'
                } gap-2 shadow-md`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> ¡Agregado al carrito!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" /> Agregar al Carrito
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-base-content/70">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-base-200/50">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <span>Envío en 24-48 hs</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-base-200/50">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Garantía oficial 12 meses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
