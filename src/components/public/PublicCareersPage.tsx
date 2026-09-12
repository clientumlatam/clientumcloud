import React, { useState } from 'react';
// Re-indexed for build consistency
import {
  Briefcase,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Send,
  Zap,
  Globe,
  MapPin,
  Heart,
  Code,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';
import { PublicRoutePath } from './publicRoutes';
import { useCRM } from '../../context/CRMContext';

interface PublicCareersPageProps {
  onNavigate: (path: PublicRoutePath) => void;
}

export const PublicCareersPage: React.FC<PublicCareersPageProps> = ({ onNavigate }) => {
  const { showToast, triggerConfetti } = useCRM();
  const [selectedJob, setSelectedJob] = useState<{ title: string; type: string } | null>(null);
  const [jobForm, setJobForm] = useState({ name: '', email: '', linkedin: '', portfolio: '', notes: '' });

  const cultureValues = [
    {
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      title: 'Autonomía real',
      desc: 'No microgestionamos. Definimos objetivos claros, damos las herramientas necesarias y confiamos en el criterio de cada integrante.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      title: 'Impacto visible',
      desc: 'Lo que construís lo usan cientos de PyMEs todos los días. Ves el impacto directo de tu trabajo en los números de negocios reales.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      title: 'Aprendizaje continuo',
      desc: 'Trabajamos con IA generativa, arquitecturas modernas y automatizaciones reales. Si te gusta aprender haciendo, vas a crecer rápido.'
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: 'Equipo cercano y federal',
      desc: 'Nacimos en General Roca, Río Negro y hoy trabajamos de forma 100% remota con talento de toda la Argentina y la región.'
    }
  ];

  const jobs = [
    {
      id: 'fullstack',
      title: 'Desarrollador/a Full Stack',
      type: 'Full time · 100% Remoto',
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'APIs REST'],
      desc: 'Buscamos un/a dev con experiencia en React y Node.js para sumarse al desarrollo de ClientumOS: CRM, integraciones de WhatsApp, facturación AFIP y agentes de IA.'
    },
    {
      id: 'implementation',
      title: 'Consultor/a de Implementación',
      type: 'Full time · 100% Remoto',
      stack: ['CRM', 'Onboarding PyME', 'WhatsApp Business API', 'Procesos B2B'],
      desc: 'Serás el nexo entre la plataforma y los nuevos clientes: liderarás el onboarding, la configuración de pipelines comerciales y la capacitación de los equipos de venta.'
    },
    {
      id: 'commercial',
      title: 'Ejecutivo/a Comercial B2B',
      type: 'Full time · 100% Remoto',
      stack: ['Ventas Consultivas', 'CRM', 'Demos en Vivo', 'WhatsApp'],
      desc: 'Responsable de la prospección, reuniones de diagnóstico y cierre de cuentas PyME en Argentina y Latinoamérica. Comisiones muy atractivas en USD/ARS.'
    },
    {
      id: 'uiux',
      title: 'Diseñador/a UI/UX',
      type: 'Part time / Freelance · Remoto',
      stack: ['Figma', 'Tailwind CSS', 'Design Systems', 'Mobile First'],
      desc: 'Diseño de flujos de usuario, microinteracciones y evolución visual del sistema de diseño de ClientumOS tanto para web como para mobile.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.name || !jobForm.email) {
      showToast('Por favor completá tu nombre y correo electrónico.', 'error');
      return;
    }
    triggerConfetti();
    showToast(`¡Postulación enviada para ${selectedJob?.title}! Analizaremos tu perfil en breve.`, 'success');
    setSelectedJob(null);
    setJobForm({ name: '', email: '', linkedin: '', portfolio: '', notes: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900">
      
      {/* 1. Header & Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 shadow-2xs">
          <Briefcase className="w-3.5 h-3.5 text-blue-600" />
          <span>Trabajá con Nosotros</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Sumate al equipo que digitalizamos la Patagonia
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          En Clientum construimos tecnología real para PyMEs reales. Si te apasiona el impacto concreto, trabajar con autonomía y aprender rápido, este es tu lugar.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-700">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-600" /> 100% Remoto (Argentina & LATAM)
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600" /> Equipo ágil y sin burocracia
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Clientes e impacto real
          </span>
        </div>
      </section>

      {/* 2. Cultura Clientum */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase text-blue-600 font-bold">Nuestra Forma de Trabajar</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Cultura Clientum
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cultureValues.map((val, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 w-fit">
                {val.icon}
              </div>
              <h3 className="font-bold text-base text-slate-900">{val.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Posiciones Abiertas */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Posiciones Abiertas
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Todas las vacantes son 100% remotas desde Argentina o cualquier punto de LATAM
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg text-slate-900">{job.title}</h3>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    {job.type}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{job.desc}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.stack.map((st, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px]">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedJob({ title: job.title, type: job.type })}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Postularme a esta vacante</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Envío Espontáneo */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <h2 className="text-2xl sm:text-4xl font-black">
          ¿No encontrás tu perfil?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          Siempre estamos buscando personas talentosas con ganas de aprender y construir. Mandanos tu CV o portfolio de forma espontánea.
        </p>
        <button
          type="button"
          onClick={() => setSelectedJob({ title: 'Candidatura Espontánea', type: 'Remoto' })}
          className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg cursor-pointer transition-colors"
        >
          Enviar postulación espontánea
        </button>
      </section>

      {/* Modal Postulación */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Postulación: {selectedJob.title}</h3>
                <p className="text-xs text-slate-500">{selectedJob.type}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={jobForm.name}
                  onChange={(e) => setJobForm({ ...jobForm, name: e.target.value })}
                  placeholder="Tu nombre y apellido"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={jobForm.email}
                  onChange={(e) => setJobForm({ ...jobForm, email: e.target.value })}
                  placeholder="tu@correo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Perfil de LinkedIn / GitHub</label>
                  <input
                    type="url"
                    value={jobForm.linkedin}
                    onChange={(e) => setJobForm({ ...jobForm, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Portfolio / Link a proyectos</label>
                  <input
                    type="url"
                    value={jobForm.portfolio}
                    onChange={(e) => setJobForm({ ...jobForm, portfolio: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contanos brevemente sobre vos</label>
                <textarea
                  rows={3}
                  value={jobForm.notes}
                  onChange={(e) => setJobForm({ ...jobForm, notes: e.target.value })}
                  placeholder="Experiencia previa, tecnologías que dominás, qué te motiva de Clientum..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
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
