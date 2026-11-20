import React from 'react';
import { Link } from 'react-router-dom';
import { Headset, LockKeyhole, Mail, MapPin, Phone, ShieldCheck, Truck, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0B0E1E] text-outline-variant mt-auto">
      <div className="bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-sm">
            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-sm">Envío Express 24h</h4>
                <p className="text-xs text-on-surface-variant">Gratuito en órdenes sobre $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed-dim/20 flex items-center justify-center text-tertiary shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-sm">Garantía NovaCare</h4>
                <p className="text-xs text-on-surface-variant">3 años de protección total oficial</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-primary-container shrink-0">
                <LockKeyhole className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-sm">Pago 100% Seguro</h4>
                <p className="text-xs text-on-surface-variant">Cifrado SSL de grado bancario</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high/10 flex items-center justify-center text-primary-container shrink-0">
                <Headset className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-sm">Soporte Técnico 24/7</h4>
                <p className="text-xs text-on-surface-variant">Ingenieros especializados disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-white">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none text-white">
                  Nova<span className="text-primary-fixed-dim">Market</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline-variant mt-0.5">
                  NEXT-GEN GEAR
                </span>
              </div>
            </div>
            <p className="text-xs text-outline-variant leading-relaxed mb-4">
              Tu destino para lo último en tecnología y electrónica. Comprá de forma inteligente, elegí NovaMarket.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-3 uppercase tracking-wider text-white">
              Categorías
            </h5>
            <ul className="space-y-2 text-xs text-outline-variant">
              <li>
                <Link to="/catalog?cat=perifericos" className="hover:text-white transition-colors">
                  Periféricos (Teclados, Mouses)
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=accesorios" className="hover:text-white transition-colors">
                  Accesorios (Auriculares, Pads)
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=gadgets" className="hover:text-white transition-colors">
                  Gadgets & Stream Tools
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-white transition-colors">
                  Todos los Productos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-3 uppercase tracking-wider text-white">
              Proyecto
            </h5>
            <ul className="space-y-2 text-xs text-outline-variant">
              <li>
                <span className="badge badge-outline badge-sm text-[10px] mb-1 border-white/20 text-outline-variant">
                  Talently Lab Simulación
                </span>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Acceso Cliente / Admin
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Mi Carrito
                </Link>
              </li>
              <li>
                <span className="text-outline-variant/70">Simulación MVP NovaMarket</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-3 uppercase tracking-wider text-white">
              Contacto
            </h5>
            <ul className="space-y-2.5 text-xs text-outline-variant">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+34900800900" className="hover:text-white transition-colors">
                  +34 900 800 900
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:soporte@novamarket.com" className="hover:text-white transition-colors">
                  soporte@novamarket.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Paseo de la Castellana 95, 28046 Madrid, España</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-outline-variant gap-4">
          <p>© 2026 NovaMarket E-Commerce. Proyecto colaborativo Talently Lab.</p>
          <p>Desarrollado con React, Tailwind CSS y DaisyUI.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
