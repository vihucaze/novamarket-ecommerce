import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Lock, Mail, AlertCircle, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage } from '../services/authNormalizer';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const from = location.state?.from?.pathname || '/catalog';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor ingresá tu correo y contraseña.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Error de autenticación:', err);
      setErrorMessage(
        getApiErrorMessage(
          err,
          'Mmm, parece que los datos ingresados no son correctos. ¡Verificá tus credenciales e intentá de nuevo!'
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="card bg-base-100 border border-base-200 w-full max-w-md shadow-lg p-6 sm:p-8 space-y-6 rounded-3xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Iniciar Sesión</h1>
          <p className="text-xs text-base-content/70">
            Ingresá a tu cuenta de NovaMarket para gestionar tus compras
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-error text-xs rounded-xl py-2.5 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold">Correo Electrónico</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="input input-bordered input-sm sm:input-md w-full pl-10"
              />
              <Mail className="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1 flex justify-between">
              <span className="label-text text-xs font-bold">Contraseña</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered input-sm sm:input-md w-full pl-10"
              />
              <Lock className="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-md w-full gap-2 mt-2 shadow-md shadow-primary/20"
          >
            {loading ? <span className="loading loading-spinner loading-sm" /> : 'Ingresar'}
          </button>
        </form>

        <div className="p-3 bg-base-200/60 rounded-2xl border border-base-200 space-y-2 text-xs">
          <span className="font-bold text-[11px] uppercase tracking-wider text-base-content/60 block text-center">
            Acceso Rápido para Pruebas del Equipo
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillCredentials('admin@novamarket.com', 'admin123')}
              className="btn btn-outline btn-xs gap-1 text-[11px]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> Rol Admin
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('cliente@novamarket.com', 'cliente123')}
              className="btn btn-outline btn-xs gap-1 text-[11px]"
            >
              <User className="w-3.5 h-3.5 text-primary" /> Rol Cliente
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-base-content/70 pt-2 border-t border-base-200">
          ¿Aún no tenés una cuenta?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Registrate acá
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
