import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, Eye, EyeOff, LifeBuoy, MessageSquareText, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccountLayout from '../components/account/AccountLayout';

const fieldClass =
  'w-full rounded-xl border border-base-300 bg-base-200/50 px-4 py-3 text-sm text-base-content placeholder:text-base-content/45 focus:border-primary focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/20';

export function CloseAccountPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const [notice, setNotice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice('No se realizó ningún cambio: el endpoint para cerrar cuentas todavía no está disponible.');
  };

  return (
    <AccountLayout pageTitle="Cerrar cuenta">
      <header className="border-b border-base-300/70 pb-6">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-error/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-error">
          <span className="h-1.5 w-1.5 rounded-full bg-error" aria-hidden="true" />
          Gestión crítica
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-base-content">Cerrar cuenta</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-base-content/65">
          Gestioná la desactivación o eliminación definitiva de tu cuenta NovaMarket. Revisá con atención el alcance de este procedimiento.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.45fr_1fr]">
        <div className="flex flex-col gap-5">
          <section className="relative overflow-hidden rounded-2xl border border-error/30 bg-base-100 p-5 shadow-sm md:p-6">
            <div className="absolute inset-y-0 left-0 w-1 bg-error" aria-hidden="true" />
            <div className="pl-2">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-error/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-error">
                  <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                  Irreversible
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-error">Atención requerida</span>
              </div>
              <h2 className="text-base font-extrabold uppercase leading-snug text-base-content md:text-lg">
                Advertencia: esta acción es permanente
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                Si cerrás tu cuenta, perderás acceso permanente a tu historial de pedidos, piezas reservadas, direcciones guardadas y promociones exclusivas de NovaMarket.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-medium text-error">
                <li className="flex items-center gap-2"><X className="h-3.5 w-3.5" aria-hidden="true" /> Pérdida de estatus curatorial</li>
                <li className="flex items-center gap-2"><X className="h-3.5 w-3.5" aria-hidden="true" /> Cancelación de listas de espera</li>
                <li className="flex items-center gap-2"><X className="h-3.5 w-3.5" aria-hidden="true" /> Anonimización de datos</li>
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-base-300/80 bg-base-100 p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-base-content">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[11px] text-primary-content">2</span>
                Verificación de identidad
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-error">Obligatorio</span>
            </div>
            <p className="mb-4 text-xs text-base-content/65">
              Para confirmar una solicitud futura, ingresá tu contraseña actual.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="relative block">
                <span className="sr-only">Contraseña actual</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setNotice('');
                  }}
                  required
                  placeholder="Introducí tu contraseña"
                  className={`${fieldClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-base-content/45 transition hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-base-300 bg-base-200/40 p-3.5 text-xs leading-relaxed text-base-content/70">
                <input
                  type="checkbox"
                  checked={understood}
                  onChange={(event) => {
                    setUnderstood(event.target.checked);
                    setNotice('');
                  }}
                  required
                  className="checkbox checkbox-sm mt-0.5 shrink-0"
                />
                <span>Comprendo que el cierre de cuenta es permanente y que perderé acceso a la información asociada.</span>
              </label>

              <div className="rounded-xl border border-info/20 bg-info/10 px-3.5 py-3 text-xs leading-relaxed text-base-content/75">
                Esta pantalla queda preparada para el endpoint de cierre. Por ahora, enviar el formulario no modifica ni elimina tu cuenta.
              </div>

              {notice && (
                <p role="status" className="rounded-xl border border-info/20 bg-info/10 px-3.5 py-3 text-sm text-base-content">
                  {notice}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="btn btn-error min-h-12 flex-1 flex-nowrap justify-center gap-2 px-3 text-xs font-bold text-white">
                  <span className="inline-flex w-fit max-w-full flex-nowrap items-center justify-center gap-2">
                    <Trash2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="whitespace-nowrap text-left text-[10px] leading-tight">Cerrar cuenta definitivamente</span>
                  </span>
                </button>
                <Link to="/profile" className="btn btn-primary min-h-12 flex-1 text-xs font-bold">
                  Conservar mi cuenta
                </Link>
              </div>
            </form>
          </section>
        </div>

        <aside className="flex flex-col gap-5">
          <section className="rounded-2xl border border-base-300/80 bg-base-100 p-5 shadow-sm md:p-6">
            <h2 className="flex items-center gap-3 text-sm font-extrabold uppercase leading-snug text-base-content">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LifeBuoy className="h-5 w-5" aria-hidden="true" />
              </span>
              ¿Necesitás ayuda antes de irte?
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-base-content/65">
              Si tuviste un inconveniente con un pedido, una garantía o necesitás asistencia, contactá al equipo de NovaMarket antes de cerrar tu cuenta.
            </p>
            <div className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-base-200 bg-base-200/50 p-3.5 transition hover:border-primary/30 hover:bg-primary/5 active:scale-[0.99]">
              <MessageSquareText className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold text-base-content">Hablar con soporte</span>
                <span className="block truncate text-[11px] text-base-content/55">contacto@novamarket.com · Atención 24/7</span>
              </span>
              <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
          </section>

          <section className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-xs leading-relaxed text-base-content/65">
            Cuando se integre el backend, la solicitud y el tratamiento de datos deberán respetar las obligaciones legales aplicables.
          </section>
        </aside>
      </div>
    </AccountLayout>
  );
}

export default CloseAccountPage;
