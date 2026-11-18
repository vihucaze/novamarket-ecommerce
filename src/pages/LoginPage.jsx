import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage } from '../services/authNormalizer';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e29e3]/20 focus:border-[#3e29e3] transition shadow-sm';
const labelClass = 'block text-xs uppercase tracking-wider font-bold text-slate-700';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 lg:px-12 py-10">
      <div className="w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Login form column */}
        <section className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center max-w-[440px] mx-auto w-full">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3e29e3]/10 border border-[#3e29e3]/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3e29e3] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-[#3e29e3] uppercase">
                Bienvenido de nuevo
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-2 uppercase">
              Iniciar sesión
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Ingresa a tu cuenta de NovaMarket para seguir tus pedidos, guardar tus favoritos y
              acceder a ofertas exclusivas.
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2 rounded-xl border border-[#ba1a1a]/25 bg-[#ba1a1a]/[0.08] px-3.5 py-3 text-xs font-medium text-[#ba1a1a]"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className={labelClass} htmlFor="email">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@ejemplo.com"
                  className={`${inputClass} pl-10`}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass} htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  className={`${inputClass} pl-10 pr-11`}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#3e29e3] focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#3e29e3] hover:bg-[#3120be] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide transition duration-150 ease-in-out shadow-lg shadow-[#3e29e3]/25 flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <span>Ingresar</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-slate-500">
              ¿Aún no tienes cuenta?
              <Link
                to="/register"
                className="text-[#3e29e3] font-bold hover:underline underline-offset-4 transition-colors ml-1.5"
              >
                Registrarme
              </Link>
            </p>
          </div>

          <p className="mt-4 text-center text-[11px] text-slate-400 leading-relaxed">
            Al iniciar sesión, aceptas nuestros{' '}
            <span className="font-medium text-slate-600 underline underline-offset-2">
              Términos y Condiciones
            </span>{' '}
            y nuestra política sobre{' '}
            <span className="font-medium text-slate-600 underline underline-offset-2">
              Protección de Datos
            </span>
            .
          </p>
        </section>

        {/* Editorial column */}
        <section className="hidden lg:flex lg:col-span-6 xl:col-span-7 h-full justify-center items-center">
          <div className="relative w-full max-w-[580px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#1b1464] border border-slate-200/40 group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,#3e29e3_0%,transparent_58%),radial-gradient(circle_at_88%_92%,#2700bf_0%,transparent_52%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-black/10" />

            <div className="absolute top-8 left-8 right-8 flex justify-between items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#3e29e3]" />
                Compra protegida
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase bg-[#3e29e3] px-3 py-1.5 rounded-full text-white shadow-md shadow-[#3e29e3]/40">
                Garantía oficial
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="w-24 h-24 text-white/10" strokeWidth={1} />
            </div>

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#c0bdff] mb-1.5">
                Ecosistema next-gen
              </p>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase leading-snug mb-2">
                Tu pedido, siempre a la vista
              </h2>
              <p className="text-xs text-slate-300 font-normal leading-relaxed max-w-md">
                Seguimiento en tiempo real, historial de compras y soporte especializado en un solo
                lugar.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
