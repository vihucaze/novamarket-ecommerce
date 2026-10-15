import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Truck, RefreshCw, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="border-b border-base-300/80 bg-base-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Envíos Rápidos y Seguros</h4>
                <p className="text-xs text-base-content/70">Despachos asegurados a todo el país</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Compra 100% Protegida</h4>
                <p className="text-xs text-base-content/70">Garantía oficial en todos los productos</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Soporte Técnico Especializado</h4>
                <p className="text-xs text-base-content/70">Asesoramiento gamer y profesional</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">
                Nova<span className="text-primary">Market</span>
              </span>
            </div>
            <p className="text-xs text-base-content/70 leading-relaxed mb-4">
              Tu tienda online de referencia en tecnología, accesorios ergonómicos, periféricos de alto rendimiento y gadgets de última generación.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-3 uppercase tracking-wider text-base-content/80">
              Categorías
            </h5>
            <ul className="space-y-2 text-xs text-base-content/70">
              <li>
                <Link to="/catalog?cat=perifericos" className="hover:text-primary transition-colors">
                  Periféricos (Teclados, Mouses)
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=accesorios" className="hover:text-primary transition-colors">
                  Accesorios (Auriculares, Pads)
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=gadgets" className="hover:text-primary transition-colors">
                  Gadgets & Stream Tools
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-primary transition-colors">
                  Todos los Productos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-3 uppercase tracking-wider text-base-content/80">
              Proyecto
            </h5>
            <ul className="space-y-2 text-xs text-base-content/70">
              <li>
                <span className="badge badge-outline badge-sm text-[10px] mb-1">Talently Lab Simulación</span>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Acceso Cliente / Admin
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary transition-colors">
                  Mi Carrito
                </Link>
              </li>
              <li>
                <span className="text-base-content/50">Simulación MVP NovaMarket</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-3 uppercase tracking-wider text-base-content/80">
              Contacto
            </h5>
            <p className="text-xs text-base-content/70 mb-3">
              ¿Tenés dudas técnicas o sobre tu pedido ficticio?
            </p>
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <Mail className="w-4 h-4" /> contacto@novamarket.com
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-base-content/60 gap-4">
          <p>© 2026 NovaMarket E-Commerce. Proyecto colaborativo Talently Lab.</p>
          <p>Desarrollado con React, Tailwind CSS y DaisyUI.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
