import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, HelpCircle } from 'lucide-react';

/**
 * Shell propio de las páginas de autenticación.
 * Diferente al Layout global: navbar mínima y footer mínimo,
 * tal como aparecen en las referencias de diseño.
 */
export function AuthLayout({ actions, legal, children }) {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#f9f9ff] text-slate-900"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <header className="w-full">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[100px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#3e29e3] flex items-center justify-center shadow-lg shadow-[#3e29e3]/30 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white fill-white" strokeWidth={1.5} />
            </div>
            <div className="leading-none">
               <span className="text-[19px] font-extrabold tracking-tight text-slate-900">
                 NovaMarket<span className="text-[#3e29e3]">.</span>
              </span>
              <span className="block text-[9px] font-bold tracking-[0.3em] text-slate-500 mt-1.5">
                NEXT-GEN GEAR
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">{actions}</div>
        </div>
      </header>

      <main className="flex-1 flex items-center">{children}</main>

      <footer className="mt-auto border-t border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 py-7 flex flex-col items-center gap-2.5 text-center">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <HelpCircle className="w-4 h-4 text-slate-600" />
            ¿Necesitas ayuda? Centro de Soporte NovaCare
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-[560px]">{legal}</p>
        </div>
      </footer>
    </div>
  );
}

export default AuthLayout;
