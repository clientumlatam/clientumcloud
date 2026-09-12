import React, { useState } from 'react';
// Re-indexed for build consistency
import {
  Handshake,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Zap,
  Globe,
  Sparkles,
  FileCheck,
  Building2,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PublicRoutePath } from './publicRoutes';
import { useCRM } from '../../context/CRMContext';

interface PublicPartnersPageProps {
  onNavigate: (path: PublicRoutePath) => void;
}

export const PublicPartnersPage: React.FC<PublicPartnersPageProps> = ({ onNavigate }) => {
  const { showToast, triggerConfetti } = useCRM();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'afiliado' | 'implementador'>('afiliado');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    country: 'Argentina',
    message: ''
  });

  const stats = [
    { value: '30%', label: 'Comisión recurrente', sub: 'Por cada cliente activo' },
    { value: '+120', label: 'Partners activos', sub: 'En Argentina y LATAM' },
    { value: '500+', label: 'PyMEs digitalizadas', sub: 'A través de nuestra red' },
    { value: '24 hs', label: 'Soporte al partner', sub: 'Canal directo y dedicado' },
  ];

  const tracks = [
    {
      id: 'afiliado',
      title: 'Programa de Afiliados',
      tag: 'Para creadores & consultores',
      commission: '30% comisión recurrente',
      desc: 'Recomendá Clientum a tu audiencia o red de contactos y cobrá una comisión mensual por cada empresa que se sume.',
      benefits: [
        '30% de comisión recurrente de por vida mientras el cliente esté activo',
        'Panel de control transparente en tiempo real',
        'Material de marketing, presentaciones y copies listos para usar',
        'Sin requisitos mínimos de facturación ni permanencia'
      ]
    },
    {
      id: 'implementador',
      title: 'Partners de Implementación',
      tag: 'Para agencias & desarrolladores',
      commission: 'Márgenes de reventa + servicios',
      desc: 'Integrá Clientum en los proyectos de tus clientes. Ofrecé servicios de consultoría, setup y personalización sobre nuestra plataforma.',
      benefits: [
        'Precios mayoristas de revendedor con margen comercial exclusivo',
        'Opción White Label (marca blanca con tu logo y dominio)',
        'Capacitación técnica directa y certificación oficial',
        'Derivación de leads de tu zona geográfica'
      ]
    }
  ];

  const levels = [
    {
      level: 'Nivel 01',
      title: 'Afiliado',
      req: 'Sin requisitos técnicos',
      desc: 'Ideal para profesionales independientes, consultores y creadores que quieren monetizar sus recomendaciones.',
      features: ['Link de referido único', 'Comisión del 30% recurrente', 'Kit de recursos promocionales']
    },
    {
      level: 'Nivel 02',
      title: 'Partner Certificado',
      req: 'Agencias e implementadores',
      desc: 'Para agencias de marketing y consultoras que integran Clientum en sus propuestas comerciales.',
      features: ['Onboarding técnico dedicado', 'Precios revendedor con descuento', 'Soporte prioritario por WhatsApp']
    },
    {
      level: 'Nivel 03',
      title: 'Partner Preferente',
      req: 'Volumen sostenido',
      desc: 'Para partners estratégicos con cartera activa de clientes y capacidad de implementación a escala.',
      features: ['Marca blanca completa', 'Derivación de clientes potenciales', 'Presencia en clientum.com.ar']
    }
  ];

  const steps = [
    { num: '1', title: 'Postulate', desc: 'Completá el formulario en 2 minutos con tus datos y los de tu negocio.' },
    { num: '2', title: 'Reunión inicial', desc: 'Nos contactamos en 24 hs para conocer tu perfil y asignarte el track adecuado.' },
    { num: '3', title: 'Onboarding', desc: 'Te damos acceso al portal de partners, material comercial y capacitación técnica.' },
    { num: '4', title: 'A vender', desc: 'Empezá a recomendar o implementar Clientum y generá ingresos recurrentes.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      showToast('Por favor completá tu nombre y correo electrónico.', 'error');
      return;
    }
    triggerConfetti();
    showToast('¡Postulación recibida con éxito! Te contactaremos dentro de las 24 hs.', 'success');
    setIsApplyModalOpen(false);
    setForm({ name: '', email: '', phone: '', company: '', role: '', country: 'Argentina', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900">
      
      {/* 1. Header & Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs">
          <Handshake className="w-3.5 h-3.5 text-emerald-600" />
          <span>Programa de Alianzas</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Asociate y potenciá tu negocio con Clientum
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Sumate a nuestro ecosistema y ganá dinero ayudando a digitalizar PyMEs de la Patagonia y toda Latinoamérica.
        </p>

        {/* 4 Stats */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((st, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center shadow-2xs">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">{st.value}</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{st.label}</div>
              <div className="text-[11px] text-slate-500">{st.sub}</div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsApplyModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg cursor-pointer transition-colors"
          >
            Quiero ser Partner de Clientum
          </button>
        </div>
      </section>

      {/* 2. Dos Caminos: Afiliados vs Implementadores */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase text-emerald-600 font-bold">Modalidades de Asociación</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Dos caminos para asociarte
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {track.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-600">
                    {track.commission}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900">{track.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{track.desc}</p>

                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  {track.benefits.map((b, bi) => (
                    <div key={bi} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrack(track.id as any);
                    setIsApplyModalOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Postularme como {track.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Niveles del Programa */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase text-emerald-600 font-bold">Crecimiento escalable</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Niveles del Programa
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A medida que crece tu volumen de clientes referidos o implementados, aumentan tus beneficios y soporte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((lvl, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                  {lvl.level}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{lvl.req}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{lvl.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{lvl.desc}</p>

              <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                {lvl.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Cómo Funciona en 4 Pasos */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase text-emerald-600 font-bold">Paso a paso</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Cómo funciona en 4 pasos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-2xs relative">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                {st.num}
              </span>
              <h3 className="font-bold text-base text-slate-900">{st.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Footer */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <h2 className="text-2xl sm:text-4xl font-black">
          ¿Listo para empezar a generar ingresos recurrentes?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          Sumate al programa de partners de Clientum y crecé junto a nosotros.
        </p>
        <button
          type="button"
          onClick={() => setIsApplyModalOpen(true)}
          className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg cursor-pointer transition-colors"
        >
          Postularme ahora
        </button>
      </section>

      {/* Postulation Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Postulación al Programa de Partners</h3>
                <p className="text-xs text-slate-500">Completá tus datos para contactarte en 24 horas.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre y Apellido *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Marcelo Gómez"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="marcelo@agencia.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+54 9 298 451-0883"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Empresa / Agencia</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Mi Agencia Digital"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Track de Interés</label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                  >
                    <option value="afiliado">Programa de Afiliados (30% Recurrente)</option>
                    <option value="implementador">Partner de Implementación (White Label)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mensaje o comentarios</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Contanos brevemente sobre tu perfil o cartera de clientes..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
                >
                  Enviar Postulación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
