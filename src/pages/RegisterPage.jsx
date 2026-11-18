import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage, validatePassword } from '../services/authNormalizer';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e29e3]/20 focus:border-[#3e29e3] transition shadow-sm';
const labelClass = 'block text-xs uppercase tracking-wider font-bold text-slate-700';

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden. Por favor verificalas.');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    const displayName = [formData.firstName, formData.lastName].filter(Boolean).join(' ').trim();

    setLoading(true);
    try {
      await register(displayName, formData.email, formData.password);
      navigate('/catalog');
    } catch (err) {
      console.error('Error en registro:', err);
      setErrorMessage(
        getApiErrorMessage(
          err,
          'No se pudo completar el registro. Es posible que el correo ya esté en uso.'
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 lg:px-12 py-10">
      <div className="w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Register form column */}
        <section className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center max-w-[440px] mx-auto w-full">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3e29e3]/10 border border-[#3e29e3]/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3e29e3] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-[#3e29e3] uppercase">
                Nuevo usuario
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-2 uppercase">
              Crear cuenta
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Únete al ecosistema NovaMarket. Acceso exclusivo a ofertas tech, seguimiento en
              tiempo real y garantía extendida.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={labelClass} htmlFor="first-name">
                  Nombre
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass} htmlFor="last-name">
                  Apellido
                </label>
                <input
                  id="last-name"
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
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
              <p className="flex items-center gap-1.5 pt-0.5 text-[11px] text-slate-500">
                Requisitos: 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass} htmlFor="repeat-password">
                Repetir contraseña
              </label>
              <div className="relative">
                <input
                  id="repeat-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  className={`${inputClass} pl-10 pr-11`}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#3e29e3] focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
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
                    <span>Registrarme</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-slate-500">
              ¿Ya tienes cuenta?
              <Link
                to="/login"
                className="text-[#3e29e3] font-bold hover:underline underline-offset-4 transition-colors ml-1.5"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>

          <p className="mt-4 text-center text-[11px] text-slate-400 leading-relaxed">
            Al registrarte, aceptas nuestros{' '}
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
                Innovación tech
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase bg-[#3e29e3] px-3 py-1.5 rounded-full text-white shadow-md shadow-[#3e29e3]/40">
                Garantía oficial
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-24 h-24 text-white/10" strokeWidth={1} />
            </div>

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#c0bdff] mb-1.5">
                Ecosistema next-gen
              </p>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase leading-snug mb-2">
                Equipamiento de alto rendimiento
              </h2>
              <p className="text-xs text-slate-300 font-normal leading-relaxed max-w-md">
                Diseñado para creadores, gamers y profesionales que exigen la máxima potencia y
                confiabilidad.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RegisterPage;
