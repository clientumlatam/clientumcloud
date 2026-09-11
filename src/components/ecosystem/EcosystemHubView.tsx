import React, { useState, useMemo, useEffect } from 'react';
import Markdown from 'react-markdown';
import {
  Boxes,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Sparkles,
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
  Search,
  Check,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  FileText,
  BookOpen,
  X,
  Copy,
  SlidersHorizontal,
  FolderGit2,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { ActiveTab } from '../../types';

export interface EcosystemModuleItem {
  id: string;
  order: number;
  title: string;
  category: 'Ventas' | 'Operaciones & ERP' | 'Comunicación' | 'IA & Automatización' | 'Finanzas & Soporte';
  description: string;
  migrationFile: string;
  activeTabTarget?: ActiveTab;
  appSourceId?: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  defaultEnabled: boolean;
  capabilities: string[];
  docSummary: string;
  progressPercentage?: number;
}

export const ECOSYSTEM_MODULES: EcosystemModuleItem[] = [
  {
    id: 'mod-01-maps',
    order: 1,
    title: 'Prospección B2B Google Maps',
    category: 'Ventas',
    description: 'Búsqueda de empresas geolocalizadas con radar, captura de datos a 1 clic e inserción directa en el pipeline.',
    migrationFile: '01_google_maps_prospecting.md',
    activeTabTarget: 'googleMaps',
    appSourceId: '00d3a74e-d23f-4d55-81c2-e591b8febc1c',
    icon: MapPin,
    color: 'emerald',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Buscador por radio de km', 'Extracción telefónica y web', 'Importación masiva al pipeline'],
    docSummary: 'Extracción de lugares vía Google Places API / Proxy seguro con conversión instantánea en Lead.',
  },
  {
    id: 'mod-02-erp',
    order: 2,
    title: 'Facturación & ERP Connector',
    category: 'Operaciones & ERP',
    description: 'Emisión automática de comprobantes, proformas, cálculo de IVA y sincronización fiscal AFIP.',
    migrationFile: '02_erp_billing.md',
    activeTabTarget: 'erp',
    appSourceId: '7ca3102c-db18-47ee-84ec-6b2c45167c13',
    icon: Receipt,
    color: 'blue',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Generador de facturas proforma', 'Cálculo impositivo multinacional', 'Pase automático tras trato ganado'],
    docSummary: 'Integración AFIP WSFE / Facturación electrónica al ganar oportunidades comerciales en el CRM.',
  },
  {
    id: 'mod-03-omnichannel',
    order: 3,
    title: 'Bandeja Omnicanal WhatsApp & Webmail',
    category: 'Comunicación',
    description: 'Consola unificada de mensajería para WhatsApp Web, Live Chat y Webmail corporativo.',
    migrationFile: '03_omnichannel_messaging.md',
    activeTabTarget: 'whatsapp',
    appSourceId: '2b73f8e5-3bf5-4fa7-ae19-813474eb5895',
    icon: MessageSquare,
    color: 'teal',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Historial unificado de chat', 'Respuestas rápidas y macros', 'Simulador y live testing'],
    docSummary: 'Inbox unificado con soporte para webhooks entrantes de WhatsApp Business Cloud y SMTP.',
  },
  {
    id: 'mod-04-workflows',
    order: 4,
    title: 'Diseñador Visual de Workflows',
    category: 'IA & Automatización',
    description: 'Automatizaciones basadas en eventos del CRM con disparadores y acciones lógicas en cascada.',
    migrationFile: '04_workflow_builder.md',
    activeTabTarget: 'workflows',
    appSourceId: '9fae155b-7b0e-436f-b2aa-ef8cebfe7a35',
    icon: Workflow,
    color: 'indigo',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Disparador por cambio de etapa', 'Auto-asignación round robin', 'Envío de notificaciones webhook'],
    docSummary: 'Motor de eventos y reglas lógicas tipo Zapier embebido para optimizar el ciclo comercial.',
  },
  {
    id: 'mod-05-proposals',
    order: 5,
    title: 'Propuestas en PDF & Firma Digital',
    category: 'Ventas',
    description: 'Generador de presupuestos comerciales ejecutivos con vista previa en PDF y portal de firma.',
    migrationFile: '05_proposal_generator.md',
    activeTabTarget: 'propuestas',
    appSourceId: '8093d5ce-a602-45e0-b6f3-66f8e792e3a1',
    icon: FileCheck,
    color: 'cyan',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Plantillas corporativas en PDF', 'Portal de firma para el cliente', 'Alertas de apertura de cotización'],
    docSummary: 'Pipeline de cotizaciones con trazabilidad de firma y aceptación en línea por el prospecto.',
  },
  {
    id: 'mod-06-copilot',
    order: 6,
    title: 'Copilot de Ventas Gemini Flotante',
    category: 'IA & Automatización',
    description: 'Asistente IA contextual persistente para manejo de objeciones, redacción y tareas rápidas.',
    migrationFile: '06_ai_chat_copilot.md',
    activeTabTarget: 'agenteOS',
    appSourceId: 'e460c865-6182-4a02-91c6-0fa1c6017d1c',
    icon: Bot,
    color: 'purple',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Detección de pantalla activa', 'Generador de copies de WhatsApp', 'Creación instantánea de tareas'],
    docSummary: 'Arquitectura multi-agente asistida por Gemini 2.5 para acelerar la toma de decisiones comerciales.',
  },
  {
    id: 'mod-07-tasks-kanban',
    order: 7,
    title: 'Tablero Kanban de Tareas',
    category: 'Operaciones & ERP',
    description: 'Organización visual de las actividades y seguimientos del equipo de ventas por estado.',
    migrationFile: '07_tasks_kanban_board.md',
    activeTabTarget: 'tasks',
    appSourceId: '13d2cca5-c20a-4308-a64c-692a60321693',
    icon: CheckSquare,
    color: 'amber',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Columnas por estado operativo', 'Filtro por responsable comercial', 'Alertas de vencimiento'],
    docSummary: 'Tablero de asignación ágil de tareas comerciales conectado a las alertas de agenda.',
  },
  {
    id: 'mod-08-bi-dashboard',
    order: 8,
    title: 'Business Intelligence & Forecast',
    category: 'Finanzas & Soporte',
    description: 'Métricas de ingresos recurrentes (MRR/ARR), forecast ponderado de pipeline y reportes ejecutivos.',
    migrationFile: '08_analytics_bi_dashboard.md',
    activeTabTarget: 'analytics',
    appSourceId: 'f2cd5244-e9b7-4f0e-8682-0e2c8c4356f8',
    icon: BarChart3,
    color: 'violet',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Forecast ponderado de pipeline', 'Velocidad de conversión', 'Métricas de productividad de equipo'],
    docSummary: 'Consolidación de métricas de ingresos, proyecciones probabilísticas y rendimiento de asesores.',
  },
  {
    id: 'mod-09-contacts-enrichment',
    order: 9,
    title: 'Directorio B2B & Enriquecimiento',
    category: 'Ventas',
    description: 'Relación jerárquica Empresa-Contactos, importador masivo CSV e historial de interacciones.',
    migrationFile: '09_contacts_enrichment.md',
    activeTabTarget: 'people',
    appSourceId: '2fb77921-7f3f-4047-8d56-4fef383fa37b',
    icon: Users2,
    color: 'blue',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Árbol de contactos por empresa', 'Importación / exportación CSV', 'Registro de cargos y LinkedIn'],
    docSummary: 'Modelo jerárquico de base relacional Empresa-Contactos con enriquecimiento de perfiles.',
  },
  {
    id: 'mod-10-calendar',
    order: 10,
    title: 'Calendario Comercial & Citas',
    category: 'Ventas',
    description: 'Agenda interactiva con vista mensual, semanal y agendamiento directo vinculado a oportunidades.',
    migrationFile: '10_calendar_scheduler.md',
    activeTabTarget: 'calendar',
    appSourceId: '5f0f8123-8234-454a-a069-b237a07c73fb',
    icon: Calendar,
    color: 'rose',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Vistas Mes / Semana / Día', 'Citas vinculadas a Oportunidades', 'Alertas y recordatorios'],
    docSummary: 'Sincronizador de agendas y calendarización de demos con enlaces únicos para clientes.',
  },
  {
    id: 'mod-11-webforms',
    order: 11,
    title: 'Formularios Web Embebidos',
    category: 'Ventas',
    description: 'Generador no-code de formularios de captura de leads con iframe para insertar en cualquier sitio.',
    migrationFile: '11_webforms_lead_capture.md',
    activeTabTarget: 'webDev',
    appSourceId: 'a12b4e78-9844-48ac-b43a-71829411dc31',
    icon: Layers,
    color: 'orange',
    badge: 'Conectado',
    defaultEnabled: true,
    capabilities: ['Generación de iframe y script', 'Captura automática en base de Leads', 'Redirección a WhatsApp'],
    docSummary: 'Lead magnet y constructor visual de formularios para sitios web corporativos y landing pages.',
  },
  {
    id: 'mod-12-email-cadences',
    order: 12,
    title: 'Campañas Masivas & Cadencias',
    category: 'Comunicación',
    description: 'Secuencias de seguimiento escalonadas (Drip Sequences) y plantillas comerciales automatizadas.',
    migrationFile: '12_email_campaigns_cadences.md',
    activeTabTarget: 'campaigns',
    appSourceId: 'b76a401c-66fe-4d7a-a220-438491bb4f10',
    icon: Send,
    color: 'sky',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Plantillas HTML con variables', 'Disparador multietapa', 'Tracking de aperturas'],
    docSummary: 'Cadencias multietapa para prospección en frío y fidelización masiva de clientes.',
  },
  {
    id: 'mod-13-checkout-gateways',
    order: 13,
    title: 'Pasarelas de Cobro & Pay Links',
    category: 'Finanzas & Soporte',
    description: 'Creación de links de pago en ARS/USD (Mercado Pago / Stripe) con autocierre de tratos por webhook.',
    migrationFile: '13_payments_checkout_gateways.md',
    activeTabTarget: 'payments',
    appSourceId: 'cc98101a-ee41-455b-8012-33bfa8e31294',
    icon: CreditCard,
    color: 'emerald',
    badge: '100% Operativo',
    defaultEnabled: true,
    capabilities: ['Generación de links de pago', 'Webhook de confirmación', 'Cobro recurrente de abonos'],
    docSummary: 'Checkout integrado con Mercado Pago y Stripe para cobros inmediatos y suscripciones recurrentes.',
  },
  {
    id: 'mod-14-helpdesk-tickets',
    order: 14,
    title: 'Mesa de Ayuda & Tickets Post-Venta',
    category: 'Finanzas & Soporte',
    description: 'Gestión de incidencias post-venta, temporizadores de SLA y encuestas de satisfacción CSAT.',
    migrationFile: '14_helpdesk_support_tickets.md',
    activeTabTarget: 'clientPortal',
    appSourceId: 'd091722e-131b-419b-a010-09fa44bc8100',
    icon: Headphones,
    color: 'indigo',
    badge: 'Conectado',
    defaultEnabled: true,
    capabilities: ['Bandeja de incidencias con SLA', 'Encuesta CSAT 5 estrellas', 'Historial por cliente'],
    docSummary: 'Soporte al cliente y mesa de ayuda con control de tiempos de resolución y satisfacción.',
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
    defaultEnabled: true,
    capabilities: ['Gestión de SKUs y stock', 'Listas de precios segmentadas', 'Cálculo de márgenes de ganancia'],
    docSummary: 'Inventario de productos y servicios con listas de precios dinámicas para cotizaciones ágiles.',
  },
];

export interface AnalyzedAppItem {
  id: string;
  appId: string;
  order: number;
  title: string;
  role: string;
  url: string;
  docFile: string;
  icon: React.ElementType;
  color: string;
  keyAssets: string[];
  extractionSummary: string;
}

export const ANALYZED_APPS: AnalyzedAppItem[] = [
  {
    id: 'app-01',
    appId: '00d3a74e-d23f-4d55-81c2-e591b8febc1c',
    order: 1,
    title: 'Clientum Master CRM Core & Engine Hub',
    role: 'Plataforma Central, Pipeline Kanban & Radar Maps B2B',
    url: 'https://aistudio.google.com/u/0/apps/00d3a74e-d23f-4d55-81c2-e591b8febc1c',
    docFile: '01_app_00d3a74e_clientum_master_crm.md',
    icon: Boxes,
    color: 'blue',
    keyAssets: [
      'Kanban con Drag & Drop y multi-moneda (USD/ARS)',
      'Radar B2B con Google Maps & Places API',
      'Floating AI Copilot contextual con Gemini 2.5',
      'Generador de propuestas en PDF con firma digital',
      'Panel de control de Ecosistema modular con switchboard',
    ],
    extractionSummary:
      'Núcleo host principal sobre el que convergen todos los módulos y donde se gestiona el pipeline de oportunidades y datos canónicos.',
  },
  {
    id: 'app-02',
    appId: '2fb77921-7f3f-4047-8d56-4fef383fa37b',
    order: 2,
    title: 'Directorio B2B & Enriquecimiento Corporativo',
    role: 'Base Relacional Empresa-Personas & Mapeador CSV',
    url: 'https://aistudio.google.com/u/0/apps/2fb77921-7f3f-4047-8d56-4fef383fa37b',
    docFile: '02_app_2fb77921_directorio_contactos_b2b.md',
    icon: Users2,
    color: 'indigo',
    keyAssets: [
      'Árbol jerárquico 1:N Empresa -> Decisores y Contactos',
      'Importador universal CSV/Excel con PapaParse guiado',
      'Enriquecimiento de perfiles corporativos y LinkedIn',
      'Historial de llamadas, notas y reuniones por persona',
    ],
    extractionSummary:
      'Gestión de cuentas B2B complejas con múltiples decisores, importación masiva de bases desde otros CRMs y scoring de datos de contacto.',
  },
  {
    id: 'app-03',
    appId: '5f0f8123-8234-454a-a069-b237a07c73fb',
    order: 3,
    title: 'Calendario Comercial & Scheduler de Demos',
    role: 'Agenda Comercial & Portal de Reservas Estilo Calendly',
    url: 'https://aistudio.google.com/u/0/apps/5f0f8123-8234-454a-a069-b237a07c73fb',
    docFile: '03_app_5f0f8123_calendario_citas_scheduler.md',
    icon: Calendar,
    color: 'rose',
    keyAssets: [
      'Vistas de Calendario: Mes, Semana, Día y Agenda',
      'Página pública de reserva de citas para clientes (/book/asesor)',
      'Generación de archivos iCal (.ics) y Google Calendar en 1 clic',
      'Métricas de Show-Up Rate y Demos convertidas',
    ],
    extractionSummary:
      'Elimina la fricción para coordinar demos comerciales, con reservas autónomas y sincronización con el calendario personal del vendedor.',
  },
  {
    id: 'app-04',
    appId: '57e7b004-c4d3-42fc-8d79-e4aee8e4deb3',
    order: 4,
    title: 'Lead Generation Engine, Scraper & Forms',
    role: 'Constructor No-Code de Formularios & Ingesta Inbound',
    url: 'https://aistudio.google.com/u/0/apps/57e7b004-c4d3-42fc-8d79-e4aee8e4deb3',
    docFile: '04_app_57e7b004_lead_generation_scraping.md',
    icon: Layers,
    color: 'amber',
    keyAssets: [
      'Constructor visual de formularios embebibles (iframe/script)',
      'Webhook receiver para campañas de Meta Ads y Google Ads',
      'Algoritmo de Lead Scoring predictivo (0-100 pts)',
      'Enrutamiento Round Robin equitativo entre vendedores',
    ],
    extractionSummary:
      'Generación y captura masiva de prospectos, incrustación en sitios externos y calificación automática de intención antes de entrar al pipeline.',
  },
  {
    id: 'app-05',
    appId: '30763786-a711-4f4b-9880-7b32f33a238e',
    order: 5,
    title: 'Facturación AFIP/ARCA, Pagos & ERP Financiero',
    role: 'Facturas Electrónicas Oficiales & Cobros Mercado Pago/Stripe',
    url: 'https://aistudio.google.com/u/0/apps/30763786-a711-4f4b-9880-7b32f33a238e',
    docFile: '05_app_30763786_facturacion_afip_pagos_erp.md',
    icon: CreditCard,
    color: 'emerald',
    keyAssets: [
      'Emisión de Facturas A, B, C con CAE y QR fiscal reglamentario',
      'Generador de Pay Links en ARS/USD (Mercado Pago y Stripe)',
      'Autocierre de tratos en el CRM al acreditarse el pago',
      'Libro de IVA Ventas y reportes para el estudio contable',
    ],
    extractionSummary:
      'Cierre administrativo y fiscal automatizado, vinculando pagos online y facturación electrónica directamente a la oportunidad comercial.',
  },
  {
    id: 'app-06',
    appId: 'd1e9cd41-54e3-42a1-a8d2-b465168ca0d8',
    order: 6,
    title: 'Centro Omnicanal WhatsApp Cloud & Chatbots IA',
    role: 'Inbox de Equipo WhatsApp, Respuestas Rápidas & Bots',
    url: 'https://aistudio.google.com/u/0/apps/d1e9cd41-54e3-42a1-a8d2-b465168ca0d8',
    docFile: '06_app_d1e9cd41_omnicanal_whatsapp_chatbots.md',
    icon: MessageSquare,
    color: 'teal',
    keyAssets: [
      'Bandeja de entrada compartida para WhatsApp Cloud API',
      'Respuestas rápidas (/shortcuts) y plantillas HSM aprobadas',
      'Bot de precalificación 24/7 impulsado por Gemini',
      'Creación de Leads en el CRM directamente desde el chat',
    ],
    extractionSummary:
      'Centralización de las conversaciones de WhatsApp del equipo comercial en una sola consola con trazabilidad completa de cada cliente.',
  },
  {
    id: 'app-07',
    appId: '28da5046-18df-4520-96ee-91698fbc973b',
    order: 7,
    title: 'Workflows No-Code tipo Zapier & BI Forecast',
    role: 'Automatizaciones Visuales, Triggers & Analítica Predictiva',
    url: 'https://aistudio.google.com/u/0/apps/28da5046-18df-4520-96ee-91698fbc973b',
    docFile: '07_app_28da5046_workflows_automatizacion_bi.md',
    icon: Workflow,
    color: 'violet',
    keyAssets: [
      'Diseñador de flujos por nodos (Triggers -> Condiciones -> Acciones)',
      'Dashboard de Forecast ponderado y métricas de MRR/ARR',
      'Velocidad de ventas (Sales Velocity) y Win Rate por asesor',
      'Logs y trazabilidad de ejecuciones automáticas en vivo',
    ],
    extractionSummary:
      'Orquestación de reglas comerciales automatizadas sin código y proyecciones financieras para la toma de decisiones basada en datos.',
  },
];

export const EcosystemHubView: React.FC = () => {
  const { setActiveTab, showToast } = useCRM();

  // Persistencia local de módulos activados
  const [enabledModules, setEnabledModules] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('clientum_ecosystem_modules');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Error reading ecosystem modules state', e);
      }
    }
    const initial: Record<string, boolean> = {};
    ECOSYSTEM_MODULES.forEach((m) => {
      initial[m.id] = m.defaultEnabled;
    });
    return initial;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'docs' | 'apps'>('cards');

  // Modal / Drawer de documentación Markdown
  const [activeDocModal, setActiveDocModal] = useState<{
    isOpen: boolean;
    filename: string;
    title: string;
    content: string;
    loading: boolean;
    folder: 'migrations' | 'apps_analisis';
  }>({
    isOpen: false,
    filename: '',
    title: '',
    content: '',
    loading: false,
    folder: 'migrations',
  });

  const handleToggleModule = (moduleId: string, title: string) => {
    setEnabledModules((prev) => {
      const nextState = { ...prev, [moduleId]: !prev[moduleId] };
      localStorage.setItem('clientum_ecosystem_modules', JSON.stringify(nextState));
      return nextState;
    });
    const isNowActive = !enabledModules[moduleId];
    showToast(
      isNowActive ? `Módulo "${title}" activado en el ecosistema` : `Módulo "${title}" pausado`,
      isNowActive ? 'success' : 'info'
    );
  };

  const handleToggleAll = (enable: boolean) => {
    const nextState: Record<string, boolean> = {};
    ECOSYSTEM_MODULES.forEach((m) => {
      nextState[m.id] = enable;
    });
    setEnabledModules(nextState);
    localStorage.setItem('clientum_ecosystem_modules', JSON.stringify(nextState));
    showToast(
      enable ? 'Todos los 15 módulos han sido activados' : 'Todos los módulos han sido pausados',
      enable ? 'success' : 'info'
    );
  };

  const handleLaunchModule = (module: EcosystemModuleItem) => {
    if (!enabledModules[module.id]) {
      showToast(`Primero activa el interruptor de "${module.title}" para iniciarlo`, 'warning');
      return;
    }
    if (module.activeTabTarget) {
      setActiveTab(module.activeTabTarget);
      showToast(`Abriendo ${module.title}`, 'info');
    } else {
      openDocViewer(module.migrationFile, module.title, 'migrations');
    }
  };

  const openDocViewer = async (filename: string, title: string, folder: 'migrations' | 'apps_analisis' = 'migrations') => {
    setActiveDocModal({
      isOpen: true,
      filename,
      title,
      content: '',
      loading: true,
      folder,
    });

    try {
      const endpoint = folder === 'apps_analisis' ? `/api/apps-analysis/${filename}` : `/api/migrations/${filename}`;
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        setActiveDocModal({
          isOpen: true,
          filename,
          title,
          content: data.content || `# ${title}\n\nDocumento cargado sin contenido adicional.`,
          loading: false,
          folder,
        });
        return;
      }
      throw new Error('Error de lectura en endpoint');
    } catch (e) {
      // Fallback estético local
      const found = ECOSYSTEM_MODULES.find((m) => m.migrationFile === filename);
      const fallbackMd = `# ${title}
      
## 📁 Archivo de Especificación
\`docs/${folder}/${filename}\`

## 📌 Resumen de Capacidad
${found?.description || 'Documentación técnica de migración y análisis de apps de AI Studio.'}

## 🚀 Capacidades Arquitectónicas
${found?.capabilities.map((c, i) => `${i + 1}. **${c}**`).join('\n') || ''}

## 🛠️ Stack Tecnológico
- **Ubicación:** \`docs/${folder}/${filename}\`
- **Estado en Clientum:** 100% Integrado y Operativo
- **Persistencia:** LocalStorage & PostgreSQL Tenant Vault
`;
      setActiveDocModal({
        isOpen: true,
        filename,
        title,
        content: fallbackMd,
        loading: false,
        folder,
      });
    }
  };

  const categories = ['Todas', 'Ventas', 'Operaciones & ERP', 'Comunicación', 'IA & Automatización', 'Finanzas & Soporte'];

  const filteredModules = useMemo(() => {
    return ECOSYSTEM_MODULES.filter((mod) => {
      const matchesCategory = selectedCategory === 'Todas' || mod.category === selectedCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.migrationFile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const activeCount = Object.values(enabledModules).filter(Boolean).length;
  const totalCount = ECOSYSTEM_MODULES.length;
  const progressPercent = Math.round((activeCount / totalCount) * 100);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 text-slate-900 custom-scrollbar">
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8 space-y-6">
        {/* Banner Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-6 md:p-8 text-white shadow-lg border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                <Boxes className="w-3.5 h-3.5 text-blue-400" />
                <span>Ecosistema Master Clientum • 15 Aplicaciones Integradas</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Módulos & Ecosistema
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Panel central de control y orquestación. Activa o desactiva con un interruptor cada uno de los 15 módulos migrados y consulta sus especificaciones en <span className="font-mono text-amber-300 bg-white/10 px-1.5 py-0.5 rounded text-xs">docs/migrations</span>.
              </p>

              {/* Botones de acción masiva */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleToggleAll(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Activar todos ({totalCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleAll(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
                >
                  <ToggleLeft className="w-3.5 h-3.5" />
                  <span>Pausar todos</span>
                </button>
                <button
                  type="button"
                  onClick={() => openDocViewer('README.md', 'Índice Maestro de Migración (README.md)', 'migrations')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs border border-blue-400/30"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>docs/migrations/README.md</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('apps');
                    openDocViewer('README.md', 'Auditoría de 7 Apps AI Studio (README.md)', 'apps_analisis');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs border border-indigo-400/30"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Auditoría 7 Apps AI Studio</span>
                </button>
              </div>
            </div>

            {/* Gauge de Progreso */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 min-w-[250px] text-center shrink-0">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
                <span>Capacidades Operativas</span>
                <span className="text-white font-bold">{activeCount} de {totalCount}</span>
              </div>
              <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-300">
                <span>Estado del switchboard</span>
                <span className="text-emerald-400 font-bold">{progressPercent}% Activo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selector de modo y Filtros */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          {/* Tabs de vista */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'cards'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Módulos ({totalCount})</span>
            </button>
            <button
              onClick={() => setViewMode('docs')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'docs'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>docs/migrations (15)</span>
            </button>
            <button
              onClick={() => setViewMode('apps')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'apps'
                  ? 'bg-white text-indigo-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Auditoría 7 Apps AI Studio</span>
            </button>
          </div>

          {/* Categorías */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Buscador */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, capacidad o doc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Vista A: Cuadrícula con Toggles */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.map((mod) => {
              const Icon = mod.icon;
              const isEnabled = Boolean(enabledModules[mod.id]);

              return (
                <div
                  key={mod.id}
                  id={`ecosystem-card-${mod.id}`}
                  className={`group relative rounded-2xl border bg-white p-5 shadow-2xs transition-all duration-200 flex flex-col justify-between ${
                    isEnabled
                      ? 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                      : 'border-slate-200/60 bg-slate-50/50 opacity-75'
                  }`}
                >
                  <div>
                    {/* Header de la tarjeta */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                            isEnabled
                              ? 'bg-blue-50 text-blue-600 border-blue-200'
                              : 'bg-slate-200 text-slate-500 border-slate-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              #{String(mod.order).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              {mod.category}
                            </span>
                          </div>
                          <h3 className="font-bold text-sm text-slate-900 mt-0.5 group-hover:text-blue-600 transition-colors">
                            {mod.title}
                          </h3>
                        </div>
                      </div>

                      {/* Interruptor (Toggle On/Off) */}
                      <button
                        type="button"
                        onClick={() => handleToggleModule(mod.id, mod.title)}
                        className="cursor-pointer text-slate-400 hover:text-blue-600 transition-colors shrink-0"
                        title={isEnabled ? 'Desactivar módulo' : 'Activar módulo'}
                      >
                        {isEnabled ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">ON</span>
                            <ToggleRight className="w-7 h-7 text-blue-600" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OFF</span>
                            <ToggleLeft className="w-7 h-7 text-slate-300" />
                          </div>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                      {mod.description}
                    </p>

                    {/* Badge del archivo de documentación */}
                    <div className="mb-3">
                      <button
                        type="button"
                        onClick={() => openDocViewer(mod.migrationFile, mod.title)}
                        className="w-full inline-flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-[11px] text-slate-700 hover:text-blue-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="font-mono truncate text-[10px]">
                            docs/migrations/{mod.migrationFile}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-blue-600 shrink-0">
                          Ver Doc
                        </span>
                      </button>
                    </div>

                    {/* Capabilities List */}
                    <div className="space-y-1.5 mb-4">
                      {mod.capabilities.map((cap, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{cap}</span>
                        </div>
                      ))}
                    </div>

                    {/* Indicador de Progreso Visual del Módulo */}
                    <div className="pt-2.5 pb-3 space-y-1.5 border-t border-slate-100">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          Progreso de Migración
                        </span>
                        <span className="font-bold text-slate-800 font-mono">
                          {mod.progressPercentage ?? 100}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isEnabled
                              ? 'bg-gradient-to-r from-blue-500 to-emerald-500'
                              : 'bg-slate-300'
                          }`}
                          style={{ width: `${mod.progressPercentage ?? 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {mod.badge}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleLaunchModule(mod)}
                      disabled={!isEnabled}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        isEnabled
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Lanzar módulo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Vista B: Explorador de Especificaciones docs/migrations */}
        {viewMode === 'docs' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-5 h-5 text-blue-400" />
                <div>
                  <h2 className="font-bold text-sm">Índice de Especificaciones Técnicas (/docs/migrations)</h2>
                  <p className="text-[11px] text-slate-400">15 documentos de arquitectura, modelo de datos y roadmap</p>
                </div>
              </div>
              <button
                onClick={() => openDocViewer('README.md', 'README Maestro de Migración')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Abrir README.md</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredModules.map((mod) => (
                <div
                  key={mod.id}
                  className="p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 border border-blue-200">
                      {String(mod.order).padStart(2, '0')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm text-slate-900">{mod.title}</h3>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          docs/migrations/{mod.migrationFile}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {mod.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {mod.docSummary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleToggleModule(mod.id, mod.title)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-700"
                    >
                      {enabledModules[mod.id] ? (
                        <>
                          <ToggleRight className="w-4 h-4 text-blue-600" />
                          <span>Activo</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4 text-slate-400" />
                          <span>Pausado</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => openDocViewer(mod.migrationFile, mod.title, 'migrations')}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span>Leer Markdown</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vista C: Auditoría de las 7 Apps AI Studio (/docs/apps_analisis) */}
        {viewMode === 'apps' && (
          <div className="space-y-6">
            {/* Banner de Presentación de Auditoría */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-500/20 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-indigo-400/30 flex items-center gap-1">
                    <FolderGit2 className="w-3 h-3" />
                    <span>/docs/apps_analisis/</span>
                  </span>
                  <span className="text-xs text-slate-300">7 Aplicaciones Analizadas</span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Matriz de Arquitectura & Componentes Extraíbles
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cada una de las 7 aplicaciones creadas en Google AI Studio contiene módulos especializados. Consulta el análisis exhaustivo de cada app o ábrela directamente.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => openDocViewer('README.md', 'Índice de Auditoría de Apps AI Studio (README.md)', 'apps_analisis')}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm border border-indigo-400/30"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>Leer README.md Master</span>
                </button>
              </div>
            </div>

            {/* Grid de las 7 Apps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ANALYZED_APPS.map((app) => {
                const IconComponent = app.icon;
                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-5 space-y-3.5">
                      {/* Top Bar de la Card */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 block">
                              App #{app.order}
                            </span>
                            <h3 className="font-bold text-sm text-slate-900 leading-snug">
                              {app.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Rol en el Ecosistema */}
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-700 font-medium leading-relaxed">
                        <strong className="text-slate-900 block text-[10px] uppercase tracking-wider mb-0.5">Rol Especializado:</strong>
                        {app.role}
                      </div>

                      {/* Resumen de Extracción */}
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {app.extractionSummary}
                      </p>

                      {/* Activos y Componentes Clave */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Capacidades a Reutilizar:
                        </span>
                        <ul className="space-y-1">
                          {app.keyAssets.slice(0, 4).map((asset, idx) => (
                            <li key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{asset}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer con Acciones */}
                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => openDocViewer(app.docFile, `Auditoría: ${app.title}`, 'apps_analisis')}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Ver Auditoría (.md)</span>
                      </button>

                      <a
                        href={app.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-200 cursor-pointer transition-colors"
                        title="Abrir Applet en Google AI Studio"
                      >
                        <span>AI Studio</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal / Drawer de Lectura Markdown de docs/migrations */}
      {activeDocModal.isOpen && (
        <div
          id="migration-doc-modal-overlay"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            id="migration-doc-modal-content"
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Header del Modal */}
            <div className="bg-slate-900 p-4 text-white flex items-center justify-between border-b border-slate-800 select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-sm">{activeDocModal.title}</h2>
                  <p className="text-[11px] font-mono text-slate-400">
                    docs/{activeDocModal.folder}/{activeDocModal.filename}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(activeDocModal.content);
                    showToast('Contenido copiado al portapapeles', 'info');
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copiar Markdown"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copiar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDocModal((prev) => ({ ...prev, isOpen: false }))}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Cerrar ventana"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cuerpo del Markdown */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 text-slate-800 custom-scrollbar text-sm leading-relaxed">
              {activeDocModal.loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="text-xs font-medium">Cargando especificación de docs/{activeDocModal.folder}...</span>
                </div>
              ) : (
                <div className="markdown-body prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-p:text-xs prose-li:text-xs prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl">
                  <Markdown>{activeDocModal.content}</Markdown>
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="p-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                <span>Archivo físico sincronizado en el repositorio</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveDocModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

