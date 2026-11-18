import React, { useEffect, useMemo, useState } from 'react';
import { BadgeCheck, IdCard, Info } from 'lucide-react';
import AccountLayout from '../components/account/AccountLayout';
import { useAuth } from '../context/AuthContext';
import { getProfileFormValues } from '../utils/profileForm';

const fieldClass =
  'w-full rounded-xl border border-base-300 bg-base-200/60 px-4 py-3 text-sm font-medium text-base-content transition focus:border-primary focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/20';
const labelClass = 'text-xs font-bold uppercase tracking-wider text-base-content/70';

export function ProfilePage() {
  const { user } = useAuth();
  const initialValues = useMemo(() => getProfileFormValues(user), [user]);
  const [formValues, setFormValues] = useState(initialValues);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    setNotice('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice('El formulario está listo; los cambios se podrán guardar cuando se conecte el endpoint de perfil.');
  };

  const handleCancel = () => {
    setFormValues(initialValues);
    setNotice('');
  };

  return (
    <AccountLayout pageTitle="Perfil público">
      <section className="rounded-2xl border border-base-300/80 bg-base-100 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Configuración de cuenta</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-base-content md:text-3xl">Perfil público</h1>
            <p className="mt-1 text-sm text-base-content/60">
              Añadí y gestioná tu información personal en NovaMarket.
            </p>
          </div>
          <div className="inline-flex self-start items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3.5 py-1.5 text-xs font-semibold text-success md:self-auto">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Cuenta activa
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-base-300/80 bg-base-100 p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-base-200 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <IdCard className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-base-content">Información básica</h2>
            <p className="text-xs text-base-content/60">Datos de tu cuenta asociados a tus compras.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Nombre</span>
              <input
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={formValues.firstName}
                onChange={handleChange}
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Apellido</span>
              <input
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={formValues.lastName}
                onChange={handleChange}
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className={labelClass}>Correo electrónico</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
                className={fieldClass}
              />
            </label>
          </div>

          {notice && (
            <div role="status" className="flex items-start gap-2 rounded-xl border border-info/20 bg-info/10 px-3.5 py-3 text-sm text-base-content">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" />
              <span>{notice}</span>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-base-200 pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={handleCancel} className="btn btn-ghost bg-base-200 text-base-content/80 hover:bg-base-300">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary gap-2 shadow-sm shadow-primary/20">
              Guardar cambios
            </button>
          </div>
        </form>
      </section>
    </AccountLayout>
  );
}

export default ProfilePage;
