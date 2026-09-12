import React from 'react';
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Globe,
  MessageSquare,
  Receipt,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface DashboardOperationsStripProps {
  onNavigate: (tab: ActiveTab) => void;
}

const operationalAreas: Array<{
  id: ActiveTab;
  label: string;
  title: string;
  metric: string;
  detail: string;
  status: string;
  statusTone: 'good' | 'info' | 'warning';
  icon: React.ComponentType<{ size?: number; className?: string }>;
}> = [
  {
    id: 'opportunities',
    label: '01 · Comercial',
    title: 'CRM & Pipeline B2B',
    metric: '$ 582.000',
    detail: 'pipeline ponderado · 18 ganados este mes',
    status: '38,5% win rate',
    statusTone: 'good',
    icon: BriefcaseBusiness,
  },
  {
    id: 'whatsapp',
    label: '02 · Conversaciones',
    title: 'WhatsApp & Omnicanal',
    metric: '96%',
    detail: 'lectura promedio en campañas outbound',
    status: '18 chats activos',
    statusTone: 'info',
    icon: MessageSquare,
  },
  {
    id: 'aiAssistant',
    label: '03 · Inteligencia',
    title: 'Copilot & Agent OS',
    metric: '14 agentes',
    detail: 'insights, SDR, GTM y copy disponibles',
    status: '3 insights nuevos',
    statusTone: 'good',
    icon: Sparkles,
  },
  {
    id: 'erp',
    label: '04 · Finanzas',
    title: 'ERP & Facturación',
    metric: '$ 124.800',
    detail: 'cobrado este mes con Mercado Pago',
    status: 'AFIP CAE conectado',
    statusTone: 'good',
    icon: Receipt,
  },
  {
    id: 'workflows',
    label: '05 · Automatización',
    title: 'Engine & Studio',
    metric: '24 activos',
    detail: 'workflows, custom objects y webhooks',
    status: '98,7% ejecuciones OK',
    statusTone: 'good',
    icon: Workflow,
  },
  {
    id: 'seoSuite',
    label: '06 · Marketing',
    title: 'SEO, Web & Widgets',
    metric: '68 keywords',
    detail: 'rank tracking y activos embebibles',
    status: '4 widgets publicados',
    statusTone: 'info',
    icon: Globe,
  },
];

const suiteModules: Array<{ label: string; tab: ActiveTab }> = [
  { label: 'Pipeline Kanban', tab: 'opportunities' },
  { label: 'WhatsApp Multiagente', tab: 'whatsapp' },
  { label: 'Chatbot IA 24/7', tab: 'chatbot' },
  { label: 'ERP & AFIP', tab: 'erp' },
  { label: 'Mercado Pago', tab: 'payments' },
  { label: 'Maps IA', tab: 'mapsProspecting' },
  { label: 'Custom Objects', tab: 'customObjects' },
  { label: 'Workflows', tab: 'workflows' },
  { label: 'SEO & Rank Tracker', tab: 'seoSuite' },
  { label: 'Portal B2B', tab: 'clientPortal' },
  { label: 'KDS Gastronomía', tab: 'restaurant' },
  { label: 'E-commerce Orders', tab: 'ecommerce' },
  { label: 'CSV Studio', tab: 'csvStudio' },
  { label: 'Gemini Copilot', tab: 'aiAssistant' },
  { label: 'Broadcast', tab: 'campaigns' },
  { label: 'Analytics & BI', tab: 'analytics' },
  { label: 'ERP Inventario & Gastos', tab: 'erpAvanzado' },
  { label: 'VS CRM Suite', tab: 'vscrmSuite' },
  { label: 'WordPress & Woo', tab: 'wordpressIntegracion' },
  { label: 'Google Workspace', tab: 'workspaceIntegrations' },
  { label: 'Consola Admin', tab: 'adminConsole' },
  { label: 'Doc 18 Módulos', tab: 'dashboardDocs' },
];

export const DashboardOperationsStrip: React.FC<DashboardOperationsStripProps> = ({ onNavigate }) => (
  <section className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs transition-all">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            Centro Operativo · 6 Áreas Conectadas
          </span>
        </div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          La operación completa en una sola vista
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Priorizá la próxima acción desde el estado comercial, conversacional, financiero y de automatización.
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 self-start sm:self-center shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span>Workspace en línea</span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-5">
      {operationalAreas.map((area) => {
        const AreaIcon = area.icon;
        const toneStyles =
          area.statusTone === 'good'
            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40'
            : area.statusTone === 'warning'
            ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/40'
            : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/40';

        return (
          <button
            key={area.id}
            type="button"
            className="flex flex-col text-left p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all group cursor-pointer"
            onClick={() => onNavigate(area.id)}
          >
            <div className="flex items-center justify-between gap-2 mb-2 w-full">
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {area.label}
              </span>
              <span className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <AreaIcon size={13} />
              </span>
            </div>
            <strong className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-0.5">
              {area.title}
            </strong>
            <span className="text-base font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
              {area.metric}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
              {area.detail}
            </span>
            <div className="mt-auto pt-2 border-t border-slate-200/40 dark:border-slate-800/60 flex items-center justify-between w-full">
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded border ${toneStyles}`}>
                <CheckCircle2 size={10} />
                {area.status}
              </span>
              <ArrowUpRight size={12} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </button>
        );
      })}
    </div>

    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/70">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center">
            <Bot size={12} />
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-white">Power Suite Integral</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">· 16 módulos unificados</span>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Clock3 size={11} /> Acceso rápido directo
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {suiteModules.map((module) => (
          <button
            key={module.label}
            type="button"
            onClick={() => onNavigate(module.tab)}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600/50 hover:bg-blue-50/40 dark:hover:bg-slate-700/50 transition-all cursor-pointer shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {module.label}
          </button>
        ))}
      </div>
    </div>
  </section>
);