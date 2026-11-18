import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronRight, CircleOff, User } from 'lucide-react';

export function AccountLayout({ pageTitle, children }) {
  return (
    <div className="min-h-full bg-base-200/40">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-10">
        <nav aria-label="Ruta de navegación" className="flex items-center gap-2 mb-8 text-xs font-semibold uppercase tracking-wider text-base-content/60">
          <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5 text-base-content/40" aria-hidden="true" />
          <Link to="/profile" className="hover:text-primary transition-colors">Mi cuenta</Link>
          <ChevronRight className="w-3.5 h-3.5 text-base-content/40" aria-hidden="true" />
          <span aria-current="page" className="rounded-md bg-base-300/70 px-2.5 py-1 text-base-content">
            {pageTitle}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <aside className="lg:col-span-3 rounded-2xl border border-base-300/80 bg-base-100 p-5 shadow-sm">
            <p className="mb-4 px-2 text-[11px] font-bold uppercase tracking-wider text-base-content/50">
              Área de cuenta
            </p>
            <nav aria-label="Secciones de cuenta" className="flex flex-col gap-1">
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-content font-semibold shadow-sm shadow-primary/25'
                      : 'font-medium text-base-content/75 hover:bg-base-200'
                  }`
                }
              >
                <User className="w-5 h-5" aria-hidden="true" />
                Perfil
              </NavLink>
              <div className="mt-3 border-t border-base-200 pt-3">
                <NavLink
                  to="/profile/close-account"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-error/10 font-semibold text-error'
                        : 'font-medium text-error hover:bg-error/5'
                    }`
                  }
                >
                  <CircleOff className="w-5 h-5" aria-hidden="true" />
                  Cerrar cuenta
                </NavLink>
              </div>
            </nav>
          </aside>

          <div className="lg:col-span-9 min-w-0 flex flex-col gap-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
