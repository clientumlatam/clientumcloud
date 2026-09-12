import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  Briefcase,
  Building2,
  Users2,
  CheckSquare,
  BarChart3,
  Settings,
  Plus,
  Sparkles,
  Download,
  ArrowRight,
  Palette,
  ExternalLink,
  Mail,
  Send,
  X,
  Command,
  Phone,
  MessageCircle,
  UserPlus,
  Calendar,
  Globe,
  Tag,
  Zap,
  BookOpen,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { ActiveTab } from '../../types';

export type CommandCategory = 'all' | 'contacts' | 'deals' | 'actions' | 'companies' | 'tasks' | 'navigation';

interface CommandItem {
  id: string;
  category: 'Actions' | 'Opportunities' | 'People' | 'Companies' | 'Tasks' | 'Navigation';
  type: 'action' | 'deal' | 'contact' | 'company' | 'task' | 'navigation';
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ElementType;
  iconColor?: string;
  contactDetails?: {
    email?: string;
    phone?: string;
    company?: string;
    role?: string;
    status?: string;
  };
  dealDetails?: {
    amount?: number;
    stage?: string;
    company?: string;
    contact?: string;
    priority?: string;
  };
  onSelect: () => void;
  quickActions?: Array<{
    label: string;
    icon: React.ElementType;
    onClick: (e: React.MouseEvent) => void;
  }>;
}

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    opportunities,
    companies,
    people,
    tasks,
    setActiveTab,
    setSelectedRecord,
    openNewRecordModal,
    openAICopilot,
    exportOpportunitiesCSV,
    openComposeEmailModal,
    showToast,
    isPublicSiteVisible,
    enterApp,
  } = useCRM();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CommandCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);

  // Platform detection for Mac vs Windows/Linux
  const isMac = useMemo(() => {
    return typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  }, []);

  const shortcutKey = isMac ? '⌘K' : 'Ctrl+K';

  // Reset query and selected index on modal open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setActiveCategory('all');
      setSelectedIndex(0);
      // Small delay to allow DOM transition then focus
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isCommandPaletteOpen]);

  // Keep selected item scrolled into view
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  // Transition to dashboard if user executes in-CRM action from public site
  const ensureInApp = () => {
    if (isPublicSiteVisible) {
      enterApp();
    }
  };

  // Helper format currency
  const formatAmount = (amt: number, curr?: string) => {
    if (curr === 'ARS') {
      return `$ ${amt.toLocaleString('es-AR')} ARS`;
    }
    return `$ ${amt.toLocaleString('en-US')} ${curr || 'USD'}`;
  };

  // Build searchable items
  const items = useMemo<CommandItem[]>(() => {
    const list: CommandItem[] = [];

    // --- 1. CORE ACTIONS (Focused on Creating New Deals & Contacts) ---
    list.push(
      {
        id: 'act-new-deal',
        category: 'Actions',
        type: 'action',
        title: 'Crear Nueva Oportunidad / Deal',
        subtitle: 'Abrir formulario para dar de alta una nueva oportunidad en el pipeline comercial',
        icon: Plus,
        iconColor: 'bg-emerald-600 text-white',
        badge: '+ Nuevo Deal',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        onSelect: () => {
          ensureInApp();
          openNewRecordModal('opportunity');
        },
      },
      {
        id: 'act-new-contact',
        category: 'Actions',
        type: 'action',
        title: 'Crear Nuevo Contacto / Persona',
        subtitle: 'Registrar un nuevo contacto, prospecto o tomador de decisión',
        icon: UserPlus,
        iconColor: 'bg-blue-600 text-white',
        badge: '+ Contacto',
        badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        onSelect: () => {
          ensureInApp();
          openNewRecordModal('person');
        },
      },
      {
        id: 'act-new-company',
        category: 'Actions',
        type: 'action',
        title: 'Crear Nueva Empresa / Organización',
        subtitle: 'Dar de alta una nueva cuenta corporativa o cliente B2B',
        icon: Building2,
        iconColor: 'bg-amber-600 text-white',
        badge: '+ Empresa',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        onSelect: () => {
          ensureInApp();
          openNewRecordModal('company');
        },
      },
      {
        id: 'act-new-task',
        category: 'Actions',
        type: 'action',
        title: 'Crear Nueva Tarea Comercial',
        subtitle: 'Programar llamada, reunión de seguimiento o demo con fecha límite',
        icon: CheckSquare,
        iconColor: 'bg-purple-600 text-white',
        badge: '+ Tarea',
        badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        onSelect: () => {
          ensureInApp();
          openNewRecordModal('task');
        },
      },
      {
        id: 'act-ai-copilot',
        category: 'Actions',
        type: 'action',
        title: 'Consultar Copiloto IA de Ventas (Clientum AI)',
        subtitle: 'Estrategias de negociación, borradores de correo y análisis del pipeline',
        icon: Sparkles,
        iconColor: 'bg-indigo-600 text-white',
        badge: 'AI Copilot',
        badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        onSelect: () => {
          ensureInApp();
          openAICopilot();
        },
      },
      {
        id: 'act-compose-email',
        category: 'Actions',
        type: 'action',
        title: 'Redactar Correo Webmail (Cloudflare & D1)',
        subtitle: 'Enviar email verificado con SPF/DKIM y trazabilidad en la cuenta',
        icon: Send,
        iconColor: 'bg-sky-600 text-white',
        badge: 'Webmail',
        badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
        onSelect: () => {
          ensureInApp();
          openComposeEmailModal();
        },
      },
      {
        id: 'act-export-csv',
        category: 'Actions',
        type: 'action',
        title: 'Exportar Base de Oportunidades (CSV)',
        subtitle: 'Descargar datos completos del pipeline comercial en formato Excel/CSV',
        icon: Download,
        iconColor: 'bg-teal-600 text-white',
        badge: 'Exportar',
        badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        onSelect: () => {
          exportOpportunitiesCSV();
        },
      }
    );

    // Dynamic Quick Action: If user is typing a query, offer to create a deal with that query name!
    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 1) {
      list.unshift({
        id: 'act-quick-create-deal-typed',
        category: 'Actions',
        type: 'action',
        title: `Crear Deal titulado "${trimmedQuery}"`,
        subtitle: `Añadir inmediatamente una nueva oportunidad con este nombre al pipeline`,
        icon: Zap,
        iconColor: 'bg-amber-500 text-slate-950 font-bold',
        badge: 'Quick Deal',
        badgeColor: 'bg-amber-400 text-slate-950 font-bold',
        onSelect: () => {
          ensureInApp();
          openNewRecordModal('opportunity');
          showToast(`Abriendo creador de deal para "${trimmedQuery}"`, 'info');
        },
      });
    }

    // --- 2. CONTACTS (PEOPLE) SEARCH ---
    people.forEach((p) => {
      const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Contacto';
      const cleanPhone = (p.phone || '').replace(/[^0-9]/g, '');

      list.push({
        id: `person-${p.id}`,
        category: 'People',
        type: 'contact',
        title: fullName,
        subtitle: `${p.jobTitle ? `${p.jobTitle} • ` : ''}${p.companyName || 'Sin empresa'} • ${p.email || 'Sin correo'}${p.phone ? ` • Tel: ${p.phone}` : ''}`,
        icon: Users2,
        iconColor: 'bg-blue-900/60 text-blue-300 border border-blue-500/30',
        badge: p.status || 'Contacto',
        badgeColor:
          p.status === 'Customer'
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            : p.status === 'Contacted'
            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
            : p.status === 'Churned'
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            : 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        contactDetails: {
          email: p.email,
          phone: p.phone,
          company: p.companyName,
          role: p.jobTitle,
          status: p.status,
        },
        onSelect: () => {
          ensureInApp();
          setActiveTab('people');
          setSelectedRecord({ type: 'person', id: p.id });
          showToast(`Abriendo contacto: ${fullName}`, 'info');
        },
        quickActions: [
          ...(cleanPhone
            ? [
                {
                  label: 'WhatsApp',
                  icon: MessageCircle,
                  onClick: (e: React.MouseEvent) => {
                    e.stopPropagation();
                    window.open(`https://wa.me/${cleanPhone}`, '_blank');
                  },
                },
              ]
            : []),
          ...(p.email
            ? [
                {
                  label: 'Email',
                  icon: Mail,
                  onClick: (e: React.MouseEvent) => {
                    e.stopPropagation();
                    openComposeEmailModal({ to: [p.email!], subject: `Seguimiento comercial - ${fullName}` });
                  },
                },
              ]
            : []),
        ],
      });
    });

    // --- 3. DEALS (OPPORTUNITIES) SEARCH ---
    opportunities.forEach((o) => {
      const formattedValue = formatAmount(o.amount, o.currency);
      const stageLabel =
        o.stage === 'lead'
          ? 'Lead'
          : o.stage === 'discovery'
          ? 'Descubrimiento'
          : o.stage === 'qualified'
          ? 'Calificado'
          : o.stage === 'proposal'
          ? 'Propuesta'
          : o.stage === 'negotiation'
          ? 'Negociación'
          : o.stage === 'won'
          ? 'Cierre Ganado'
          : o.stage === 'lost'
          ? 'Perdido'
          : o.stage;

      list.push({
        id: `opp-${o.id}`,
        category: 'Opportunities',
        type: 'deal',
        title: o.name,
        subtitle: `${o.companyName || 'Sin empresa'}${o.contactName ? ` • Contacto: ${o.contactName}` : ''} • Etapa: ${stageLabel} • Prioridad: ${o.priority}`,
        icon: Briefcase,
        iconColor:
          o.stage === 'won'
            ? 'bg-emerald-600 text-white'
            : o.stage === 'lost'
            ? 'bg-rose-900/60 text-rose-300'
            : 'bg-blue-600 text-white',
        badge: formattedValue,
        badgeColor:
          o.stage === 'won'
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            : 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        dealDetails: {
          amount: o.amount,
          stage: stageLabel,
          company: o.companyName,
          contact: o.contactName,
          priority: o.priority,
        },
        onSelect: () => {
          ensureInApp();
          setActiveTab('opportunities');
          setSelectedRecord({ type: 'opportunity', id: o.id });
          showToast(`Abriendo deal: ${o.name}`, 'info');
        },
      });
    });

    // --- 4. COMPANIES (CUENTAS) SEARCH ---
    companies.forEach((c) => {
      list.push({
        id: `comp-${c.id}`,
        category: 'Companies',
        type: 'company',
        title: c.name,
        subtitle: `${c.domain || 'sin-dominio.com'} • Sector: ${c.industry || 'General'} • Tier: ${c.tier || 'Startup'}`,
        icon: Building2,
        iconColor: 'bg-amber-900/50 text-amber-300 border border-amber-500/30',
        badge: c.tier || 'Empresa',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        onSelect: () => {
          ensureInApp();
          setActiveTab('companies');
          setSelectedRecord({ type: 'company', id: c.id });
        },
      });
    });

    // --- 5. TASKS SEARCH ---
    tasks.forEach((t) => {
      list.push({
        id: `task-${t.id}`,
        category: 'Tasks',
        type: 'task',
        title: t.title,
        subtitle: `Vence: ${t.dueDate || 'Sin fecha'} • Asignado: ${t.assignedTo || 'Equipo'} • Estado: ${t.status}`,
        icon: CheckSquare,
        iconColor: 'bg-purple-900/50 text-purple-300 border border-purple-500/30',
        badge: t.priority,
        badgeColor:
          t.priority === 'High' || t.priority === 'Urgent'
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            : 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        onSelect: () => {
          ensureInApp();
          setActiveTab('tasks');
          setSelectedRecord({ type: 'task', id: t.id });
        },
      });
    });

    // --- 6. NAVIGATION ITEMS ---
    list.push(
      {
        id: 'nav-opps',
        category: 'Navigation',
        type: 'navigation',
        title: 'Ir a Oportunidades / Pipeline Comercial',
        subtitle: 'Ver embudo de ventas, etapas kanban y pronóstico de ingresos',
        icon: Briefcase,
        iconColor: 'bg-slate-800 text-slate-200',
        badge: 'Pipeline',
        onSelect: () => {
          ensureInApp();
          setActiveTab('opportunities');
        },
      },
      {
        id: 'nav-people',
        category: 'Navigation',
        type: 'navigation',
        title: 'Ir a Contactos & Leads',
        subtitle: 'Directorio unificado de personas, teléfonos y cuentas de correo',
        icon: Users2,
        iconColor: 'bg-slate-800 text-slate-200',
        badge: 'Personas',
        onSelect: () => {
          ensureInApp();
          setActiveTab('people');
        },
      },
      {
        id: 'nav-comps',
        category: 'Navigation',
        type: 'navigation',
        title: 'Ir a Empresas / Cuentas Corporativas',
        subtitle: 'Directorio de organizaciones B2B y cartera de clientes',
        icon: Building2,
        iconColor: 'bg-slate-800 text-slate-200',
        badge: 'Empresas',
        onSelect: () => {
          ensureInApp();
          setActiveTab('companies');
        },
      },
      {
        id: 'nav-tasks',
        category: 'Navigation',
        type: 'navigation',
        title: 'Ir a Tareas y Agenda',
        subtitle: 'Calendario de llamadas, compromisos y tareas pendientes',
        icon: CheckSquare,
        iconColor: 'bg-slate-800 text-slate-200',
        badge: 'Agenda',
        onSelect: () => {
          ensureInApp();
          setActiveTab('tasks');
        },
      },
      {
        id: 'nav-analytics',
        category: 'Navigation',
        type: 'navigation',
        title: 'Ir a Analíticas & Pronóstico de Ventas',
        subtitle: 'Métricas de conversión, velocidad de cierre y rendimiento comercial',
        icon: BarChart3,
        iconColor: 'bg-slate-800 text-slate-200',
        badge: 'Reportes',
        onSelect: () => {
          ensureInApp();
          setActiveTab('analytics');
        },
      },
      {
        id: 'nav-webmail',
        category: 'Navigation',
        type: 'navigation',
        title: 'Ir a Bandeja de Entrada Webmail Cloudflare',
        subtitle: 'Bandeja sincronizada con Cloudflare Workers & SQLite D1',
        icon: Mail,
        iconColor: 'bg-slate-800 text-slate-200',
        badge: 'Webmail',
        onSelect: () => {
          ensureInApp();
          setActiveTab('webmail');
        },
      },
      {
        id: 'nav-feature-hub',
        category: 'Navigation',
        type: 'navigation',
        title: 'Ir a Unified Control Hub (Workspace & Ecosistema)',
        subtitle: 'Diagnóstico, herramientas, 15 módulos canónicos y catálogo completo',
        icon: Sparkles,
        iconColor: 'bg-slate-800 text-slate-200',
        badge: 'Hub',
        onSelect: () => {
          ensureInApp();
          setActiveTab('ecosystemHub');
        },
      },
      {
        id: 'nav-settings',
        category: 'Navigation',
        type: 'navigation',
        title: 'Ir a Configuración & Campos Personalizados',
        subtitle: 'Ajustes del espacio, permisos, roles y apariencia',
        icon: Settings,
        iconColor: 'bg-slate-800 text-slate-200',
        badge: 'Ajustes',
        onSelect: () => {
          ensureInApp();
          setActiveTab('settings');
        },
      },
      {
        id: 'nav-dashboard-docs',
        category: 'Navigation',
        type: 'navigation',
        title: 'Documentación del Dashboard (18 Módulos Canónicos)',
        subtitle: 'Especificación técnica completa de vistas, controladores y arquitectura',
        icon: BookOpen,
        iconColor: 'bg-blue-600 text-white',
        badge: '18 Docs',
        badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        onSelect: () => {
          ensureInApp();
          setActiveTab('dashboardDocs');
        },
      }
    );

    return list;
  }, [
    opportunities,
    companies,
    people,
    tasks,
    query,
    isPublicSiteVisible,
    ensureInApp,
    formatAmount,
    openNewRecordModal,
    openAICopilot,
    exportOpportunitiesCSV,
    openComposeEmailModal,
    setActiveTab,
    setSelectedRecord,
    showToast,
  ]);

  // Counts for category badges
  const categoryCounts = useMemo(() => {
    return {
      all: items.length,
      contacts: items.filter((i) => i.category === 'People').length,
      deals: items.filter((i) => i.category === 'Opportunities').length,
      actions: items.filter((i) => i.category === 'Actions').length,
      companies: items.filter((i) => i.category === 'Companies').length,
      tasks: items.filter((i) => i.category === 'Tasks').length,
      navigation: items.filter((i) => i.category === 'Navigation').length,
    };
  }, [items]);

  // Filter items according to active category and search query
  const filtered = useMemo(() => {
    let result = items;

    // Filter by category tab
    if (activeCategory === 'contacts') {
      result = result.filter((i) => i.category === 'People');
    } else if (activeCategory === 'deals') {
      result = result.filter((i) => i.category === 'Opportunities');
    } else if (activeCategory === 'actions') {
      result = result.filter((i) => i.category === 'Actions');
    } else if (activeCategory === 'companies') {
      result = result.filter((i) => i.category === 'Companies');
    } else if (activeCategory === 'tasks') {
      result = result.filter((i) => i.category === 'Tasks');
    } else if (activeCategory === 'navigation') {
      result = result.filter((i) => i.category === 'Navigation');
    }

    // Filter by text query
    const q = query.trim().toLowerCase();
    if (!q) return result;

    return result.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);

      // Contact-specific deep matching (phone without spaces, email, role)
      let matchContact = false;
      if (item.contactDetails) {
        matchContact =
          Boolean(item.contactDetails.email?.toLowerCase().includes(q)) ||
          Boolean(item.contactDetails.phone?.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''))) ||
          Boolean(item.contactDetails.company?.toLowerCase().includes(q)) ||
          Boolean(item.contactDetails.role?.toLowerCase().includes(q));
      }

      // Deal-specific deep matching
      let matchDeal = false;
      if (item.dealDetails) {
        matchDeal =
          Boolean(item.dealDetails.company?.toLowerCase().includes(q)) ||
          Boolean(item.dealDetails.contact?.toLowerCase().includes(q)) ||
          Boolean(item.dealDetails.stage?.toLowerCase().includes(q));
      }

      return matchTitle || matchSubtitle || matchBadge || matchCategory || matchContact || matchDeal;
    });
  }, [items, activeCategory, query]);

  // Reset selectedIndex whenever filtered items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filtered.length, activeCategory, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].onSelect();
        setIsCommandPaletteOpen(false);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsCommandPaletteOpen(false);
    } else if (e.key === 'Tab') {
      // Cycle category filter tabs on Tab
      e.preventDefault();
      const categories: CommandCategory[] = ['all', 'contacts', 'deals', 'actions', 'companies', 'navigation'];
      const currentIdx = categories.indexOf(activeCategory);
      const nextIdx = e.shiftKey
        ? (currentIdx > 0 ? currentIdx - 1 : categories.length - 1)
        : (currentIdx < categories.length - 1 ? currentIdx + 1 : 0);
      setActiveCategory(categories[nextIdx]);
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      id="clientum-command-palette-overlay"
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-20 p-3 sm:p-4 animate-in fade-in duration-150"
      onClick={() => setIsCommandPaletteOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Paleta de Comandos y Búsqueda Global"
    >
      <div
        className="w-full max-w-2xl bg-[#0f131c] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh] text-slate-200 select-none animate-in fade-in zoom-in-95 duration-150 ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Section */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800/90 flex items-center gap-3 bg-[#131825]">
          <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shrink-0">
            <Search className="w-4 h-4" />
          </div>

          <div className="flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar contactos, crear deals, o escribir un comando..."
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                // Smart auto-category switching based on prefix
                if (val.startsWith('@')) {
                  setActiveCategory('contacts');
                } else if (val.startsWith('$') || val.toLowerCase().startsWith('deal:')) {
                  setActiveCategory('deals');
                } else if (val.startsWith('>')) {
                  setActiveCategory('actions');
                }
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-medium"
            />
          </div>

          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <kbd className="text-[11px] font-mono font-semibold px-2 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 shadow-2xs">
              {shortcutKey}
            </kbd>
            <kbd className="text-[11px] font-mono font-semibold px-1.5 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
              ESC
            </kbd>
          </div>
        </div>

        {/* Quick Filter Category Pills */}
        <div className="px-3 py-2 border-b border-slate-800/80 bg-[#0c0f17] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-medium text-slate-400 pl-1 mr-1 hidden sm:inline">Filtrar:</span>
          
          <button
            onClick={() => setActiveCategory('all')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Todos</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">{categoryCounts.all}</span>
          </button>

          <button
            onClick={() => setActiveCategory('contacts')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeCategory === 'contacts'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users2 className="w-3.5 h-3.5" />
            <span>Contactos</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">{categoryCounts.contacts}</span>
          </button>

          <button
            onClick={() => setActiveCategory('deals')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeCategory === 'deals'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Deals</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">{categoryCounts.deals}</span>
          </button>

          <button
            onClick={() => setActiveCategory('actions')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeCategory === 'actions'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Acciones</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">{categoryCounts.actions}</span>
          </button>

          <button
            onClick={() => setActiveCategory('companies')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeCategory === 'companies'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Empresas</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15">{categoryCounts.companies}</span>
          </button>

          <button
            onClick={() => setActiveCategory('navigation')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeCategory === 'navigation'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Navegación</span>
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listContainerRef}
          className="overflow-y-auto p-2 sm:p-2.5 space-y-1 flex-1 max-h-[55vh] divide-y divide-slate-800/40"
        >
          {filtered.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 text-slate-500" />
              </div>
              <p className="text-sm font-semibold text-slate-300">
                No se encontraron resultados para &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Puedes dar de alta un nuevo registro inmediatamente usando los accesos rápidos:
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    ensureInApp();
                    openNewRecordModal('opportunity');
                    setIsCommandPaletteOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Crear Deal</span>
                </button>
                <button
                  onClick={() => {
                    ensureInApp();
                    openNewRecordModal('person');
                    setIsCommandPaletteOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Crear Contacto</span>
                </button>
              </div>
            </div>
          ) : (
            filtered.slice(0, 40).map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  id={`cmd-item-${item.id}`}
                  ref={isSelected ? selectedItemRef : null}
                  onClick={() => {
                    item.onSelect();
                    setIsCommandPaletteOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all text-xs group ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-900/60 to-slate-800/80 text-white border border-blue-500/40 shadow-sm'
                      : 'hover:bg-slate-900/60 text-slate-300 border border-transparent'
                  }`}
                >
                  {/* Left Icon and Details */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center transition-transform ${
                        isSelected ? 'scale-105' : ''
                      } ${item.iconColor || 'bg-slate-800 text-slate-300'}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold truncate text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {item.title}
                        </span>

                        {item.type === 'contact' && item.contactDetails?.status && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono border ${item.badgeColor}`}>
                            {item.contactDetails.status}
                          </span>
                        )}
                      </div>

                      {item.subtitle && (
                        <div className="text-[11px] text-slate-400 truncate mt-0.5 group-hover:text-slate-300 transition-colors">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Badges & Quick Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Quick action buttons (e.g. WhatsApp, Mail directly from palette) */}
                    {item.quickActions && item.quickActions.length > 0 && (
                      <div className="hidden sm:flex items-center gap-1 mr-1">
                        {item.quickActions.map((qa, qidx) => {
                          const QAIcon = qa.icon;
                          return (
                            <button
                              key={qidx}
                              onClick={qa.onClick}
                              title={qa.label}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
                            >
                              <QAIcon className="w-3 h-3" />
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {item.badge && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-lg font-mono font-medium border ${
                          item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    <div className="hidden md:flex items-center">
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-slate-900/60">
                        {item.category}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-blue-400 translate-x-0.5 opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Footer Shortcuts Legend */}
        <div className="p-3 bg-[#0a0d14] border-t border-slate-800/90 flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-4 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">
                ↑↓
              </kbd>{' '}
              Navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">
                ↵
              </kbd>{' '}
              Seleccionar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">
                Tab
              </kbd>{' '}
              Filtro
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">
                esc
              </kbd>{' '}
              Cerrar
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span>Atajo global:</span>
            <span className="font-bold text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800/60">
              {shortcutKey}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
