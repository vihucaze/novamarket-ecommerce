import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Sparkles, Keyboard, Headphones, Cpu } from 'lucide-react';
import productService from '../services/productService';
import ProductCard from '../components/catalog/ProductCard';

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getProducts();
        setFeaturedProducts(data.slice(0, 4));
      } catch (err) {
        console.error('Error cargando productos destacados', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral to-neutral-focus text-neutral-content py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Nueva Colección NovaMarket 2026
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Potenciá tu Setup con Periféricos de <span className="text-primary">Alto Nivel</span>.
            </h1>
            <p className="text-base sm:text-lg text-neutral-content/80 leading-relaxed">
              Equipamiento gamer y profesional diseñado para máxima precisión, ergonomía y rendimiento. Encontrá teclados mecánicos, mouses ultra-light y accesorios indispensables.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/catalog" className="btn btn-primary btn-md sm:btn-lg gap-2 shadow-lg shadow-primary/30">
                Explorar Catálogo <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/catalog?cat=perifericos" className="btn btn-outline btn-md sm:btn-lg text-white border-white/30 hover:bg-white/10">
                Ver Periféricos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Categorías Diseñadas para tu Estilo
          </h2>
          <p className="text-sm text-base-content/70 mt-2">
            Navegá entre nuestras líneas exclusivas con tecnología de punta
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/catalog?cat=perifericos"
            className="group relative rounded-2xl p-6 bg-gradient-to-br from-blue-500/10 to-primary/5 border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden"
          >
            <div className="p-3 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Keyboard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                Periféricos
              </h3>
              <p className="text-xs text-base-content/70 mt-1">
                Teclados mecánicos, mouses de alta sensibilidad y switches profesionales.
              </p>
            </div>
            <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 mt-4">
              Ver productos <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/catalog?cat=accesorios"
            className="group relative rounded-2xl p-6 bg-gradient-to-br from-teal-500/10 to-accent/5 border border-accent/20 hover:border-accent transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden"
          >
            <div className="p-3 w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                Accesorios
              </h3>
              <p className="text-xs text-base-content/70 mt-1">
                Auriculares con audio espacial 7.1, pads XL y soportes para setup.
              </p>
            </div>
            <span className="text-xs font-semibold text-accent inline-flex items-center gap-1 mt-4">
              Ver productos <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/catalog?cat=gadgets"
            className="group relative rounded-2xl p-6 bg-gradient-to-br from-sky-500/10 to-secondary/5 border border-secondary/20 hover:border-secondary transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden"
          >
            <div className="p-3 w-12 h-12 rounded-xl bg-secondary text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg group-hover:text-secondary transition-colors">
                Gadgets Tech
              </h3>
              <p className="text-xs text-base-content/70 mt-1">
                Stream decks con teclas LCD, hubs USB-C multipuerto y herramientas avanzadas.
              </p>
            </div>
            <span className="text-xs font-semibold text-secondary inline-flex items-center gap-1 mt-4">
              Ver productos <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Destacados de la Semana</h2>
            <p className="text-xs text-base-content/70 mt-1">Los dispositivos más elegidos por la comunidad</p>
          </div>
          <Link to="/catalog" className="btn btn-ghost btn-sm text-primary gap-1">
            Ver catálogo completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="card bg-base-100 border border-base-200 animate-pulse h-80" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
