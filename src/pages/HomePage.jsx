import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Cpu, Headphones, Keyboard, RefreshCw, Shield } from 'lucide-react';
import productService from '../services/productService';
import ProductCard from '../components/catalog/ProductCard';

const shoppingBenefits = [
  {
    Icon: BadgeCheck,
    title: 'Productos 100% originales',
    description: 'Garantía genuina y confiable',
  },
  {
    Icon: Shield,
    title: 'Pago seguro',
    description: 'Pago cifrado con SSL de 256 bits',
  },
  {
    Icon: RefreshCw,
    title: 'Devoluciones fáciles',
    description: '7 días para devoluciones y cambios',
  },
  {
    Icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Estamos aquí para ayudarte cada día',
  },
];

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
      <section className="space-y-6 pt-6 sm:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative isolate flex min-h-[420px] items-center overflow-hidden rounded-3xl bg-[#080b1e] shadow-xl sm:min-h-[480px] lg:h-[min(38vw,500px)]">
            <img
              src="/images/hero-banner.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080b1e]/95 via-[#080b1e]/75 to-[#080b1e]/15" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_110%,rgba(62,41,227,0.55),transparent_55%)]" />

            <div className="relative z-10 w-full px-6 py-12 sm:px-12 lg:px-14">
              <div className="max-w-xl space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  Última colección
                </div>
                <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Renová tu día a día con{' '}
                  <span className="bg-gradient-to-r from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                    tecnología
                  </span>
                </h1>
                <p className="max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                  Dispositivos premium. Mejor rendimiento. Un futuro más inteligente.
                </p>
                <Link
                  to="/catalog"
                  className="btn btn-primary btn-sm gap-2 shadow-lg shadow-primary/30 sm:btn-md"
                >
                  Comprar ahora <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-base-200 rounded-2xl border border-base-200 bg-base-100 px-4 shadow-sm sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-4 xl:divide-x xl:divide-y-0">
            {shoppingBenefits.map(({ Icon, title, description }) => (
              <div key={title} className="flex items-center gap-4 px-3 py-5 sm:px-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-base-content">{title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-base-content/60">{description}</p>
                </div>
              </div>
            ))}
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
