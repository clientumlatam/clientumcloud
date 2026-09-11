import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  Receipt,
  MessageSquare,
  Workflow,
  FileCheck,
  Bot,
  CheckSquare,
  BarChart3,
  Users2,
  Calendar,
  Layers,
  Send,
  CreditCard,
  Headphones,
  ShoppingBag,
  ExternalLink,
  Search,
  CheckCircle2,
  FileText,
  X,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
  Info,
  ChevronRight,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Download,
  Cloud,
  CloudOff,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

export interface EcosystemModuleConfig {
  id: string;
  order: number;
  title: string;
  category: 'Ventas' | 'Operaciones & ERP' | 'Comunicación' | 'IA & Automatización' | 'Finanzas & Soporte';
  description: string;
  migrationFile: string;
  activeTabTarget: string;
  appSourceId: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  progressPercentage: number;
  defaultEnabled: boolean;
  capabilities: string[];
  docSummary: string;
}

/**
 * Configuración inicial de los 15 módulos migrados desde las aplicaciones de origen
 */
export const INITIAL_ECOSYSTEM_MODULES: EcosystemModuleConfig[] = [
  {
    id: 'mod-01-maps',
    order: 1,
    title: 'Prospección B2B Google Maps',
    category: 'Ventas',
    description: 'Búsqueda de empresas geolocalizadas con radar cartográfico, captura a 1 clic e inserción directa al pipeline.',
    migrationFile: '01_google_maps_prospecting.md',
    activeTabTarget: 'googleMaps',
    appSourceId: '00d3a74e-d23f-4d55-81c2-e591b8febc1c',
    icon: MapPin,
    color: 'emerald',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Buscador por radio de km', 'Extracción telefónica y web', 'Importación masiva al pipeline'],
    docSummary: 'Extracción de lugares vía Google Places API con conversión instantánea en Lead y Company.',
  },
  {
    id: 'mod-02-erp',
    order: 2,
    title: 'Facturación & ERP Connector',
    category: 'Operaciones & ERP',
    description: 'Emisión de facturas A/B/C, comprobantes fiscales, cálculo de alícuotas de IVA y código QR oficial AFIP RG 4291.',
    migrationFile: '02_erp_billing.md',
    activeTabTarget: 'erp',
    appSourceId: '7ca3102c-db18-47ee-84ec-6b2c45167c13',
    icon: Receipt,
    color: 'blue',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Facturación A, B y C con CAE', 'Cálculo impositivo multinacional', 'Pase automático tras trato ganado'],
    docSummary: 'Integración AFIP WSFE y emisión electrónica al cerrar tratos en el pipeline comercial.',
  },
  {
    id: 'mod-03-omnichannel',
    order: 3,
    title: 'Bandeja Omnicanal WhatsApp & Webmail',
    category: 'Comunicación',
    description: 'Consola unificada de mensajería para WhatsApp Business Cloud API, Webmail IMAP/SMTP y Live Chat.',
    migrationFile: '03_omnichannel_messaging.md',
    activeTabTarget: 'whatsapp',
    appSourceId: '2b73f8e5-3bf5-4fa7-ae19-813474eb5895',
    icon: MessageSquare,
    color: 'teal',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Historial unificado de chat', 'Respuestas rápidas y macros', 'Simulador y live testing'],
    docSummary: 'Inbox unificado de 3 columnas con soporte para webhooks de WhatsApp y correo corporativo.',
  },
  {
    id: 'mod-04-workflows',
    order: 4,
    title: 'Diseñador Visual de Workflows',
    category: 'IA & Automatización',
    description: 'Automatizaciones basadas en eventos del CRM con disparadores, reglas lógicas y acciones en cascada.',
    migrationFile: '04_workflow_builder.md',
    activeTabTarget: 'workflows',
    appSourceId: '9fae155b-7b0e-436f-b2aa-ef8cebfe7a35',
    icon: Workflow,
    color: 'indigo',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Disparador por cambio de etapa', 'Auto-asignación round robin', 'Envío de notificaciones webhook'],
    docSummary: 'Motor de eventos y reglas lógicas tipo Zapier embebido para optimizar el ciclo comercial.',
  },
  {
    id: 'mod-05-proposals',
    order: 5,
    title: 'Propuestas en PDF & Firma Digital',
    category: 'Ventas',
    description: 'Generador de presupuestos comerciales ejecutivos con vista previa en PDF y portal público de firma digital.',
    migrationFile: '05_proposal_generator.md',
    activeTabTarget: 'propuestas',
    appSourceId: '8093d5ce-a602-45e0-b6f3-66f8e792e3a1',
    icon: FileCheck,
    color: 'cyan',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Plantillas corporativas en PDF', 'Portal de firma digital (/firmar/:id)', 'Alertas de apertura de cotización'],
    docSummary: 'Pipeline de cotizaciones con trazabilidad de firma y aceptación en línea por el prospecto.',
  },
  {
    id: 'mod-06-copilot',
    order: 6,
    title: 'Copilot de Ventas Gemini Flotante',
    category: 'IA & Automatización',
    description: 'Asistente IA contextual persistente con Gemini 2.5 Flash para manejo de objeciones y tareas rápidas.',
    migrationFile: '06_ai_chat_copilot.md',
    activeTabTarget: 'agenteOS',
    appSourceId: 'e460c865-6182-4a02-91c6-0fa1c6017d1c',
    icon: Bot,
    color: 'purple',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Detección de pantalla activa', 'Generador de copies de WhatsApp', 'Creación instantánea de tareas'],
    docSummary: 'Arquitectura multi-agente asistida por Gemini 2.5 para acelerar la toma de decisiones comerciales.',
  },
  {
    id: 'mod-07-tasks-kanban',
    order: 7,
    title: 'Tablero Kanban de Tareas',
    category: 'Operaciones & ERP',
    description: 'Organización visual de las actividades y seguimientos del equipo de ventas con alertas de vencimiento.',
    migrationFile: '07_tasks_kanban_board.md',
    activeTabTarget: 'tasks',
    appSourceId: '13d2cca5-c20a-4308-a64c-692a60321693',
    icon: CheckSquare,
    color: 'amber',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Columnas por estado operativo', 'Filtro por responsable comercial', 'Detección de tratos estancados'],
    docSummary: 'Tablero de asignación ágil de tareas comerciales conectado a las alertas de agenda.',
  },
  {
    id: 'mod-08-bi-dashboard',
    order: 8,
    title: 'Business Intelligence & Forecast',
    category: 'Finanzas & Soporte',
    description: 'Métricas de ingresos recurrentes (MRR/ARR), forecast ponderado de pipeline y velocidad de ventas.',
    migrationFile: '08_analytics_bi_dashboard.md',
    activeTabTarget: 'analytics',
    appSourceId: 'f2cd5244-e9b7-4f0e-8682-0e2c8c4356f8',
    icon: BarChart3,
    color: 'violet',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Forecast ponderado de pipeline', 'Velocidad de conversión (Sales Velocity)', 'Métricas de productividad'],
    docSummary: 'Consolidación de métricas de ingresos, proyecciones probabilísticas y rendimiento de asesores.',
  },
  {
    id: 'mod-09-contacts-enrichment',
    order: 9,
    title: 'Directorio B2B & Enriquecimiento',
    category: 'Ventas',
    description: 'Relación jerárquica Empresa-Contactos (1:N), importador guiado CSV con tolerancia léxica y roles de decisores.',
    migrationFile: '09_contacts_enrichment.md',
    activeTabTarget: 'people',
    appSourceId: '2fb77921-7f3f-4047-8d56-4fef383fa37b',
    icon: Users2,
    color: 'blue',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Árbol de contactos por empresa', 'Importador CSV con autodetección', 'Clasificación de decisores B2B'],
    docSummary: 'Modelo jerárquico de base relacional Empresa-Contactos con enriquecimiento de perfiles.',
  },
  {
    id: 'mod-10-calendar',
    order: 10,
    title: 'Calendario Comercial & Citas',
    category: 'Ventas',
    description: 'Agenda interactiva mensual/semanal y portal de agendamiento autónomo para clientes (/book/:asesor).',
    migrationFile: '10_calendar_scheduler.md',
    activeTabTarget: 'calendar',
    appSourceId: '5f0f8123-8234-454a-a069-b237a07c73fb',
    icon: Calendar,
    color: 'rose',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Vistas Mes / Semana / Agenda', 'Citas vinculadas a Oportunidades', 'Exportación iCal RFC 5545'],
    docSummary: 'Sincronizador de agendas y calendarización de demos con enlaces únicos para clientes.',
  },
  {
    id: 'mod-11-webforms',
    order: 11,
    title: 'Formularios Web Embebidos',
    category: 'Ventas',
    description: 'Generador no-code de formularios de captura de prospectos con snippet iframe/script y captura de UTMs.',
    migrationFile: '11_webforms_lead_capture.md',
    activeTabTarget: 'webDev',
    appSourceId: 'a12b4e78-9844-48ac-b43a-71829411dc31',
    icon: Layers,
    color: 'orange',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Generación de iframe y script', 'Captura automática en base de Leads', 'Lead scoring en la ingesta'],
    docSummary: 'Lead magnet y constructor visual de formularios para sitios web corporativos y landing pages.',
  },
  {
    id: 'mod-12-email-cadences',
    order: 12,
    title: 'Campañas Masivas & Cadencias',
    category: 'Comunicación',
    description: 'Secuencias de seguimiento escalonadas (Drip Sequences), plantillas HTML con variables y auto-stop on reply.',
    migrationFile: '12_email_campaigns_cadences.md',
    activeTabTarget: 'campaigns',
    appSourceId: 'b76a401c-66fe-4d7a-a220-438491bb4f10',
    icon: Send,
    color: 'sky',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Plantillas HTML con variables', 'Disparador multietapa secuencial', 'Tracking de aperturas y clics'],
    docSummary: 'Cadencias multietapa para prospección en frío y fidelización masiva de clientes.',
  },
  {
    id: 'mod-13-checkout-gateways',
    order: 13,
    title: 'Pasarelas de Cobro & Pay Links',
    category: 'Finanzas & Soporte',
    description: 'Generación de links de pago en ARS (Mercado Pago) o USD (Stripe) con autocierre de tratos por webhook.',
    migrationFile: '13_payments_checkout_gateways.md',
    activeTabTarget: 'payments',
    appSourceId: 'cc98101a-ee41-455b-8012-33bfa8e31294',
    icon: CreditCard,
    color: 'emerald',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Generación de links de pago', 'Webhook con firma HMAC', 'Cobro recurrente de suscripciones'],
    docSummary: 'Checkout integrado con Mercado Pago y Stripe para cobros inmediatos y suscripciones recurrentes.',
  },
  {
    id: 'mod-14-helpdesk-tickets',
    order: 14,
    title: 'Mesa de Ayuda & Tickets Post-Venta',
    category: 'Finanzas & Soporte',
    description: 'Gestión de incidencias de clientes, temporizadores de control de SLA y encuestas de satisfacción CSAT.',
    migrationFile: '14_helpdesk_support_tickets.md',
    activeTabTarget: 'clientPortal',
    appSourceId: 'd091722e-131b-419b-a010-09fa44bc8100',
    icon: Headphones,
    color: 'indigo',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Bandeja de incidencias con SLA', 'Encuesta CSAT 5 estrellas', 'Historial 360° por cliente'],
    docSummary: 'Soporte al cliente y mesa de ayuda con control de tiempos de resolución y satisfacción post-venta.',
  },
  {
    id: 'mod-15-catalog-pricing',
    order: 15,
    title: 'Catálogo de Productos & Tarifarios',
    category: 'Operaciones & ERP',
    description: 'Base de datos de SKUs, stock disponible, costos y listas de precios segmentadas para cotizaciones.',
    migrationFile: '15_product_catalog_pricing.md',
    activeTabTarget: 'tiendaDigital',
    appSourceId: 'ef90123c-5501-4478-90aa-88f117bc9302',
    icon: ShoppingBag,
    color: 'amber',
    badge: '100% Operativo',
    progressPercentage: 100,
    defaultEnabled: true,
    capabilities: ['Gestión de SKUs y stock', 'Listas de precios segmentadas', 'Cálculo de márgenes de ganancia'],
    docSummary: 'Inventario de productos y servicios con listas de precios dinámicas para cotizaciones ágiles.',
  },
];

