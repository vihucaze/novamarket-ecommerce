import {
  Store,
  MapPin,
  Clock,
  Headset,
  Truck,
  BadgeCheck,
  PackageCheck,
  ArrowUpRight,
  ChevronRight,
  Zap,
  ShieldCheck,
  RefreshCw,
  Leaf,
} from "lucide-react";

const quickFaqs = [
  {
    path: "shipping",
    icon: Truck,
    label: "Envíos 24h y seguimiento de paquetes",
  },
  {
    path: "warranty",
    icon: BadgeCheck,
    label: "Garantía oficial y cobertura NovaCare",
  },
  {
    path: "returns",
    icon: PackageCheck,
    label: "Gestión de devoluciones en 3 pasos",
  },
];

const guarantees = [
  { icon: ShieldCheck, label: "Pago Seguro SSL", tone: "text-tertiary" },
  { icon: RefreshCw, label: "30 días devolución fácil", tone: "text-primary-container" },
  { icon: Leaf, label: "Embalaje reciclable", tone: "text-tertiary" },
];

const stats = [
  { value: "3 Años", label: "Garantía oficial" },
  { value: "< 15 min", label: "Atención chat" },
  { value: "100%", label: "Dispositivos certificados" },
];

export function ContactPage() {
  return (
    <div className="bg-background text-on-surface">
      <div className="flex flex-col w-full">
        {/* Hero & Header Section */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed">
                  Centro de Soporte Tech
                </span>
                <span className="text-xs text-outline font-medium">
                  Resolución inmediata
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-background leading-tight">
                Conéctate con nuestro{" "}
                <span className="text-primary-container">equipo</span>
              </h1>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mt-3 max-w-xl">
                Estamos listos para asistirte en tiempo real con pedidos,
                soporte técnico, especificaciones de dispositivos y devoluciones
                ágiles.
              </p>
            </div>
            {/* Live Hub Status Badge */}
            <div className="bg-surface-container-low border border-surface-variant/70 p-4 rounded-2xl flex items-center gap-4 self-start md:self-end shadow-sm">
              <div className="relative flex items-center justify-center w-3.5 h-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed-dim opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary" />
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-outline">
                  Centro de Operaciones
                </span>
                <span className="block text-xs font-semibold text-on-surface">
                  Madrid Hub · Tiempo resp. ~8 min
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-surface-variant" />
        </section>

        {/* Main 3-Column Section */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Punto Presencial */}
            <div className="bg-surface-container-low border border-surface-variant rounded-2xl p-7 relative overflow-hidden shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-primary-container font-bold block">
                      Punto Presencial
                    </span>
                    <h3 className="text-xl font-bold text-on-surface mt-1">
                      Tech Hub &amp; Experience Center
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-3.5 text-sm text-on-surface-variant">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-container mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-on-surface">
                        Paseo de la Castellana 95
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Distrito Tecnológico, 28046 Madrid, España
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary-container mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-on-surface">
                        Lunes a Sábado: 09:00 — 21:00 h
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Domingos: 11:00 — 19:00 h (Zona Demo)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-variant/80 flex items-center justify-between">
                <a
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-container hover:text-primary transition-colors"
                  href="#"
                >
                  <span>Agendar demo personalizada</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Pickup inmediato
                </span>
              </div>
            </div>

            {/* Card 2: Canales Rápidos */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-7 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-primary-container font-bold block">
                      Canales Rápidos
                    </span>
                    <h3 className="text-xl font-bold text-on-surface mt-1">
                      Atención Inmediata
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                    <Headset className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-surface-container-low border border-surface-variant/60 rounded-xl p-3.5 flex flex-col justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-outline mb-1">
                      Mesa de Ayuda Digital
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <a
                        className="font-semibold text-on-surface hover:text-primary-container transition-colors text-sm"
                        href="mailto:soporte@novamarket.com"
                      >
                        soporte@novamarket.com
                      </a>
                      <a
                        className="text-xs text-on-surface-variant hover:text-primary-container transition-colors"
                        href="mailto:empresas@novamarket.com"
                      >
                        empresas@novamarket.com (B2B)
                      </a>
                    </div>
                  </div>
                  <div className="bg-surface-container-low border border-surface-variant/60 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-outline mb-0.5 block">
                        Línea Directa / WhatsApp
                      </span>
                      <a
                        className="font-semibold text-on-surface hover:text-primary-container transition-colors text-sm"
                        href="tel:+34900800900"
                      >
                        +34 900 800 900
                      </a>
                    </div>
                    <span className="text-[11px] bg-secondary-container text-on-secondary-fixed px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                      Gratuito
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Preguntas frecuentes rápidas */}
            <div className="bg-surface-container-low border border-surface-variant rounded-2xl p-7 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="text-[11px] uppercase tracking-wider text-outline block mb-1 font-bold">
                    Base de Conocimiento
                  </span>
                  <h4 className="text-xl font-bold text-on-surface">
                    Preguntas frecuentes rápidas
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {quickFaqs.map(({ path, icon: Icon, label }) => (
                    <a
                      key={path}
                      className="flex items-center justify-between p-3 bg-surface-container-lowest border border-surface-variant/60 rounded-xl hover:border-primary-container hover:bg-surface-container-high/40 transition-all text-on-surface group"
                      data-path={path}
                      href="#"
                    >
                      <span className="flex items-center gap-2.5 font-medium">
                        <Icon className="w-[18px] h-[18px] text-primary-container shrink-0" />
                        <span>{label}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary-container transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Guarantee & Ecosystem Banner */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 mb-12">
          <div className="bg-gradient-to-br from-surface-container-high via-surface-container-low to-surface-container-lowest border border-surface-variant rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
            {/* Visual Left Block */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center absolute inset-0"
                alt="Especialista de soporte al cliente trabajando en una configuración de monitores doble en una oficina luminosa y contemporánea"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxvLvExNmLMxc6DlgvrJckv7poOX3GQ1gyVEivkr14u--SVWZ5Vf59k7AU2n9ZFKNcpP4hefQW6ycx2sjNnBG-5VGMtCurKoRwBZBr7tPU1jWrndElgeuagaObfMnQNr-jEOReEHQFKl71Ftcq7TK7gjznm-uBdI8fJBLuw51rEwul8NjzzM8dfYa9SGGsb6YvXB1R30OTbXd777ErW_25TyHRr2uFCgSc5j9iL0qxuBu6ugXzlaSJ6Q"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-6 left-6 text-inverse-on-surface lg:hidden">
                <span className="text-[10px] uppercase tracking-wider font-bold bg-primary-container px-2.5 py-1 rounded-full text-white">
                  NovaMarket Hub
                </span>
                <p className="text-xl font-bold mt-1">Ecosistema Conectado</p>
              </div>
            </div>
            {/* Narrative Right Block */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary-container mb-3">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider font-bold">
                    Compromiso NovaCare
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-on-surface leading-snug mb-4">
                  Garantía integral, respuesta ágil y tecnología de vanguardia
                </h3>
                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-6 font-normal">
                  En NovaMarket combinamos el catálogo de hardware más
                  innovador con un soporte postventa sin fricción. Cada compra
                  incluye protección garantizada, seguimiento telemático y
                  reemplazo exprés si algo no funciona a la perfección.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-variant">
                  {stats.map(({ value, label }) => (
                    <div key={label}>
                      <span className="text-2xl md:text-3xl font-extrabold text-primary-container block">
                        {value}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 flex flex-wrap items-center gap-6">
                {guarantees.map(({ icon: Icon, label, tone }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-xs font-semibold text-on-surface"
                  >
                    <Icon className={`w-5 h-5 ${tone}`} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
