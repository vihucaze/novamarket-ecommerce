import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, ShieldCheck, Menu, X, Cpu, ChevronDown, Truck, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { isCatalogNavigationItemActive } from '../../utils/categoryRouting';

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems, totalAmount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-primary font-semibold border-b-2 border-primary pb-1'
      : 'text-base-content/80 hover:text-primary transition-colors pb-1';

  return (
    <>
      <div className="bg-base-100 border-b border-base-200 text-xs text-base-content/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 font-medium text-base-content/80">
              <Truck className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span>Envío express gratuito</span>
            </span>
            <span className="hidden sm:inline text-base-300" aria-hidden="true">|</span>
            <span className="hidden sm:inline">Asistencia premium 24/7</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap" aria-label="Preferencias regionales">
            <span>ARS ($)</span>
            <span className="text-base-300" aria-hidden="true">|</span>
            <span>Español</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur border-b border-base-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-base-content group-hover:text-primary transition-colors">
                Nova<span className="text-primary">Market</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-semibold text-accent tracking-widest block -mt-1">
                Tech Store
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>
              Inicio
            </NavLink>
            <Link
              to="/catalog"
              className={navLinkClass({ isActive: isCatalogNavigationItemActive(location, null) })}
            >
              Catálogo
            </Link>
            <Link
              to="/catalog?cat=perifericos"
              className={navLinkClass({ isActive: isCatalogNavigationItemActive(location, 'periféricos') })}
            >
              Periféricos
            </Link>
            <Link
              to="/catalog?cat=accesorios"
              className={navLinkClass({ isActive: isCatalogNavigationItemActive(location, 'accesorios') })}
            >
              Accesorios
            </Link>
            <Link
              to="/catalog?cat=gadgets"
              className={navLinkClass({ isActive: isCatalogNavigationItemActive(location, 'gadgets') })}
            >
              Gadgets
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm sm:btn-md gap-2.5 rounded-full pl-1.5 pr-2 sm:pr-3 hover:bg-base-200"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary text-primary-content flex items-center justify-center font-bold text-xs shadow-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden lg:flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-normal uppercase tracking-wider text-base-content/50">Hola,</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-base-content">
                      {user?.name?.split(' ')[0]}
                      <ChevronDown className="w-3.5 h-3.5 text-base-content/50" aria-hidden="true" />
                    </span>
                  </span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-64 border border-base-200 mt-2"
                >
                  <li className="menu-title px-3 py-2 border-b border-base-200 mb-1">
                    <span className="font-semibold text-base-content">{user?.name}</span>
                    <span className="text-xs text-base-content/60 lowercase">{user?.email}</span>
                  </li>
                  <li>
                    <Link to="/profile" className="rounded-lg font-medium text-base-content/80">
                      <User className="h-4 w-4" aria-hidden="true" /> Mi cuenta
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link to="/admin" className="text-secondary font-medium rounded-lg">
                        <ShieldCheck className="w-4 h-4 text-secondary" /> Panel Administrador
                      </Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogout} className="text-error font-medium rounded-lg">
                      <LogOut className="w-4 h-4 text-error" /> Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-base-200 text-brand-neutral flex items-center justify-center">
                  <User className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-medium text-brand-neutral">Cuenta</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-base-content">
                    <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
                    <span aria-hidden="true">/</span>
                    <Link to="/register" className="hover:text-primary transition-colors">Register</Link>
                  </span>
                </div>
              </div>
            )}

            <Link
              to="/cart"
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
              aria-label="Ver carrito de compras"
            >
              <span className="relative w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-sm">
                <ShoppingCart className="w-[18px] h-[18px]" aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </span>
              <span className="hidden sm:block text-left text-xs font-bold leading-none">
                <span className="text-[9px] text-brand-neutral font-medium block mb-1">Total del carrito</span>
                <span className="text-base-content">{formatCurrency(totalAmount)}</span>
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-ghost btn-circle btn-sm md:hidden"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-base-200 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-base-200 text-sm font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-base-200 text-sm font-medium"
            >
              Catálogo Completo
            </Link>
            <Link
              to="/catalog?cat=perifericos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-base-200 text-sm font-medium"
            >
              Periféricos
            </Link>
            <Link
              to="/catalog?cat=accesorios"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-base-200 text-sm font-medium"
            >
              Accesorios
            </Link>
            <Link
              to="/catalog?cat=gadgets"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-base-200 text-sm font-medium"
            >
              Gadgets
            </Link>
            {!isAuthenticated && (
              <div className="pt-2 border-t border-base-200 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline btn-sm w-full"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary btn-sm w-full"
                >
                  Crear Cuenta
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      </header>
    </>
  );
}

export default Navbar;
