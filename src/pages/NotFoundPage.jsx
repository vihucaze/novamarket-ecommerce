import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="text-8xl font-black text-primary/30">404</div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold">Página No Encontrada</h1>
        <p className="text-xs text-base-content/70">
          La ruta a la que intentás acceder no existe o fue movida temporalmente en NovaMarket.
        </p>
      </div>
      <div className="flex gap-3">
        <Link to="/" className="btn btn-primary btn-sm gap-2">
          <Home className="w-4 h-4" /> Ir al Inicio
        </Link>
        <Link to="/catalog" className="btn btn-outline btn-sm gap-2">
          <ArrowLeft className="w-4 h-4" /> Ir al Catálogo
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
