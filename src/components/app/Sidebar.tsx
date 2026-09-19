import React, { useState, useMemo, useCallback } from 'react';
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
  BookOpen,
  ShieldAlert,
  Layers,
  HardDrive,
  ArrowLeftRight,
  GitBranch,
  Cloud,
  Mic,
  Code2,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useTheme } from '../../context/ThemeContext';
import { ActiveTab } from '../../types';
import { ClientumLogo } from '../common/ClientumLogo';
import { ClientumNavyIcon } from '../common/ClientumNavyIcons';
import { ModuleCredentialsModal } from '../settings/ModuleCredentialsModal';
import { UserProfileModal } from '../auth/UserProfileModal';
import { SidebarItem } from './SidebarItem';

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
  id: 'main' | 'control' | 'sales' | 'prospecting' | 'communication' | 'ai' | 'operations' | 'system' | 'admin';
  label: string;
  categoryIcon: 'sales' | 'communication' | 'ai' | 'erp' | 'admin' | null;
  items: SidebarNavItem[];
}

export const Sidebar: React.FC = React.memo(() => {
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
    currentUser,
  } = useCRM();

  const { resolvedTheme, toggleTheme } = useTheme();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    opportunities: true,
    people: true,
    tasks: true,
    whatsapp: true,
    agenteOS: true,
    operations: true,
    customObjects: true,
  });

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    '5. Infraestructura & Sistema': false,
  });

  const [activeConfigModule, setActiveConfigModule] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const userDisplayName = useMemo(() => {
    if (currentUser?.name && currentUser.name.trim()) {
      return currentUser.name.trim();
    }
    if (currentUser?.email) {
      const handle = currentUser.email.split('@')[0];
      return handle
        .split(/[._-]/)
        .filter(Boolean)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(' ');
    }
    return 'Usuario Clientum';
  }, [currentUser?.name, currentUser?.email]);

  const userInitials = useMemo(() => {
    if (currentUser?.name && currentUser.name.trim()) {
      const parts = currentUser.name.trim().split(/\s+/).filter(Boolean);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (currentUser?.email) {
      const handle = currentUser.email.split('@')[0];
      const parts = handle.split(/[._-]/).filter(Boolean);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return handle.slice(0, 2).toUpperCase();
    }
    return 'CL';
  }, [currentUser?.name, currentUser?.email]);

  const toggleSubmenu = useCallback((itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  }, []);

  const navSections: NavSection[] = [
    {
      id: 'main',
      label: '1. Dirección Comercial & CRM',
      categoryIcon: null,
      items: [
        { id: 'dashboard', label: 'Dashboard Directivo', icon: Home, badge: 'Live', badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono' },
        {
          id: 'opportunities',
          label: 'Embudo de Ventas [Pipeline]',
          icon: Briefcase,
          badge: 'Kanban',
          badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
          subItems: [
            { id: 'meddic', label: 'Matriz MEDDIC & Scoring', icon: Target },
            { id: 'analytics', label: 'Análisis de Desvíos CRM', icon: BarChart3 },
          ],
        },
        {
          id: 'people',
          label: 'Directorio B2B & Leads',
          icon: Users2,
          subItems: [
            { id: 'companies', label: 'Cuentas Clave Enterprise', icon: Building2 },
            { id: 'activityInbox', label: 'Historial de Interacciones', icon: Inbox },
          ],
        },
        {
          id: 'tasks',
          label: 'Agenda & Tareas Comerciales',
          icon: CheckSquare,
          subItems: [
            { id: 'calendar', label: 'Calendario de Reuniones', icon: Calendar },
            { id: 'workflows', label: 'Recordatorios Automatizados', icon: Workflow },
          ],
        },
        {
          id: 'propuestas',
          label: 'Generador de Propuestas [PDF]',
          icon: FileSpreadsheet,
          badge: 'Pro',
          badgeColor: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-mono',
        },
      ],
    },
    {
      id: 'communication',
      label: '2. Comunicación Omnicanal',
      categoryIcon: 'communication',
      items: [
        {
          id: 'whatsapp',
          label: 'WhatsApp WACE Hub [IA]',
          icon: MessageSquare,
          badge: 'En Línea',
          badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono',
          subItems: [
            { id: 'messages', label: 'Bandeja de Entrada Unificada', icon: Send },
            { id: 'campaigns', label: 'Campañas de Difusión', icon: Send },
            { id: 'chatbot', label: 'Reglas de Auto-Respuesta IA', icon: Bot },
          ],
        },
        {
          id: 'webmail',
          label: 'Correo Corporativo [Webmail]',
          icon: Mail,
          badge: 'Cloudflare',
          badgeColor: 'bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono',
        },
      ],
    },
    {
      id: 'ai',
      label: '3. Inteligencia Artificial & Agentes',
      categoryIcon: 'ai',
      items: [
        {
          id: 'agenteOS',
          label: 'AgenteOS [14 Roles IA]',
          icon: Cpu,
          badge: 'Autónomo',
          badgeColor: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
          subItems: [
            { id: 'sdrOutreach', label: 'Agente SDR Prospección 24/7', icon: Bot },
            { id: 'aiAssistant', label: 'Capital Gemini Forecasting', icon: Sparkles },
          ],
        },
      ],
    },
    {
      id: 'operations',
      label: '4. Operaciones, ERP & Facturación',
      categoryIcon: 'erp',
      items: [
        {
          id: 'operations',
          label: 'ERP & Logística Avanzada',
          icon: Compass,
          badge: 'Módulo 414',
          badgeColor: 'bg-slate-800 text-[var(--text-secondary,#475569)] dark:text-slate-300 border border-[var(--border-subtle,#e2e8f0)] dark:border-slate-700/80',
          subItems: [
            { id: 'erp', label: 'Control de Stock & Delivery', icon: Receipt },
            { id: 'campusLMS', label: 'Campus LMS & Academia', icon: GraduationCap },
          ],
        },
        {
          id: 'erpAvanzado',
          label: 'Facturación Electrónica [AFIP]',
          icon: Receipt,
          badge: 'CAE Nativo',
          badgeColor: 'bg-slate-800 text-[var(--text-secondary,#475569)] dark:text-slate-300 border border-[var(--border-subtle,#e2e8f0)] dark:border-slate-700/80',
        },
      ],
    },
    {
      id: 'control',
      label: '5. Infraestructura & Sistema',
      categoryIcon: 'admin',
      items: [
        {
          id: 'customObjects',
          label: 'Motor de Datos [Schema SQL]',
          icon: Database,
          badge: 'Módulo 49',
          badgeColor: 'bg-slate-800 text-[var(--text-secondary,#475569)] dark:text-slate-300 border border-[var(--border-subtle,#e2e8f0)] dark:border-slate-700/80',
          subItems: [
            { id: 'csvStudio', label: 'Importador CSV Studio', icon: FileSpreadsheet },
          ],
        },
        {
          id: 'workspaceIntegrations',
          label: 'Sincronización Cloud & Backups',
          icon: HardDrive,
          badge: 'Módulo 48',
          badgeColor: 'bg-slate-800 text-[var(--text-secondary,#475569)] dark:text-slate-300 border border-[var(--border-subtle,#e2e8f0)] dark:border-slate-700/80',
        },
      ],
    },
  ];

  const filteredNavSections = useMemo(() => {
    if (!searchTerm.trim()) return navSections;
    const term = searchTerm.toLowerCase();
    return navSections.map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.label.toLowerCase().includes(term) || 
        (item.subItems && item.subItems.some(sub => sub.label.toLowerCase().includes(term)))
      )
    })).filter(section => section.items.length > 0);
  }, [searchTerm, navSections]);

  const handleNavClick = useCallback((tabId: ActiveTab) => {
    setActiveTab(tabId);
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(false);
    }
  }, [setActiveTab, setIsMobileSidebarOpen]);

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
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r transition-all duration-200 ease-in-out lg:static lg:translate-x-0 ${ isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0' } ${isCollapsed ? 'w-20' : 'w-72'} bg-[var(--sidebar-bg)] border-[var(--sidebar-border)] text-[var(--sidebar-text-primary)]`}
      >
        {/* Collapse Toggle Button (Floating on Edge) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-20 hidden lg:flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] shadow-md hover:bg-blue-600 hover:text-[var(--text-primary,#0f172a)] dark:hover:text-white transition-colors z-30 cursor-pointer"
          title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <ChevronRight className={`h-3 w-3 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>

        {/* Encabezado del Sistema */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-4 border-[var(--border-subtle)]">
          <button
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-1 overflow-hidden group cursor-pointer"
            aria-label="Ir al Resumen Ejecutivo"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
              <Boxes className="w-5 h-5 text-[var(--text-primary,#0f172a)] dark:text-white" />
            </div>
            {!isCollapsed && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="block font-bold leading-tight tracking-tight text-[var(--text-primary)] whitespace-nowrap text-sm">
                  ClientumOS
                </span>
                <span className="block text-[10px] font-medium text-[var(--text-muted)] whitespace-nowrap">
                  Enterprise Suite v4.2
                </span>
              </div>
            )}
          </button>

          {!isCollapsed && (
            <button
              onClick={() => openNewRecordModal('opportunity')}
              aria-label="Creación Rápida"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-400 shrink-0 shadow-sm"
              title="Creación Rápida"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Acceso a Buscador y Portal Público */}
        <div className="space-y-1.5 border-b p-3 border-[var(--border-subtle)]/80 dark:border-[#1c2d47]">
          <div className="relative group">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 transition-colors ${searchTerm ? 'text-blue-500' : 'text-[var(--text-muted,#64748b)] dark:text-slate-400 dark:text-[var(--text-muted,#64748b)] dark:text-slate-500 group-focus-within:text-blue-500'}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isCollapsed ? "" : "Buscar en ClientumOS..."}
              className={`w-full bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-[var(--border-subtle,#e2e8f0)] dark:border-slate-700/60 rounded-lg text-xs py-2 focus:outline-hidden focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${isCollapsed ? 'px-0 text-center w-10 mx-auto' : 'pl-9 pr-3'}`}
            />
          </div>

          {!isCollapsed && (
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
          )}
        </div>

        {/* Lista Jerárquica de Secciones */}
        <div className="flex-1 space-y-4 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-[#1c2d47]">
          {filteredNavSections.map((section) => {
            const isSectionCollapsed = collapsedSections[section.label];
            return (
              <div key={section.id} className="space-y-1">
                {!isCollapsed && (
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-2 py-1 text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--text-secondary)] dark:text-[var(--text-secondary,#475569)] dark:text-slate-300 dark:hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    onClick={() =>
                      setCollapsedSections((prev) => ({
                        ...prev,
                        [section.label]: !isSectionCollapsed,
                      }))
                    }
                    aria-expanded={!isSectionCollapsed}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${ section.id === 'main' ? 'bg-blue-500' : section.id === 'communication' ? 'bg-emerald-500' : section.id === 'ai' ? 'bg-indigo-500' : section.id === 'operations' ? 'bg-amber-500' : 'bg-purple-500' }`} />
                      <span>{section.label}</span>
                    </span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${isSectionCollapsed ? '-rotate-90' : ''}`}
                    />
                  </button>
                )}

                {isCollapsed && section.categoryIcon && (
                  <div className="flex justify-center py-2 border-b border-slate-100 dark:border-[var(--border-subtle,#e2e8f0)] dark:border-slate-800/40 mb-2">
                    <ClientumNavyIcon
                      category={section.categoryIcon}
                      size={18}
                      className="shrink-0 rounded shadow-sm opacity-60"
                    />
                  </div>
                )}

                {(!isSectionCollapsed || isCollapsed) && (
                  <nav className="space-y-0.5" aria-label={`Submenú ${section.label}`}>
                    {section.items.map((item) => (
                      <SidebarItem
                        key={item.id}
                        item={item}
                        isActive={activeTab === item.id}
                        isExpanded={Boolean(expandedMenus[item.id])}
                        isCollapsed={isCollapsed}
                        activeTab={activeTab}
                        onNavClick={handleNavClick}
                        onToggleSubmenu={toggleSubmenu}
                      />
                    ))}
                  </nav>
                )}
              </div>
            );
          })}
        </div>

        {/* Perfil & Controles de Usuario */}
        <div className={`flex flex-col border-t border-[var(--border-subtle)]/80 dark:border-[#1c2d47] bg-slate-50 dark:bg-slate-900/10 ${isCollapsed ? 'items-center py-4 px-2' : 'p-3'}`}>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className={`flex items-center gap-2 truncate text-left group hover:opacity-90 transition-all cursor-pointer ${isCollapsed ? 'justify-center w-full' : 'w-full mb-3'}`}
            title={`Perfil: ${userDisplayName}`}
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={userDisplayName}
                className="h-8 w-8 shrink-0 rounded-full object-cover border border-[var(--border-default)] dark:border-[var(--border-subtle,#e2e8f0)] dark:border-slate-700 shadow-xs"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const sibling = e.currentTarget.nextElementSibling;
                  if (sibling) (sibling as HTMLElement).style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className={`h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xs shadow-xs ${ currentUser?.avatar ? 'hidden' : 'flex' }`}
            >
              {userInitials}
            </div>
            {!isCollapsed && (
              <div className="truncate min-w-0">
                <span className="block truncate text-xs font-bold text-[var(--text-primary)] dark:text-white group-hover:text-blue-500 transition-colors">
                  {userDisplayName}
                </span>
                <span className="block truncate text-[10px] text-[var(--text-muted,#64748b)] dark:text-slate-400">
                  {currentUser?.role || 'Admin'}
                </span>
              </div>
            )}
          </button>

          <div className={`flex items-center gap-1 shrink-0 ${isCollapsed ? 'flex-col mt-4 w-full' : 'justify-between w-full'}`}>
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] dark:text-[var(--text-muted,#64748b)] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-[var(--text-primary,#0f172a)] dark:hover:text-slate-100 transition-colors cursor-pointer"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] dark:text-[var(--text-muted,#64748b)] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-[var(--text-primary,#0f172a)] dark:hover:text-slate-100 transition-colors cursor-pointer"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => logout()}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Modal de Perfil de Usuario */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Modal de Credenciales si se solicita */}
      {activeConfigModule && (
        <ModuleCredentialsModal
          moduleId={activeConfigModule}
          onClose={() => setActiveConfigModule(null)}
        />
      )}
    </>
  );
});
