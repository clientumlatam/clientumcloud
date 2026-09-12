import React from 'react';
import { ActiveTab } from '../types';

export interface RouteMetadata {
  id: ActiveTab;
  path: string;
  label: string;
  category: 'control' | 'ventas' | 'comunicacion' | 'ia' | 'erp' | 'admin';
  icon: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  requiresAuth: boolean;
}

export const ROUTE_REGISTRY: Record<string, RouteMetadata> = {
  // Inicio & Control
  dashboard: {
    id: 'dashboard',
    path: '/dashboard',
    label: 'Resumen Ejecutivo',
    category: 'control',
    icon: 'Home',
    description: 'KPIs en tiempo real, foco diario y semáforo comercial PyME',
    requiresAuth: true,
  },
  ecosystemHub: {
    id: 'ecosystemHub',
    path: '/hub/ecosistema',
    label: 'Unified Control Hub',
    category: 'control',
    icon: 'Boxes',
    description: 'Centro neurálgico de las 15 micro-aplicaciones ClientumOS',
    badge: '15 Apps',
    badgeColor: 'bg-blue-600 text-white font-bold',
    requiresAuth: true,
  },
  analytics: {
    id: 'analytics',
    path: '/analytics/bi',
    label: 'Reportes & BI',
    category: 'control',
    icon: 'BarChart3',
    description: 'Forecast de ventas, embudos de conversión y análisis por vendedor',
    requiresAuth: true,
  },

  // Ventas & Clientes
  opportunities: {
    id: 'opportunities',
    path: '/crm/pipeline',
    label: 'Pipeline de Negocios',
    category: 'ventas',
    icon: 'Briefcase',
    description: 'Gestión visual de oportunidades en 5 etapas con calificación MEDDIC',
    badge: 'Kanban',
    requiresAuth: true,
  },
  people: {
    id: 'people',
    path: '/crm/contactos',
    label: 'Contactos & Decisores',
    category: 'ventas',
    icon: 'Users2',
    description: 'Directorio de personas y contactos clave vinculados a empresas',
    requiresAuth: true,
  },
  companies: {
    id: 'companies',
    path: '/crm/empresas',
    label: 'Empresas & Cuentas',
    category: 'ventas',
    icon: 'Building2',
    description: 'Directorio B2B con validación CUIT, condición IVA y salud de cuenta',
    requiresAuth: true,
  },
  tasks: {
    id: 'tasks',
    path: '/crm/tareas',
    label: 'Actividades & Agenda',
    category: 'ventas',
    icon: 'CheckSquare',
    description: 'Gestor de tareas pendientes, seguimientos y compromisos comerciales',
    requiresAuth: true,
  },
  calendar: {
    id: 'calendar',
    path: '/crm/calendario',
    label: 'Calendario',
    category: 'ventas',
    icon: 'Calendar',
    description: 'Agenda semanal y mensual sincronizada de reuniones',
    requiresAuth: true,
  },
  activityInbox: {
    id: 'activityInbox',
    path: '/crm/actividades',
    label: 'Notas y Llamadas',
    category: 'ventas',
    icon: 'Inbox',
    description: 'Bandeja de bitácora comercial, llamadas y notas de voz',
    requiresAuth: true,
  },
  propuestas: {
    id: 'propuestas',
    path: '/crm/propuestas',
    label: 'Propuestas & Presupuestos',
    category: 'ventas',
    icon: 'FileCheck',
    description: 'Generador de presupuestos comerciales en PDF y cotizaciones',
    badge: 'PDF',
    requiresAuth: true,
  },
  googleMaps: {
    id: 'googleMaps',
    path: '/crm/prospeccion',
    label: 'Prospección Google Maps',
    category: 'ventas',
    icon: 'MapPin',
    description: 'Extractor B2B de comercios y empresas locales con WhatsApp',
    badge: 'Maps',
    requiresAuth: true,
  },

  // Centro de Comunicación
  whatsapp: {
    id: 'whatsapp',
    path: '/communication/whatsapp',
    label: 'Bandeja Omnicanal WhatsApp',
    category: 'comunicacion',
    icon: 'Inbox',
    description: 'Atención en vivo por WhatsApp Business y transcripción de audios',
    badge: 'LIVE',
    badgeColor: 'bg-emerald-600 text-white font-bold',
    requiresAuth: true,
  },
  messages: {
    id: 'messages',
    path: '/communication/mensajes',
    label: 'Mensajes Directos',
    category: 'comunicacion',
    icon: 'MessageSquare',
    description: 'Mensajería interna del equipo comercial',
    requiresAuth: true,
  },
  webmail: {
    id: 'webmail',
    path: '/communication/webmail',
    label: 'Webmail Cloudflare',
    category: 'comunicacion',
    icon: 'Mail',
    description: 'Bandeja corporativa para dominios propios con DNS Cloudflare',
    badge: 'DNS',
    requiresAuth: true,
  },
  chatbot: {
    id: 'chatbot',
    path: '/communication/bots',
    label: 'Bots & Atención Automática',
    category: 'comunicacion',
    icon: 'Bot',
    description: 'Configuración y entrenamiento de respuestas automáticas 24/7',
    requiresAuth: true,
  },
  campaigns: {
    id: 'campaigns',
    path: '/communication/campanas',
    label: 'Campañas Masivas WhatsApp',
    category: 'comunicacion',
    icon: 'Send',
    description: 'Difusión de mensajes con plantillas aprobadas y segmentación',
    requiresAuth: true,
  },

  // IA & Agentes Autónomos
  agenteOS: {
    id: 'agenteOS',
    path: '/ai/agentes',
    label: 'AgenteOS (14 Roles)',
    category: 'ia',
    icon: 'Cpu',
    description: 'Organigrama de 14 agentes de IA ejecutables para tareas PyME',
    badge: '14 IA',
    badgeColor: 'bg-blue-600 text-white font-bold',
    requiresAuth: true,
  },
  aiAssistant: {
    id: 'aiAssistant',
    path: '/ai/copilot',
    label: 'Copilot Gemini 3.8',
    category: 'ia',
    icon: 'Sparkles',
    description: 'Asistente directivo para priorización de tratos y estrategia',
    requiresAuth: true,
  },
  workflows: {
    id: 'workflows',
    path: '/ai/flujos',
    label: 'Automatizaciones & Flujos DAG',
    category: 'ia',
    icon: 'Workflow',
    description: 'Diseñador visual de automatizaciones y disparadores de eventos',
    requiresAuth: true,
  },
  gtmStrategy: {
    id: 'gtmStrategy',
    path: '/ai/estrategia',
    label: 'Estrategias GTM & Copy',
    category: 'ia',
    icon: 'Compass',
    description: 'Generación de propuestas de valor, discursos comerciales y copies',
    requiresAuth: true,
  },

  // ERP & Operaciones PyME
  erp: {
    id: 'erp',
    path: '/erp/facturacion',
    label: 'Facturación AFIP & CAE',
    category: 'erp',
    icon: 'Receipt',
    description: 'Emisión de Facturas electrónicas A, B y C con CAE oficial',
    badge: 'CAE',
    badgeColor: 'bg-blue-600 text-white font-bold',
    requiresAuth: true,
  },
  operations: {
    id: 'operations',
    path: '/erp/operaciones',
    label: 'Operaciones Internas',
    category: 'erp',
    icon: 'FolderKanban',
    description: 'Gestión logística, remitos y seguimiento de entregas',
    requiresAuth: true,
  },
  payments: {
    id: 'payments',
    path: '/erp/cobros',
    label: 'Cobros Mercado Pago & Planes',
    category: 'erp',
    icon: 'CreditCard',
    description: 'Checkout transparente, suscripciones y liquidaciones en ARS',
    requiresAuth: true,
  },
  tiendaDigital: {
    id: 'tiendaDigital',
    path: '/erp/tienda',
    label: 'Tienda Digital WhatsApp',
    category: 'erp',
    icon: 'Store',
    description: 'Catálogo de productos con pedidos directos al chat de WhatsApp',
    badge: 'Catálogo',
    requiresAuth: true,
  },
  campusLMS: {
    id: 'campusLMS',
    path: '/erp/academia',
    label: 'Campus Academia LMS',
    category: 'erp',
    icon: 'GraduationCap',
    description: 'Cursos, onboarding y capacitación para el equipo comercial',
    badge: 'LMS',
    requiresAuth: true,
  },

  // Administración & Sistema
  customObjects: {
    id: 'customObjects',
    path: '/admin/datos',
    label: 'Estructura de Datos',
    category: 'admin',
    icon: 'Database',
    description: 'Twenty CRM Custom Objects, campos a medida y metadatos relacionales',
    requiresAuth: true,
  },
  csvStudio: {
    id: 'csvStudio',
    path: '/admin/csv',
    label: 'Importar / Exportar CSV',
    category: 'admin',
    icon: 'FileSpreadsheet',
    description: 'Carga y descarga masiva de empresas y contactos con mapeo',
    requiresAuth: true,
  },
  domainManager: {
    id: 'domainManager',
    path: '/admin/dominios',
    label: 'Gestor de Dominios & DNS',
    category: 'admin',
    icon: 'Globe',
    description: 'Vinculación de dominios personalizados y registros DNS SSL',
    requiresAuth: true,
  },
  settings: {
    id: 'settings',
    path: '/admin/ajustes',
    label: 'Ajustes de Empresa & AFIP',
    category: 'admin',
    icon: 'Settings',
    description: 'Datos fiscales, certificados digitales, usuarios y preferencias',
    requiresAuth: true,
  },
  erpAvanzado: {
    id: 'erpAvanzado',
    path: '/erp/avanzado',
    label: 'ERP Avanzado (Inventario & Gastos)',
    category: 'erp',
    icon: 'Boxes',
    description: 'Control de stock multialmacén, control de gastos y facturación detallada',
    requiresAuth: true,
  },
  vscrmSuite: {
    id: 'vscrmSuite',
    path: '/erp/vscrm',
    label: 'VS CRM & ERP Suite',
    category: 'erp',
    icon: 'Briefcase',
    description: 'Control de proyectos, registro de horas (time tracking) y finanzas para agencias',
    requiresAuth: true,
  },
  wordpressIntegracion: {
    id: 'wordpressIntegracion',
    path: '/erp/wordpress',
    label: 'WordPress & WooCommerce',
    category: 'erp',
    icon: 'Globe',
    description: 'Sincronización de catálogo, pedidos automáticos y webhooks con WooCommerce',
    requiresAuth: true,
  },
  workspaceIntegrations: {
    id: 'workspaceIntegrations',
    path: '/communication/workspace',
    label: 'Google Workspace & Gmail',
    category: 'comunicacion',
    icon: 'HardDrive',
    description: 'Conexión Drive, plantillas HTML con SMTP propio y agendamiento con Google Meet',
    requiresAuth: true,
  },
  adminConsole: {
    id: 'adminConsole',
    path: '/admin/consola',
    label: 'Consola y Auditoría General',
    category: 'admin',
    icon: 'ShieldAlert',
    description: 'Supervisión ejecutiva de plataforma, rendimiento de operadores y seguridad RBAC',
    requiresAuth: true,
  },
  dashboardDocs: {
    id: 'dashboardDocs',
    path: '/admin/docs',
    label: 'Documentación Dashboard (18 MDs)',
    category: 'admin',
    icon: 'BookOpen',
    description: 'Índice de los 18 módulos canónicos de especificación técnica del Dashboard',
    badge: '18 Docs',
    badgeColor: 'bg-blue-600 text-white font-bold',
    requiresAuth: true,
  },
};

/**
 * Obtener la ruta canónica por ID de tab
 */
export function getRouteByTab(tab: ActiveTab): RouteMetadata | undefined {
  return ROUTE_REGISTRY[tab];
}

/**
 * Obtener el tab canónico a partir de una ruta URL
 */
export function getTabByPath(pathname: string): ActiveTab | null {
  const normalized = pathname.trim().toLowerCase();
  for (const [tabId, route] of Object.entries(ROUTE_REGISTRY)) {
    if (route.path === normalized) {
      return tabId as ActiveTab;
    }
  }
  return null;
}
