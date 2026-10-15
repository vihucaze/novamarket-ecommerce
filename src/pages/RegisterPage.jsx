import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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

    if (formData.password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/catalog');
    } catch (err) {
      console.error('Error en registro:', err);
      setErrorMessage(
        err.response?.data?.message ||
          'No se pudo completar el registro. Es posible que el correo ya esté en uso.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="card bg-base-100 border border-base-200 w-full max-w-md shadow-lg p-6 sm:p-8 space-y-6 rounded-3xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Crear Cuenta</h1>
          <p className="text-xs text-base-content/70">
            Unite a NovaMarket y disfrutá de ofertas y compras protegidas
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
              <span className="label-text text-xs font-bold">Nombre Completo</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Sofía Gómez"
                className="input input-bordered input-sm sm:input-md w-full pl-10"
              />
              <User className="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold">Correo Electrónico</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="input input-bordered input-sm sm:input-md w-full pl-10"
              />
              <Mail className="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold">Contraseña</span>
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                className="input input-bordered input-sm sm:input-md w-full pl-10"
              />
              <Lock className="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-bold">Confirmar Contraseña</span>
            </label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repetí tu contraseña"
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
            {loading ? <span className="loading loading-spinner loading-sm" /> : 'Crear Mi Cuenta'}
          </button>
        </form>

        <div className="text-center text-xs text-base-content/70 pt-2 border-t border-base-200">
          ¿Ya tenés una cuenta?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Iniciá sesión acá
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
