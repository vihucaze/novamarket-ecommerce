import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage, validatePassword } from '../services/authNormalizer';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e29e3]/20 focus:border-[#3e29e3] transition';
const labelClass = 'block text-[11px] font-bold uppercase tracking-wider text-slate-800';

const headerActions = (
  <Link
    to="/login"
    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-800 hover:text-[#3e29e3] transition-colors"
  >
    Iniciar sesión
    <span aria-hidden="true">›</span>
  </Link>
);

const legalText = (
  <>
    Al iniciar sesión o registrarte, estás aceptando nuestros{' '}
    <span className="font-semibold text-slate-600 underline underline-offset-2">
      Términos y Condiciones
    </span>{' '}
    y nuestra política sobre{' '}
    <span className="font-semibold text-slate-600 underline underline-offset-2">
      Protección de Datos
    </span>
    .
  </>
);

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setErrorMessage('Por favor completá todos los campos.');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      await register(
        `${formData.firstName} ${formData.lastName}`,
        formData.email,
        formData.password
      );
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Error de registro:', err);
      setErrorMessage(getApiErrorMessage(err, 'No se pudo completar el registro.'));
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
              Nuevo usuario
            </span>
          </div>

          <h1 className="text-[36px] leading-tight font-extrabold tracking-tight text-[#171a33] mb-3">
            CREAR CUENTA
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            Únete al ecosistema NovaMarket. Acceso exclusivo a ofertas tech, seguimiento en tiempo
            real y garantía extendida.
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={labelClass} htmlFor="firstName">
                  Nombre
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass} htmlFor="lastName">
                  Apellido
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass} htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nombre@ejemplo.com"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass} htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
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
              <p className="text-[11px] text-slate-500">
                Requisitos: 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.
              </p>
            </div>

            <div className="space-y-2">
              <label className={labelClass} htmlFor="confirmPassword">
                Repetir contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#3e29e3] focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
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
                  <span>Registrarme</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#3e29e3] hover:text-[#3522c8] transition-colors"
            >
              Iniciar sesión
            </Link>
          </p>
        </section>

        {/* Editorial image column */}
        <section className="hidden lg:block">
          <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl">
            <img
              src="/images/register-store.png"
              alt="Fachada de la tienda NovaMarket"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/55 backdrop-blur-sm text-[11px] font-bold tracking-widest uppercase text-white">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Innovación Tech
              </span>
            </div>
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center px-3.5 py-2 rounded-full bg-[#3e29e3] text-[11px] font-bold tracking-widest uppercase text-white">
                Garantía oficial
              </span>
            </div>

            <div className="absolute bottom-9 left-9 right-9 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c4b5fd] mb-3">
                Ecosistema Next-Gen
              </p>
              <h2 className="text-[28px] leading-[1.15] font-extrabold uppercase tracking-tight mb-3">
                Equipamiento de alto rendimiento
              </h2>
              <p className="text-sm text-white/80 leading-relaxed max-w-md">
                Diseñado para creadores, gamers y profesionales que exigen la máxima potencia y
                confiabilidad.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