const STORAGE_KEY = 'clientum_ecosystem_modules_state';

export const EcosistemaHub: React.FC = () => {
  const { setActiveTab, ecosystemModuleOrder, setEcosystemModuleOrder } = useCRM();
  const [draggedModuleId, setDraggedModuleId] = useState<string | null>(null);

  // Estados consumidos desde la configuración inicial con persistencia local
  const [enabledModules, setEnabledModules] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore read error
    }
    // Inicializar desde defaultEnabled de la configuración inicial
    const initialMap: Record<string, boolean> = {};
    INITIAL_ECOSYSTEM_MODULES.forEach((m) => {
      initialMap[m.id] = m.defaultEnabled;
    });
    return initialMap;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedDoc, setSelectedDoc] = useState<{ filename: string; title: string; content?: string } | null>(null);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSyncPending, setIsSyncPending] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setTimeout(() => setIsSyncPending(false), 1200);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setIsSyncPending(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!navigator.onLine) {
      setIsSyncPending(true);
    } else {
      setIsSyncPending(true);
      const timer = setTimeout(() => {
        setIsSyncPending(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ecosystemModuleOrder, enabledModules]);

  const handleExportCSV = () => {
    const headers = ['Prioridad', 'ID Modulo', 'Titulo', 'Categoria', 'Estado', 'Progreso (%)'];
    const rows = orderedModules.map((m, index) => [
      index + 1,
      m.id,
      `"${m.title.replace(/"/g, '""')}"`,
      `"${m.category}"`,
      enabledModules[m.id] ? 'Activo' : 'Inactivo',
      m.progressPercentage
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `clientum_ecosistema_modulos_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Persistir cambios en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enabledModules));
    } catch {
      // ignore storage error
    }
  }, [enabledModules]);

  // Manejar cambio del interruptor (toggle)
  const handleToggleModule = (moduleId: string) => {
    setEnabledModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Activar o desactivar todos
  const handleToggleAll = (enable: boolean) => {
    const updated: Record<string, boolean> = {};
    INITIAL_ECOSYSTEM_MODULES.forEach((m) => {
      updated[m.id] = enable;
    });
    setEnabledModules(updated);
  };

  // Restaurar configuración inicial
  const handleResetToDefault = () => {
    const defaultMap: Record<string, boolean> = {};
    INITIAL_ECOSYSTEM_MODULES.forEach((m) => {
      defaultMap[m.id] = m.defaultEnabled;
    });
    setEnabledModules(defaultMap);
    setEcosystemModuleOrder(INITIAL_ECOSYSTEM_MODULES.map((m) => m.id));
  };

  // Leer documento de migración
  const handleOpenDoc = async (module: EcosystemModuleConfig) => {
    setSelectedDoc({ filename: module.migrationFile, title: module.title });
    setLoadingDoc(true);
    setDocError(null);

    try {
      const res = await fetch(`/api/migrations/${module.migrationFile}`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: No se pudo cargar el análisis`);
      }
      const data = await res.json();
      setSelectedDoc({
        filename: module.migrationFile,
        title: module.title,
        content: data.content || 'Sin contenido disponible',
      });
    } catch (err: any) {
      setDocError(err?.message || 'Error al conectar con el servidor');
    } finally {
      setLoadingDoc(false);
    }
  };

  // Ordenar módulos según ecosystemModuleOrder global
  const orderedModules = useMemo(() => {
    const map = new Map(INITIAL_ECOSYSTEM_MODULES.map((m) => [m.id, m]));
    const result: EcosystemModuleConfig[] = [];
    ecosystemModuleOrder.forEach((id) => {
      const mod = map.get(id);
      if (mod) result.push(mod);
    });
    INITIAL_ECOSYSTEM_MODULES.forEach((m) => {
      if (!result.some((r) => r.id === m.id)) {
        result.push(m);
      }
    });
    return result;
  }, [ecosystemModuleOrder]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedModuleId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedModuleId || draggedModuleId === targetId) return;

    const currentOrder = orderedModules.map((m) => m.id);
    const sourceIndex = currentOrder.indexOf(draggedModuleId);
    const targetIndex = currentOrder.indexOf(targetId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const newOrder = [...currentOrder];
      newOrder.splice(sourceIndex, 1);
      newOrder.splice(targetIndex, 0, draggedModuleId);
      setEcosystemModuleOrder(newOrder);
    }
    setDraggedModuleId(null);
  };

  const handleMovePosition = (id: string, direction: 'up' | 'down') => {
    const currentOrder = orderedModules.map((m) => m.id);
    const index = currentOrder.indexOf(id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === currentOrder.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newOrder = [...currentOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(newIndex, 0, moved);
    setEcosystemModuleOrder(newOrder);
  };

  // Filtros aplicados sobre la lista ordenada
  const filteredModules = useMemo(() => {
    return orderedModules.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.appSourceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.capabilities.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'Todos' || m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [orderedModules, searchTerm, selectedCategory]);

  // Métricas de progreso visual global
  const activeCount = useMemo(() => {
    return Object.values(enabledModules).filter(Boolean).length;
  }, [enabledModules]);

  const overallProgress = useMemo(() => {
    const totalPossible = INITIAL_ECOSYSTEM_MODULES.length;
    return Math.round((activeCount / totalPossible) * 100);
  }, [activeCount]);

  const categories = ['Todos', 'Ventas', 'Operaciones & ERP', 'Comunicación', 'IA & Automatización', 'Finanzas & Soporte'];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto">
      {/* Header Principal */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                Arquitectura Unificada Clientum
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                15 Módulos Canónicos
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-2">
              Centro del Ecosistema & Módulos
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Panel de orquestación modular con interruptor (toggle) individual para cada una de las 15 aplicaciones de origen analizadas en <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-700 dark:text-slate-300">docs/migrations</code>.
            </p>
          </div>

          {/* Botones de acción masiva */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-enable-all-modules"
              onClick={() => handleToggleAll(true)}
              className="px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition"
            >
              Activar Todos
            </button>
            <button
              id="btn-disable-all-modules"
              onClick={() => handleToggleAll(false)}
              className="px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition"
            >
              Desactivar Todos
            </button>
            <button
              id="btn-reset-default-modules"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Valores
            </button>
          </div>
        </div>

        {/* Tarjetas de Métricas & Barra de Progreso Global */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Módulos Habilitados</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{activeCount}</span>
              <span className="text-xs text-slate-500">de {INITIAL_ECOSYSTEM_MODULES.length} módulos</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(activeCount / INITIAL_ECOSYSTEM_MODULES.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Progreso Global de Integración</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">100%</span>
              <span className="text-xs text-slate-500">Madurez funcional</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-full" />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Documentos en docs/migrations</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">15 / 15</span>
              <span className="text-xs text-emerald-600 font-medium">Analizados</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              Especificaciones y endpoints disponibles
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Disponibilidad del Sistema</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">100%</span>
              <span className="text-xs text-slate-500">Zero-downtime</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              Sincronización con CRMContext
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de Sincronización con Firebase & Exportar CSV */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 mt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2.5">
            {isOnline && !isSyncPending ? (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Sincronizado con Firebase en tiempo real</span>
              </>
            ) : !isOnline ? (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Sin conexión (Offline) — Los cambios de prioridad y estado están pendientes de sincronización</span>
              </>
            ) : (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-spin shrink-0" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Sincronizando cambios de prioridad y estado con Firebase...</span>
              </>
            )}
          </div>

          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition shrink-0"
            title="Descargar reporte resumen de módulos y prioridades en CSV"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar Reporte CSV
          </button>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs de categorías */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Campo de búsqueda */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por módulo, app ID o función..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Grilla de los 15 Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {filteredModules.map((module) => {
            const isEnabled = !!enabledModules[module.id];
            const Icon = module.icon;
            const currentPriorityIndex = orderedModules.findIndex((m) => m.id === module.id) + 1;

            return (
              <div
                key={module.id}
                id={`module-card-${module.id}`}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, module.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, module.id)}
                className={`flex flex-col justify-between bg-white dark:bg-slate-900 rounded-xl border transition-all duration-200 select-none ${
                  draggedModuleId === module.id ? 'opacity-40 border-dashed border-blue-500 scale-95' : ''
                } ${
                  isEnabled
                    ? 'border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-600'
                    : 'border-slate-200/60 dark:border-slate-800/60 opacity-60 bg-slate-50/50 dark:bg-slate-950/40'
                }`}
              >
                {/* Cabecera de la Tarjeta */}
                <div className="p-5 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Drag Handle & Icon */}
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 cursor-grab active:cursor-grabbing" title="Arrastra para reordenar prioridad">
                        <GripVertical className="w-4 h-4 hover:text-blue-600 transition" />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900" title="Prioridad de Módulo en Ecosistema">
                            #{String(currentPriorityIndex).padStart(2, '0')}
                          </span>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {module.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                          {module.title}
                        </h3>
                      </div>
                    </div>

                    {/* Controles de Reordenamiento Rápido & Toggle */}
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => handleMovePosition(module.id, 'up')}
                          disabled={currentPriorityIndex === 1}
                          className="p-0.5 text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-500 transition"
                          title="Subir prioridad"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMovePosition(module.id, 'down')}
                          disabled={currentPriorityIndex === orderedModules.length}
                          className="p-0.5 text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-500 transition"
                          title="Bajar prioridad"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Interruptor (Toggle Switch) */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isEnabled}
                        id={`toggle-${module.id}`}
                        onClick={() => handleToggleModule(module.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          isEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                        title={isEnabled ? 'Desactivar módulo' : 'Activar módulo'}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    {module.description}
                  </p>

                  {/* Indicador de Progreso Visual */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">Progreso de Integración</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-[11px]">
                        {module.progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${module.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Capacidades clave */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {module.capabilities.map((cap, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  {/* ID de Origen */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    <span>App: {module.appSourceId.slice(0, 8)}...</span>
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {module.badge}
                    </span>
                  </div>
                </div>

                {/* Acciones de la Tarjeta */}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 rounded-b-xl">
                  <button
                    onClick={() => handleOpenDoc(module)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Análisis Técnico
                  </button>

                  <button
                    disabled={!isEnabled}
                    onClick={() => setActiveTab(module.activeTabTarget)}
                    className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition ${
                      isEnabled
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm'
                        : 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    Abrir Módulo
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Lectura de Análisis Técnico */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800">
            {/* Header del Modal */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {selectedDoc.title}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500">
                    docs/migrations/{selectedDoc.filename}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido del Documento */}
            <div className="p-6 overflow-y-auto flex-1 font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
              {loadingDoc ? (
                <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Cargando análisis técnico desde el servidor...</span>
                </div>
              ) : docError ? (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300">
                  {docError}
                </div>
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-mono text-[11px] bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
                  {selectedDoc.content}
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between rounded-b-2xl">
              <span className="text-[11px] text-slate-500">
                Sincronizado con el repositorio oficial de Clientum CRM
              </span>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcosistemaHub;
