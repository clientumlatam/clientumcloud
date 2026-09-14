import React from 'react';
import {
  LayoutGrid,
  List,
  Search,
  X,
  Download,
  Briefcase,
  Building2,
  Users2,
  CheckSquare,
  MessageSquare,
  Receipt,
  MapPin,
  BarChart3,
  Bot,
  Settings,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { ActiveTab, StageId } from '../../types';
import { STAGES } from '../../data/initialData';

interface NavModuleTab {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

const CRM_MODULE_TABS: NavModuleTab[] = [
  { id: 'dashboard', label: 'Resumen', icon: Layers },
  { id: 'opportunities', label: 'Negocios', icon: Briefcase },
  { id: 'companies', label: 'Empresas', icon: Building2 },
  { id: 'people', label: 'Contactos', icon: Users2 },
  { id: 'tasks', label: 'Tareas & Agenda', icon: CheckSquare },
  { id: 'whatsapp', label: 'WhatsApp Omnicanal', icon: MessageSquare, badge: 'IA', badgeColor: 'bg-emerald-500 text-white' },
  { id: 'erp', label: 'ERP AFIP CAE', icon: Receipt },
  { id: 'mapsProspecting', label: 'Prospección Maps', icon: MapPin },
  { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3, badge: 'BI', badgeColor: 'bg-blue-600 text-white font-bold' },
  { id: 'agenteOS', label: 'Agentes IA', icon: Bot, badge: '14', badgeColor: 'bg-blue-600 text-white' },
  { id: 'settings', label: 'Ajustes', icon: Settings },
];

export const CrmTopNavBar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    filterState,
    setFilterState,
    resetFilters,
    exportOpportunitiesCSV,
    opportunities,
    companies,
    people,
    tasks,
    t,
  } = useCRM();

  const getModuleMeta = () => {
    switch (activeTab) {
      case 'dashboard':
        return { name: 'Resumen Ejecutivo', count: undefined };
      case 'opportunities':
        return { name: 'Negocios & Pipeline', count: opportunities.length };
      case 'companies':
        return { name: 'Empresas & Cuentas', count: companies.length };
      case 'people':
        return { name: 'Directorio de Contactos', count: people.length };
      case 'tasks':
        return { name: 'Tareas & Seguimiento', count: tasks.length };
      case 'whatsapp':
        return { name: 'WhatsApp Multiagente IA', count: 12 };
      case 'erp':
        return { name: 'ERP & Facturación AFIP', count: undefined };
      case 'mapsProspecting':
        return { name: 'Prospección Maps B2B', count: undefined };
      case 'analytics':
        return { name: 'Business Intelligence', count: undefined };
      case 'agenteOS':
        return { name: 'Agent OS (14 Agentes)', count: 14 };
      case 'settings':
        return { name: 'Configuración del Espacio', count: undefined };
      default:
        return { name: 'Clientum CRM', count: undefined };
    }
  };

  const meta = getModuleMeta();
  const hasActiveFilters =
    Boolean(filterState.search) ||
    filterState.stage !== 'all' ||
    filterState.owner !== 'all' ||
    filterState.priority !== 'all';

  return (
    <div
      id="crm-top-nav-bar"
      className="crm-top-nav-bar bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 shrink-0 z-10 select-none shadow-2xs"
    >
      {/* Module Horizontal Tab Bar */}
      <nav
        aria-label="Módulos del CRM"
        className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth py-0.5 max-w-full"
      >
        {CRM_MODULE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id || (tab.id === 'mapsProspecting' && activeTab === 'googleMaps');

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${tab.badgeColor || 'bg-blue-100 text-blue-800'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Module Level Context Controls (Search filter, Stage filter, View switcher) */}
      <div className="flex items-center gap-2 ml-auto shrink-0">
        
        {/* Module Title & Badge */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200 pr-2 border-r border-slate-200 dark:border-slate-700">
          <span>{meta.name}</span>
          {meta.count !== undefined && (
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono font-bold">
              {meta.count}
            </span>
          )}
        </div>

        {/* Search Input for Active Module */}
        <div className="relative max-w-xs w-36 sm:w-48">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Filtrar..."
            value={filterState.search}
            onChange={(e) => setFilterState((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 pl-8 pr-7 py-1 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 transition-all shadow-2xs"
          />
          {filterState.search && (
            <button
              onClick={() => setFilterState((prev) => ({ ...prev, search: '' }))}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Stage Filter for Opportunities */}
        {activeTab === 'opportunities' && (
          <select
            value={filterState.stage || 'all'}
            onChange={(e) => setFilterState((prev) => ({ ...prev, stage: e.target.value as StageId | 'all' }))}
            className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs font-medium"
          >
            <option value="all">Todas las etapas</option>
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {t(`stage_${s.id}` as any) || s.name}
              </option>
            ))}
          </select>
        )}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline shrink-0 font-semibold cursor-pointer"
          >
            Limpiar
          </button>
        )}

        {/* View Mode Switcher (Kanban vs Table) */}
        {activeTab === 'opportunities' && (
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1 rounded text-xs transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Vista Tablero"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[10px]">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded text-xs transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Vista Tabla"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[10px]">Tabla</span>
            </button>
          </div>
        )}

        {/* Export CSV Button */}
        {activeTab === 'opportunities' && (
          <button
            onClick={exportOpportunitiesCSV}
            className="p-1 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs transition-all cursor-pointer shadow-2xs"
            title="Exportar CSV de Negocios"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        )}

      </div>
    </div>
  );
};
