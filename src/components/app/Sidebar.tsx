import React, { useState } from 'react';
import {
  Home,
  Calendar,
  Briefcase,
  Building2,
  Users2,
  CheckSquare,
  BarChart3,
  Settings,
  Sparkles,
  Search,
  Plus,
  Compass,
  ChevronDown,
  ChevronRight,
  Database,
  MessageSquare,
  Receipt,
  CreditCard,
  Target,
  Bot,
  Cpu,
  MapPin,
  Send,
  Workflow,
  FileSpreadsheet,
  FileCheck,
  GraduationCap,
  Store,
  LogOut,
  ExternalLink,
  Globe,
  Mail,
  Inbox,
  FolderKanban,
  Boxes,
  Sun,
  Moon,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useTheme } from '../../context/ThemeContext';
import { ActiveTab } from '../../types';
import { ClientumLogo } from '../common/ClientumLogo';
import { ClientumNavyIcon } from '../common/ClientumNavyIcons';
import { ModuleCredentialsModal } from '../settings/ModuleCredentialsModal';

interface SidebarNavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  configurable?: boolean;
  subItems?: SidebarNavItem[];
  defaultExpanded?: boolean;
}

interface NavSection {
  id: 'control' | 'sales' | 'communication' | 'ai' | 'operations' | 'system';
  label: string;
  categoryIcon: 'sales' | 'communication' | 'ai' | 'erp' | 'admin' | null;
  items: SidebarNavItem[];
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsCommandPaletteOpen,
    openNewRecordModal,
    openAICopilot,
    opportunities,
    setSelectedRecord,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    exitToPublicSite,
    logout,
  } = useCRM();

  const { resolvedTheme, toggleTheme } = useTheme();

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    opportunities: true,
    agenteOS: true,
  });

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    'Administración & Sistema': false,
  });

  const [activeConfigModule, setActiveConfigModule] = useState<string | null>(null);

  const toggleSubmenu = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const navSections: NavSection[] = [
    {
      id: 'control',
      label: 'Inicio & Control',
      categoryIcon: null,
      items: [
        { id: 'dashboard', label: 'Resumen Ejecutivo', icon: Home },
        { id: 'ecosystemHub', label: 'Unified Control Hub', icon: Boxes, badge: '15 Apps', badgeColor: 'bg-blue-600 text-white font-bold' },
        { id: 'analytics', label: 'Reportes & BI', icon: BarChart3 },
      ],
    },
    {
      id: 'sales',
      label: 'Ventas & Clientes',
      categoryIcon: 'sales',
      items: [
        {
          id: 'opportunities',
          label: 'Pipeline de Negocios',
          icon: Briefcase,
          badge: 'Kanban',
          subItems: [
            { id: 'opportunities', label: 'Lead Scoring MEDDIC', icon: Target },
          ],
        },
        {
          id: 'people',
          label: 'Contactos & Empresas',
          icon: Users2,
          subItems: [
            { id: 'companies', label: 'Empresas', icon: Building2 },
          ],
        },
        {
          id: 'tasks',
          label: 'Actividades & Agenda',
          icon: CheckSquare,
          subItems: [
            { id: 'calendar', label: 'Calendario', icon: Calendar },
            { id: 'activityInbox', label: 'Notas y llamadas', icon: Inbox },
          ],
        },
        { id: 'propuestas', label: 'Propuestas & Presupuestos', icon: FileCheck },
        { id: 'googleMaps', label: 'Prospección Google Maps', icon: MapPin },
      ],
    },
    {
      id: 'communication',
      label: 'Centro de Comunicación',
      categoryIcon: 'communication',
      items: [
        {
          id: 'whatsapp',
          label: 'Bandeja Omnicanal WhatsApp',
          icon: MessageSquare,
          badge: 'LIVE',
          badgeColor: 'bg-emerald-500 text-white font-bold',
          subItems: [
            { id: 'messages', label: 'Mensajes directos', icon: Send },
            { id: 'webmail', label: 'Webmail Cloudflare', icon: Mail },
          ],
        },
        { id: 'chatbot', label: 'Bots & Atención Automática', icon: Bot },
        { id: 'campaigns', label: 'Campañas Masivas WhatsApp', icon: Send },
      ],
    },
    {
      id: 'ai',
      label: 'IA & Agentes Autónomos',
      categoryIcon: 'ai',
      items: [
        {
          id: 'agenteOS',
          label: 'AgenteOS (14 Roles)',
          icon: Cpu,
          badge: '14 IA',
          badgeColor: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold',
          subItems: [
            { id: 'aiAssistant', label: 'Copilot Gemini 3.8', icon: Sparkles },
            { id: 'sdrOutreach' as ActiveTab, label: 'Agente SDR Prospección', icon: Bot },
          ],
        },
        { id: 'workflows', label: 'Automatizaciones & Flujos DAG', icon: Workflow },
        { id: 'gtmStrategy', label: 'Estrategias GTM & Copy', icon: Compass },
      ],
    },
    {
      id: 'operations',
      label: 'ERP & Operaciones PyME',
      categoryIcon: 'erp',
      items: [
        {
          id: 'erp',
          label: 'Facturación AFIP & CAE',
          icon: Receipt,
          subItems: [
            { id: 'operations', label: 'Operaciones internas', icon: FolderKanban },
          ],
        },
        { id: 'payments', label: 'Cobros Mercado Pago & Planes', icon: CreditCard },
        { id: 'tiendaDigital', label: 'Tienda Digital WhatsApp', icon: Store },
        { id: 'campusLMS', label: 'Campus Academia LMS', icon: GraduationCap },
      ],
    },
    {
      id: 'system',
      label: 'Administración & Sistema',
      categoryIcon: 'admin',
      items: [
        {
          id: 'customObjects',
          label: 'Estructura de Datos',
          icon: Database,
          subItems: [
            { id: 'csvStudio', label: 'Importar / Exportar CSV', icon: FileSpreadsheet },
          ],
        },
        { id: 'domainManager', label: 'Gestor de Dominios & DNS', icon: Globe },
        { id: 'settings', label: 'Ajustes de Empresa & AFIP', icon: Settings },
      ],
    },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop para mobile con accesibilidad */}
      {isMobileSidebarOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Cerrar barra lateral de navegación"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') setIsMobileSidebarOpen(false);
          }}
        />
      )}

      <aside
        id="clientum-unified-sidebar"
        role="navigation"
        aria-label="Menú principal de navegación"
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          resolvedTheme === 'dark'
            ? 'border-slate-800/90 bg-[#0B0F17] text-slate-200'
            : 'border-slate-200/90 bg-white text-slate-800'
        }`}
      >
        {/* Encabezado del Sistema */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-4 border-slate-200/80 dark:border-slate-800/80">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-1"
            aria-label="Ir al Resumen Ejecutivo"
          >
            <ClientumLogo className="h-8 w-auto" />
            <div>
              <span className="block font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                ClientumOS
              </span>
              <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                Sistema Operativo PyME
              </span>
            </div>
          </button>

          <button
            onClick={() => openNewRecordModal('opportunity')}
            aria-label="Crear nuevo registro"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs hover:bg-blue-700 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-400"
            title="Nuevo Registro (+)"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Acceso a Buscador y Portal Público */}
        <div className="space-y-1.5 border-b p-3 border-slate-200/80 dark:border-slate-800/80">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
              resolvedTheme === 'dark'
                ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span>Buscar en todo el CRM...</span>
            </span>
            <kbd className="rounded bg-slate-200/60 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={exitToPublicSite}
            className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" />
              <span>Ver Portal Público</span>
            </span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>

        {/* Lista Jerárquica de Secciones */}
        <div className="flex-1 space-y-4 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {navSections.map((section) => {
            const isCollapsed = collapsedSections[section.label];
            return (
              <div key={section.id} className="space-y-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-2 py-1 text-[11px] font-bold tracking-wider uppercase text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  onClick={() =>
                    setCollapsedSections((prev) => ({
                      ...prev,
                      [section.label]: !isCollapsed,
                    }))
                  }
                  aria-expanded={!isCollapsed}
                >
                  <span className="flex items-center gap-1.5">
                    {section.categoryIcon && (
                      <ClientumNavyIcon
                        category={section.categoryIcon}
                        size={14}
                        className="shrink-0 rounded shadow-xs"
                      />
                    )}
                    <span>{section.label}</span>
                  </span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${isCollapsed ? '-rotate-90' : ''}`}
                  />
                </button>

                {!isCollapsed && (
                  <nav className="space-y-0.5" aria-label={`Submenú ${section.label}`}>
                    {section.items.map((item) => {
                      const active = activeTab === item.id;
                      const hasSub = item.subItems && item.subItems.length > 0;
                      const isExpanded = expandedMenus[item.id];
                      const IconComponent = item.icon;

                      return (
                        <div key={item.id} className="space-y-0.5">
                          <div className="group relative flex items-center">
                            <button
                              onClick={() => handleNavClick(item.id)}
                              aria-current={active ? 'page' : undefined}
                              className={`flex flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                active
                                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70'
                              }`}
                            >
                              <IconComponent
                                className={`h-4 w-4 shrink-0 ${
                                  active
                                    ? 'text-white'
                                    : 'text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100'
                                }`}
                              />
                              <span className="truncate">{item.label}</span>

                              {item.badge && (
                                <span
                                  className={`ml-auto rounded px-1.5 py-0.2 text-[10px] font-bold ${
                                    item.badgeColor ||
                                    (active
                                      ? 'bg-white/20 text-white'
                                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300')
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </button>

                            {hasSub && (
                              <button
                                onClick={(e) => toggleSubmenu(item.id, e)}
                                aria-label={`Expandir subopciones de ${item.label}`}
                                className={`flex h-8 w-6 items-center justify-center rounded-r-lg transition-colors ${
                                  active
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                              >
                                <ChevronRight
                                  className={`h-3.5 w-3.5 transition-transform ${
                                    isExpanded ? 'rotate-90' : ''
                                  }`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Subitems anidados */}
                          {hasSub && isExpanded && (
                            <div className="ml-5 space-y-0.5 border-l-2 pl-2 border-slate-200 dark:border-slate-800">
                              {item.subItems!.map((sub) => {
                                const subActive = activeTab === sub.id;
                                const SubIcon = sub.icon;
                                return (
                                  <button
                                    key={sub.id}
                                    onClick={() => handleNavClick(sub.id)}
                                    aria-current={subActive ? 'page' : undefined}
                                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                      subActive
                                        ? 'bg-blue-100 text-blue-900 font-bold dark:bg-blue-950/60 dark:text-blue-300'
                                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50'
                                    }`}
                                  >
                                    <SubIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                    <span className="truncate">{sub.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                )}
              </div>
            );
          })}
        </div>

        {/* Acceso Rápido al Copilot Gemini */}
        <div className="border-t p-3 border-slate-200/80 dark:border-slate-800/80">
          <div className="rounded-xl border border-blue-200/80 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-2.5 dark:border-blue-900/50 dark:from-blue-950/30 dark:to-indigo-950/20">
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5 text-xs font-bold text-blue-950 dark:text-blue-200">
                <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Copilot Gemini 3.8
              </span>
              <span className="rounded bg-blue-600 px-1.5 py-0.2 text-[9px] font-black text-white">
                IA
              </span>
            </div>
            <p className="text-[11px] leading-snug text-slate-600 dark:text-slate-400 mb-2">
              Optimiza el pipeline comercial y prioriza tratos de alto valor.
            </p>
            <button
              onClick={() => openAICopilot()}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Consultar Copilot
            </button>
          </div>
        </div>

        {/* Cuentas Clave */}
        {opportunities.length > 0 && (
          <div className="border-t px-3 py-2 border-slate-200/80 dark:border-slate-800/80">
            <span className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">
              Cuentas Clave
            </span>
            <div className="space-y-1">
              {opportunities.slice(0, 3).map((opp) => (
                <button
                  key={opp.id}
                  onClick={() => setSelectedRecord({ type: 'opportunity', id: opp.id })}
                  className="flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
                >
                  <span className="truncate">{opp.name || opp.title}</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    ${opp.amount.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Perfil & Controles de Usuario */}
        <div className="flex items-center justify-between border-t p-3 border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 truncate">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xs">
              FG
            </div>
            <div className="truncate">
              <span className="block truncate text-xs font-bold text-slate-900 dark:text-white">
                Fernando G.
              </span>
              <span className="block text-[10px] text-slate-400">Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label={`Cambiar a modo ${resolvedTheme === 'dark' ? 'claro' : 'oscuro'}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              aria-label="Abrir ajustes"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => logout()}
              aria-label="Cerrar sesión"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Modal de Credenciales si se solicita */}
      {activeConfigModule && (
        <ModuleCredentialsModal
          moduleId={activeConfigModule}
          onClose={() => setActiveConfigModule(null)}
        />
      )}
    </>
  );
};
