import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, ShieldCheck, Menu, X, Cpu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            <NavLink to="/catalog" className={navLinkClass}>
              Catálogo
            </NavLink>
            <NavLink to="/catalog?cat=perifericos" className={navLinkClass}>
              Periféricos
            </NavLink>
            <NavLink to="/catalog?cat=accesorios" className={navLinkClass}>
              Accesorios
            </NavLink>
            <NavLink to="/catalog?cat=gadgets" className={navLinkClass}>
              Gadgets
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="btn btn-ghost btn-circle relative hover:bg-base-200"
              aria-label="Ver carrito de compras"
            >
              <ShoppingCart className="w-6 h-6 text-base-content" />
              {totalItems > 0 && (
                <span className="badge badge-primary badge-sm absolute -top-1 -right-1 font-bold animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm sm:btn-md gap-2 rounded-full pl-2 pr-3 border border-base-300 hover:border-primary"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden lg:inline text-sm font-medium">
                    Hola, {user?.name?.split(' ')[0]}
                  </span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-200 mt-2"
                >
                  <li className="menu-title px-4 py-2 border-b border-base-200">
                    <span className="font-semibold text-base-content">{user?.name}</span>
                    <span className="text-xs text-base-content/60 lowercase">{user?.email}</span>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link to="/admin" className="text-secondary font-medium">
                        <ShieldCheck className="w-4 h-4 text-secondary" /> Panel Administrador
                      </Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogout} className="text-error font-medium">
                      <LogOut className="w-4 h-4 text-error" /> Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Ingresar
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm hidden sm:inline-flex">
                  Registrarse
                </Link>
              </div>
            )}

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
  );
}

export default Navbar;
