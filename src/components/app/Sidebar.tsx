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

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    opportunities: true,
    people: true,
    tasks: true,
    whatsapp: true,
    ecosystemHub: true,
    sites: true,
    agenteOS: true,
    operations: true,
    erpAvanzado: true,
    customObjects: true,
  });

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    'Administración & Sistema': false,
  });

  const [activeConfigModule, setActiveConfigModule] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [sidebarMenuMode, setSidebarMenuMode] = useState<'operativo' | 'plataforma'>('operativo');

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

  // MENÚ 1: OPERATIVO & COMERCIAL
  const operativoNavSections: NavSection[] = [
    {
      id: 'main',
      label: '1. Gestión Comercial & CRM',
      categoryIcon: null,
      items: [
        { id: 'dashboard', label: 'Resumen Ejecutivo', icon: Home },
        {
          id: 'opportunities',
          label: 'Pipeline de Ventas (Deals)',
          icon: Briefcase,
          badge: 'Ventas',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
          subItems: [
            { id: 'meddic', label: 'Lead Scoring MEDDIC', icon: Target },
            { id: 'competitorHub', label: 'Comparativa de Plataformas', icon: ArrowLeftRight },
          ],
        },
        {
          id: 'people',
          label: 'Base de Clientes (B2B)',
          icon: Users2,
          subItems: [
            { id: 'companies', label: 'Empresas Corporativas', icon: Building2 },
          ],
        },
        {
          id: 'tasks',
          label: 'Agenda & Actividades',
          icon: CheckSquare,
          subItems: [
            { id: 'calendar', label: 'Calendario Comercial', icon: Calendar },
            { id: 'activityInbox', label: 'Notas & Recordatorios', icon: Inbox },
          ],
        },
        {
          id: 'propuestas',
          label: 'Propuestas & Brochure PDF',
          icon: FileCheck,
          badge: 'PDF Gen',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
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
          label: 'Canal de WhatsApp WACE',
          icon: MessageSquare,
          badge: 'WACE',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
          subItems: [
            { id: 'messages', label: 'Mensajes Directos', icon: Send },
            { id: 'campaigns', label: 'Campañas Masivas', icon: Send },
            { id: 'chatbot', label: 'Bots & Respuestas IA', icon: Bot },
            { id: 'activityInbox', label: 'Voz a Texto (Voice)', icon: Mic },
          ],
        },
        {
          id: 'webmail',
          label: 'Correo Profesional (Webmail)',
          icon: Mail,
          badge: 'Cloudflare',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
        },
      ],
    },
  ];

  // MENÚ 2: PLATAFORMA & ECOSISTEMA
  const plataformaNavSections: NavSection[] = [
    {
      id: 'main',
      label: '1. Inteligencia & Analíticas',
      categoryIcon: null,
      items: [
        {
          id: 'ecosystemHub',
          label: 'Hub de Ecosistema',
          icon: Boxes,
          badge: 'Ecosistema',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
          subItems: [
            { id: 'dashboardDocs', label: 'Documentación de la Plataforma', icon: BookOpen },
          ],
        },
        {
          id: 'analytics',
          label: 'Clientum Dashboard & BI',
          icon: BarChart3,
          badge: 'Módulo #4',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
        },
      ],
    },
    {
      id: 'prospecting',
      label: '2. Prospección & Canales Web',
      categoryIcon: 'sales',
      items: [
        { id: 'googleMaps', label: 'Radar de Prospectos (Google Maps)', icon: MapPin, badge: 'GPS Radar', badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold' },
        {
          id: 'industryLanding',
          label: 'Sitio Web Público (Captura)',
          icon: Globe,
          badge: 'Módulo #10',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
        },
        {
          id: 'sites',
          label: 'Portal Web & Comercio',
          icon: Store,
          badge: 'Portal',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
          subItems: [
            { id: 'tiendaDigital', label: 'Tienda Digital & Catálogo', icon: Store },
            { id: 'domainManager', label: 'Gestor de Dominios Web', icon: Globe },
          ],
        },
      ],
    },
    {
      id: 'ai',
      label: '3. Automatizaciones & IA',
      categoryIcon: 'ai',
      items: [
        {
          id: 'agenteOS',
          label: 'Agentes IA (AgenteOS)',
          icon: Cpu,
          badge: 'AgenteOS',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
          subItems: [
            { id: 'sdrOutreach', label: 'Agente SDR Prospección', icon: Bot },
            { id: 'aiAssistant', label: 'Copilot Gemini Comercial', icon: Sparkles },
            { id: 'workflows', label: 'Diseñador de Workflows', icon: Workflow },
          ],
        },
      ],
    },
    {
      id: 'operations',
      label: '4. Operaciones & ERP Avanzado',
      categoryIcon: 'erp',
      items: [
        {
          id: 'operations',
          label: 'ERP & Logística',
          icon: Compass,
          badge: 'Módulo #14',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
          subItems: [
            { id: 'restaurant', label: 'Restaurante & Delivery', icon: Store },
            { id: 'campusLMS', label: 'Campus LMS & Academia', icon: GraduationCap },
          ],
        },
        {
          id: 'erpAvanzado',
          label: 'Facturación & ERP Avanzado',
          icon: Receipt,
          badge: 'AFIP CAE',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
          subItems: [
            { id: 'erp', label: 'Inventario & Gastos', icon: Receipt },
            { id: 'ecommerce', label: 'E-Commerce & Pagos', icon: CreditCard },
          ],
        },
      ],
    },
    {
      id: 'control',
      label: '5. Infraestructura & Motor de Datos',
      categoryIcon: 'admin',
      items: [
        {
          id: 'customObjects',
          label: 'Motor de Datos (Schemas)',
          icon: Database,
          badge: 'Módulo #9',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
          subItems: [
            { id: 'csvStudio', label: 'Importador CSV Studio', icon: FileSpreadsheet },
          ],
        },
        {
          id: 'workspaceIntegrations',
          label: 'Sincronización Cloud & Drive',
          icon: HardDrive,
          badge: 'Módulo #8',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
        },
        {
          id: 'vscrmSuite',
          label: 'Arquitectura Cloud Run',
          icon: Layers,
          badge: 'Módulo #2',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
        },
        {
          id: 'payments',
          label: 'Despliegues & Vercel Edge',
          icon: Cloud,
          badge: 'Módulo #3',
          badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700/80 font-mono font-semibold',
        },
        {
          id: 'wordpressIntegracion',
          label: 'WordPress & API Gateway',
          icon: Code2,
        },
      ],
    },
    {
      id: 'system',
      label: '6. Administración & Auditoría',
      categoryIcon: 'admin',
      items: [
        { id: 'settings', label: 'Ajustes del Sistema & Roles', icon: Settings },
        { id: 'adminConsole', label: 'Consola de Auditoría', icon: ShieldAlert },
      ],
    },
  ];

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
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          resolvedTheme === 'dark'
            ? 'border-[#1c2d47] bg-[#060a14] text-slate-100'
            : 'border-[var(--border-subtle)]/90 bg-[var(--bg-card)] text-[var(--text-primary)]'
        }`}
      >
        {/* Encabezado del Sistema */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-4 border-[var(--border-subtle)]/80 dark:border-[#1c2d47]">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-1"
            aria-label="Ir al Resumen Ejecutivo"
          >
            <ClientumLogo className="h-8 w-auto" />
            <div>
              <span className="block font-bold leading-tight tracking-tight text-[var(--text-primary)] dark:text-white">
                ClientumOS
              </span>
              <span className="block text-[10px] font-medium text-[var(--text-muted)] dark:text-slate-300">
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
        <div className="space-y-1.5 border-b p-3 border-[var(--border-subtle)]/80 dark:border-[#1c2d47]">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
              resolvedTheme === 'dark'
                ? 'border-[#1c2d47] bg-[#0a0f1d] text-slate-200 hover:border-[#2d436a] hover:text-white'
                : 'border-[var(--border-subtle)] bg-[var(--bg-muted)] text-[var(--text-muted)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span>Buscar en todo el CRM...</span>
            </span>
            <kbd className="rounded bg-[var(--bg-muted)]/60 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--text-secondary)] dark:bg-[#142034] dark:text-slate-200">
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

        {/* Selector de Menú Doble en el Sidebar */}
        <div className="p-2 border-b border-[var(--border-subtle)]/80 dark:border-[#1c2d47] bg-slate-900/30">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
            <button
              type="button"
              onClick={() => setSidebarMenuMode('operativo')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                sidebarMenuMode === 'operativo'
                  ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0" />
              <span>1. Operativo</span>
            </button>
            <button
              type="button"
              onClick={() => setSidebarMenuMode('plataforma')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                sidebarMenuMode === 'plataforma'
                  ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Boxes className="w-3.5 h-3.5 shrink-0" />
              <span>2. Ecosistema</span>
            </button>
          </div>
        </div>

        {/* Lista Jerárquica de Secciones */}
        <div className="flex-1 space-y-4 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-[#1c2d47]">
          {(sidebarMenuMode === 'operativo' ? operativoNavSections : plataformaNavSections).map((section) => {
            const isCollapsed = collapsedSections[section.label];
            return (
              <div key={section.id} className="space-y-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-2 py-1 text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--text-secondary)] dark:text-slate-300 dark:hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
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
                    {section.items.map((item) => (
                      <SidebarItem
                        key={item.id}
                        item={item}
                        isActive={activeTab === item.id}
                        isExpanded={Boolean(expandedMenus[item.id])}
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
        <div className="flex items-center justify-between border-t p-3 border-[var(--border-subtle)]/80 dark:border-[#1c2d47]">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 truncate text-left group hover:opacity-90 transition-opacity cursor-pointer flex-1 min-w-0 mr-1.5"
            title="Ver y editar perfil de usuario"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={userDisplayName}
                className="h-8 w-8 shrink-0 rounded-full object-cover border border-[var(--border-default)] dark:border-slate-700 shadow-xs"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const sibling = e.currentTarget.nextElementSibling;
                  if (sibling) (sibling as HTMLElement).style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className={`h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xs shadow-xs ${
                currentUser?.avatar ? 'hidden' : 'flex'
              }`}
            >
              {userInitials}
            </div>
            <div className="truncate min-w-0">
              <span className="block truncate text-xs font-bold text-[var(--text-primary)] dark:text-white group-hover:text-blue-500 transition-colors">
                {userDisplayName}
              </span>
              <span className="block truncate text-[10px] text-slate-400">
                {currentUser?.role || 'Admin'}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label={`Cambiar a modo ${resolvedTheme === 'dark' ? 'claro' : 'oscuro'}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors cursor-pointer"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
            </button>
            <button
              onClick={() => setActiveTab('dashboardDocs')}
              aria-label="Documentación de la plataforma"
              title="Documentación y guías (18 Docs)"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              aria-label="Abrir ajustes"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors cursor-pointer"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => logout()}
              aria-label="Cerrar sesión"
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
