import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage } from '../services/authNormalizer';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e29e3]/20 focus:border-[#3e29e3] transition';
const labelClass = 'block text-[11px] font-bold uppercase tracking-wider text-slate-800';

const headerActions = (
  <>
    <Link
      to="/catalog"
      className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600 hover:text-[#3e29e3] transition-colors"
    >
      Catálogo Tech
    </Link>
    <Link
      to="/register"
      className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800 border border-slate-300 rounded-lg px-5 py-2.5 hover:border-[#3e29e3] hover:text-[#3e29e3] transition-colors"
    >
      Crear cuenta
    </Link>
  </>
);

const legalText = (
  <>
    Al iniciar sesión, estás aceptando nuestros{' '}
    <span className="font-semibold text-slate-600 underline underline-offset-2">
      Términos de Servicio
    </span>{' '}
    y nuestra política sobre{' '}
    <span className="font-semibold text-slate-600 underline underline-offset-2">
      Protección y Privacidad de Datos
    </span>
    .
  </>
);

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
    <AuthLayout actions={headerActions} legal={legalText}>
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
        {/* Form column */}
        <section className="w-full max-w-[440px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ece9fd] border border-[#ddd8fb] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3e29e3]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3e29e3]">
              Acceso clientes Tech
            </span>
          </div>

          <h1 className="text-[38px] leading-tight font-extrabold tracking-tight text-[#171a33] mb-3">
            Iniciar Sesión
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            Accede a tus pedidos tech, garantías activas NovaCare y dispositivos reservados en tu
            perfil.
          </p>

          {errorMessage && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2 rounded-xl border border-[#ba1a1a]/25 bg-[#ba1a1a]/[0.08] px-3.5 py-3 text-xs font-medium text-[#ba1a1a]"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className={labelClass} htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@ejemplo.com"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label className={labelClass} htmlFor="password">
                  Contraseña
                </label>
                <span className="text-[12px] font-semibold text-[#3e29e3] cursor-default">
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce tu contraseña"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#3e29e3] focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#3e29e3] hover:bg-[#3522c8] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-[15px] transition duration-150 ease-in-out flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            ¿No tienes cuenta?{' '}
            <Link
              to="/register"
              className="font-semibold text-[#3e29e3] underline underline-offset-2 hover:text-[#3522c8] transition-colors"
            >
              Crear cuenta
            </Link>
          </p>
        </section>

        {/* Editorial image column */}
        <section className="hidden lg:block">
          <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl">
            <img
              src="/images/login-store.png"
              alt="Interior de la tienda NovaMarket"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/55 backdrop-blur-sm text-[11px] font-bold tracking-widest uppercase text-white">
                <span className="text-emerald-400 text-[10px]">▲</span>
                Edición Tech 2025
              </span>
            </div>

            <div className="absolute bottom-9 left-9 right-9 text-white">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Hardware certificado
              </p>
              <h2 className="text-[30px] leading-tight font-extrabold tracking-tight mb-3">
                Tecnología &amp; Innovación
              </h2>
              <p className="text-sm text-white/80 leading-relaxed max-w-md">
                Dispositivos de última generación concebidos para maximizar tu productividad y
                entretenimiento digital.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
