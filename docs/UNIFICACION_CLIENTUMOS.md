# Diagnóstico y Plan de Unificación: ClientumOS
**Sistema Operativo Comercial y de Gestión para PyMEs Argentinas**
*Unificación Arquitectónica: ClientumCRM + Remix ClientumOS + Ecosistema Twenty CRM*

---

## 1. Diagnóstico Estructural de Directorios y Repositorios Satélite

En las iteraciones previas y repositorios satélite de Replit/GitHub (`twenty-crm-5-`, `remix-remix-editor-de-brochure-clientumzip22`, `crm-full-google-maps`), la arquitectura se encontraba dispersa en tres raíces conceptuales:
- **`src/components/crm-full`**: Contenía los prototipos de prospección sobre Google Maps B2B, enriquecimiento de leads y extracción de datos comerciales geolocalizados.
- **`src/twenty-crm`**: Módulo experimental derivado del CRM open source *Twenty CRM*, aportando el motor de metadatos, objetos personalizados (*Custom Objects*) y esquemas relacionales.
- **`src/remix-twenty-crm`**: Entorno exportado desde Replit con herramientas de edición de folletos (*brochure builder*), transcripción de audio de WhatsApp vía Whisper/Gemini y bandeja de entrada Cloudflare Webmail.

### Estado Actual de Absorción y Consolidación
En el árbol de directorios canónico de la aplicación, estos módulos han sido analizados e integrados en una arquitectura modular limpia dentro de `src/components/`:
- **Prospección B2B**: Absorbido canónicamente en `src/components/commercial/ModuleProspeccionMaps.tsx` y `CrmFullGoogleMaps.tsx`.
- **Twenty CRM Schemas & Custom Objects**: Absorbido canónicamente en `src/components/custom/CustomObjectsView.tsx` y `src/components/csv/CSVStudioView.tsx`.
- **Comunicaciones & Webmail**: Absorbido canónicamente en `src/components/webmail/WebmailInboxView.tsx` y `src/components/whatsapp/WhatsAppView.tsx`.
- **Ecosistema & Repositorios Hub**: Centralizado en `src/components/workspace/UnifiedControlHub.tsx` y `src/components/settings/EcosystemReposHubTab.tsx`.

---

## 2. Inventario Completo de Rutas Activas en la Aplicación

La aplicación opera bajo un modelo híbrido: **Portal Público Institucional / Comercial** (para adquisición y conversión) y **Shell Privado ClientumOS** (para la gestión operativa autenticada de la PyME).

### A. Rutas del Portal Público (`src/components/public/publicRoutes.ts`)
| Ruta | Finalidad / Vista |
| :--- | :--- |
| `/` | Landing page principal con Hero de alto impacto, 4 pilares y captación de leads |
| `/producto` | Visión general del ecosistema ClientumOS |
| `/producto/dashboard` | Demostración interactiva del Resumen Ejecutivo y KPIs |
| `/producto/crm` | Presentación del CRM 360°, Pipeline Kanban y MEDDIC |
| `/producto/whatsapp-ia` | Automatización de WhatsApp y atención con Gemini |
| `/producto/automatizaciones` | Editor visual de flujos DAG sin código |
| `/producto/marketing` | Campañas masivas, secuencias y copywriter |
| `/producto/seo` | SEO Suite, auditoría On-Page y ranking |
| `/producto/erp` | Facturación AFIP con CAE (Facturas A, B, C) |
| `/producto/bi` | Business Intelligence, cohortes y forecast |
| `/producto/agentes-ia` | Organigrama de 14 Agentes Autónomos con AgenteOS |
| `/producto/integraciones` | Mercado Pago, AFIP, WhatsApp Cloud API, Cloudflare, Gmail |
| `/precios` \| `/planes` | Tabla de precios en ARS con suscripción Mercado Pago |
| `/industrias/*` | 10 Páginas verticales (Agro, Contable, Distribuidoras, Salud, Inmobiliaria, Gastronomía, E-Commerce, B2B, Construcción, Automotor) |
| `/casos` \| `/casos-de-exito` | Casos de éxito y testimonios de PyMEs argentinas |
| `/servicios` \| `/recursos` \| `/blog` | Centro de recursos, guías y artículos |
| `/academia` | Portal de formación y tutoriales |
| `/desarrolladores` \| `/api-docs` | Documentación de API y webhooks |
| `/contacto` \| `/demo` | Formulario de contacto directo con persistencia previa |
| `/tienda` \| `/tienda/central` | Catálogo digital y tienda de aplicaciones del ecosistema |
| `/dominios` | Gestor de dominios personalizados y DNS |
| `/legal` \| `/privacidad` \| `/terminos` | Documentos legales y términos de servicio |

### B. Rutas y Tabs del Shell Privado (`src/types.ts` & `CRMContext.tsx`)
| Identificador de Tab | Ruta Semántica | Vista / Componente Canónico |
| :--- | :--- | :--- |
| `dashboard` | `/dashboard` | `ExecutiveDashboardView.tsx` (KPIs, foco diario, semáforo) |
| `opportunities` | `/crm/pipeline` | `KanbanView.tsx` (Kanban) / `TableView.tsx` (Lista) |
| `companies` | `/crm/empresas` | `CompaniesView.tsx` (Empresas con CUIT y scoring) |
| `people` | `/crm/contactos` | `PeopleView.tsx` (Contactos, WhatsApp y decisores) |
| `tasks` | `/crm/tareas` | `TasksView.tsx` (Tareas operativas y agenda) |
| `calendar` | `/crm/calendario` | `CalendarView.tsx` (Vista mensual/semanal de citas) |
| `activityInbox` | `/crm/actividades` | `ActivityInboxView.tsx` (Llamadas, notas, reuniones) |
| `propuestas` | `/crm/propuestas` | `Propuestas.tsx` (Generador de presupuestos y propuestas PDF) |
| `googleMaps` | `/crm/prospeccion` | `ModuleProspeccionMaps.tsx` (Búsqueda B2B y extracción) |
| `whatsapp` | `/communication/whatsapp` | `WhatsAppView.tsx` (Bandeja omnicanal LIVE) |
| `messages` | `/communication/mensajes` | `MessagesView.tsx` (Mensajería directa) |
| `webmail` | `/communication/webmail` | `WebmailInboxView.tsx` (Bandeja Cloudflare Webmail) |
| `chatbot` | `/communication/bots` | `ChatbotView.tsx` (Configuración de bots de atención) |
| `campaigns` | `/communication/campanas` | `PowerSuiteView.tsx` (defaultModule="campaigns") |
| `agenteOS` | `/ai/agentes` | `AgenteOSView.tsx` (14 roles autónomos ejecutables) |
| `aiAssistant` | `/ai/copilot` | `AICopilotModal.tsx` & Copilot Gemini flotante |
| `workflows` | `/ai/flujos` | `WorkflowsView.tsx` (Automatizaciones DAG) |
| `gtmStrategy` | `/ai/estrategia` | `PowerSuiteView.tsx` (defaultModule="gtm") |
| `erp` | `/erp/facturacion` | `ErpView.tsx` (Facturación electrónica AFIP con CAE) |
| `operations` | `/erp/operaciones` | `OperationsView.tsx` (Gestión de órdenes y entregas) |
| `payments` | `/erp/cobros` | `PlatformBillingView.tsx` (Suscripciones Mercado Pago) |
| `tiendaDigital` | `/erp/tienda` | `TiendaDigitalView.tsx` (Catálogo sincronizado a WhatsApp) |
| `campusLMS` | `/erp/academia` | `CampusLMSView.tsx` (Capacitación del equipo comercial) |
| `analytics` | `/analytics/bi` | `AnalyticsView.tsx` (Reportes comerciales y embudos) |
| `ecosystemHub` | `/hub/ecosistema` | `UnifiedControlHub.tsx` (Control de 15 micro-aplicaciones) |
| `customObjects` | `/admin/datos` | `CustomObjectsView.tsx` (Esquemas Twenty CRM) |
| `csvStudio` | `/admin/csv` | `CSVStudioView.tsx` (Importación y exportación masiva) |
| `domainManager` | `/admin/dominios` | `PublicDomainManagerPage.tsx` (DNS y dominios públicos) |
| `settings` | `/admin/ajustes` | `SettingsView.tsx` (Parámetros PyME, CUIT y usuarios) |

### C. Endpoints de la API Backend Express (`server.ts`)
- `GET /api/health`: Chequeo de salud del servicio y persistencia.
- `POST /api/contacts` & `POST /api/public/contacts`: Captura tolerante a fallos de leads desde el sitio público antes de derivar a WhatsApp.
- `POST /api/newsletter` & `POST /api/public/newsletter`: Suscripción al boletín comercial.
- `POST /api/ai/copilot`: Análisis contextual impulsado por Gemini para priorización de tratos y redacción de propuestas.
- `POST /api/billing/mercadopago/create-preference`: Generación de checkout y suscripciones locales en pesos argentinos.
- `POST /api/billing/mercadopago/webhook`: Confirmación asíncrona de pagos de Mercado Pago.
- `GET/POST /api/system/credentials`: Almacenamiento seguro de credenciales de módulos de terceros.

---

## 3. Comparación: 'ClientumCRM' vs 'Remix ClientumOS' y Detección de Duplicados

| Criterio | ClientumCRM (Base Tradicional) | Remix ClientumOS (Visión Unificada) | Estado de Unificación |
| :--- | :--- | :--- | :--- |
| **Alcance** | CRM relacional centrado en contactos, empresas y Kanban. | Sistema Operativo PyME integral (CRM + WhatsApp + AFIP + IA + Pagos). | **Unificado en ClientumOS** |
| **Identidad Visual** | "Clientum CRM" · Espacio Comercial HQ. | "ClientumOS" · Sistema Operativo PyME. | **Canónico: ClientumOS** |
| **Prospección** | Submódulo dentro de PowerSuite (`mapsProspecting`). | Módulo interactivo directo con Google Maps (`googleMaps`). | **Duplicado resuelto:** Estandarizado en `googleMaps` con `ModuleProspeccionMaps.tsx`. |
| **Catálogo Digital** | `ecommerce` (vista básica de tienda). | `tiendaDigital` (catálogo integrado con WhatsApp). | **Duplicado resuelto:** Consolidado en `tiendaDigital`. |
| **Cobros & Suscripción** | `subscriptions` (tabla de planes estática). | `payments` (integración nativa con Mercado Pago). | **Duplicado resuelto:** Unificado en `payments` con `PlatformBillingView.tsx`. |
| **Centro de Módulos** | `featureHub` (catálogo estático). | `ecosystemHub` (Unified Control Hub interactivo). | **Duplicado resuelto:** Consolidado en `ecosystemHub` (`UnifiedControlHub.tsx`). |
| **Rutas Web Duplicadas** | `/precios` vs `/planes`<br>`/casos` vs `/casos-de-exito`<br>`/about` vs `/nosotros` vs `/empresa`<br>`/partners` vs `/alianzas`<br>`/empleo` vs `/trabajo` | Variantes semánticas registradas en el Route Registry. | **Resuelto:** Unificado en `publicRoutes.ts` mediante mapeo semántico tolerante. |

---

## 4. Diseño del Componente Sidebar Único (Basado en el Prompt Maestro para Replit)

El nuevo `Sidebar` unificado reemplaza las implementaciones fragmentadas previas y establece una **jerarquía estricta de 6 bloques funcionales**:

```
┌─────────────────────────────────────────────────────────┐
│ [Logo Clientum] ClientumOS                              │
│ Sistema Operativo PyME               [+ Nuevo Registro] │
├─────────────────────────────────────────────────────────┤
│ [🔍 Buscar en todo el CRM...                     ⌘K]   │
│ [🌐 Ver Portal Público]                                 │
├─────────────────────────────────────────────────────────┤
│ ▼ INICIO & CONTROL                                      │
│   ├─ Resumen Ejecutivo (KPIs, foco diario, semáforo)    │
│   ├─ Unified Control Hub (15 micro-apps integradas)     │
│   └─ Reportes & BI (Forecast, embudos y métricas)       │
│                                                         │
│ ▼ VENTAS & CLIENTES                                     │
│   ├─ Pipeline de Negocios (Kanban con 4 datos clave)    │
│   │   └─ Lead Scoring MEDDIC                            │
│   ├─ Contactos & Empresas (Directorio PyME con CUIT)    │
│   │   └─ Empresas                                       │
│   ├─ Actividades & Agenda (Tareas pendientes)           │
│   │   ├─ Calendario                                     │
│   │   └─ Notas y llamadas                               │
│   ├─ Propuestas & Presupuestos (Generador PDF)          │
│   └─ Prospección Google Maps (Extracción B2B)           │
│                                                         │
│ ▼ CENTRO DE COMUNICACIÓN                                │
│   ├─ Bandeja Omnicanal WhatsApp (LIVE)                  │
│   │   ├─ Mensajes directos                              │
│   │   └─ Webmail Cloudflare                             │
│   ├─ Bots & Atención Automática (Chatbot 24/7)          │
│   └─ Campañas Masivas WhatsApp (Difusión con plantillas)│
│                                                         │
│ ▼ IA & AGENTES AUTÓNOMOS                                │
│   ├─ AgenteOS (14 Roles IA especializados)              │
│   │   ├─ Copilot Gemini 3.6                             │
│   │   └─ Agente SDR Prospección                         │
│   ├─ Automatizaciones & Flujos DAG                      │
│   └─ Estrategias GTM & Copy                             │
│                                                         │
│ ▼ ERP & OPERACIONES PYME                                │
│   ├─ Facturación AFIP & CAE (Facturas A, B y C)         │
│   │   └─ Operaciones internas                           │
│   ├─ Cobros Mercado Pago & Planes                       │
│   ├─ Tienda Digital WhatsApp (Catálogo de productos)    │
│   └─ Campus Academia LMS (Capacitación continua)        │
│                                                         │
│ ▼ ADMINISTRACIÓN & SISTEMA                              │
│   ├─ Estructura de Datos (Twenty CRM Custom Objects)    │
│   │   └─ Importar / Exportar CSV                        │
│   ├─ Gestor de Dominios & DNS                           │
│   └─ Ajustes de Empresa & AFIP                          │
├─────────────────────────────────────────────────────────┤
│ [✨ Clientum Copilot (Gemini 3.6)]                      │
│ "¿Qué negocios debería priorizar hoy?"                  │
├─────────────────────────────────────────────────────────┤
│ ▼ CUENTAS CLAVE: GAMAN ($180k) · Ferretería ($120k)...  │
├─────────────────────────────────────────────────────────┤
│ [Avatar] Fernando G. · Admin         [☀️/🌙] [⚙️] [🚪] │
└─────────────────────────────────────────────────────────┘
```

### Características Clave de la Arquitectura del Sidebar
1. **Identidad Canónica**: Encabezado con logotipo corporativo, insignia azul `OS` y subtítulo `"Sistema Operativo PyME"`.
2. **Acción Rápida**: Botón de creación inmediata de oportunidades (`+`), buscador global accesible mediante atajo de teclado (`⌘K`) y botón de apertura del portal público.
3. **Tarjeta de Acceso Rápido al Copilot**: Widget de Gemini 3.6 que dispara directamente el análisis del día con las recomendaciones comerciales de impacto prioritario.
4. **Sub-ítems Desplegables**: Cada elemento secundario cuenta con acordeón interactivo y memoria de estado colapsado para maximizar el espacio vertical.
5. **Insignias Vivas**: Notificaciones numéricas en tiempo real (correos de Webmail no leídos, tareas pendientes de hoy, estado `LIVE` de WhatsApp).

---

## 5. Matriz de Componentes: Canónicos, Migración y Legacy

### A. Componentes Canónicos (Conservar y Consolidar)
- `src/components/dashboard/ExecutiveDashboardView.tsx`: Resumen Ejecutivo con los 5 KPIs requeridos ($582k pipeline, $54k cerrado, 32,4% conversión, 27d ciclo, 5 alertas), tareas prioritarias y tratos sin seguimiento.
- `src/components/opportunities/KanbanView.tsx`: Pipeline de 5 etapas con tarjetas de 4 líneas (Empresa + servicio, Monto en ARS, Probabilidad %, Próximo paso + fecha), drag & drop y apertura del RecordDrawer.
- `src/components/layout/Sidebar.tsx`: Sidebar único con las 6 secciones integradas según el diseño de Replit.
- `src/components/layout/Navbar.tsx`: Barra superior con switch de empresa, buscador, alertas de vencimiento y botón de nuevo negocio.
- `src/components/common/RecordDrawer.tsx`: Drawer lateral unificado para visualización y edición rápida de cualquier registro.
- `src/components/commercial/ModuleProspeccionMaps.tsx`: Extractor de prospección B2B sobre Google Maps.
- `src/components/whatsapp/WhatsAppView.tsx`: Bandeja de mensajería omnicanal de WhatsApp.
- `src/components/erp/ErpView.tsx`: Facturación electrónica AFIP con CAE y cuenta corriente.
- `src/components/ai/AgenteOSView.tsx` & `AICopilotModal.tsx`: Organigrama de 14 agentes y Copilot de decisiones.
- `src/components/billing/PlatformBillingView.tsx`: Checkout de suscripciones con Mercado Pago en ARS.
- `src/components/public/PublicSite.tsx`: Sitio público de alta conversión con formulario blindado con guardado en backend antes del redirect a WhatsApp.

### B. Componentes a Migrar / Unificar
- `src/components/power/PowerSuiteView.tsx`: Se mantiene como delegado de módulos auxiliares (MEDDIC, portal, campañas) mientras sus interfaces directas se exponen en las secciones respectivas.
- `src/data/initialData.ts`: Población completa con datos auténticamente locales (GAMAN, Ferretería El Oeste, Distribuidora Patagónica, Corralón Sur, Vinoteca Valle Andino) con CUITs y montos representativos.

### C. Estado Legacy / Deprecado
- Rutas duplicadas de prospección (`mapsProspecting`) quedan redirigidas a `googleMaps`.
- Rutas duplicadas de catálogo (`ecommerce`) quedan consolidadas en `tiendaDigital`.
- Componentes de demostración genéricos de SaaS internacional (Stripe, Linear, Supabase) reemplazados completamente por el stack comercial argentino (AFIP, Mercado Pago, WhatsApp).

---

## 6. Verificación de Compilación y Calidad de Código

El sistema ha sido verificado mediante las herramientas de compilación y análisis estático:
- **Linter (`npm run lint` / `tsc --noEmit`)**: Completado con 0 errores de TypeScript y coincidencia total de rutas en `PublicRoutePath`.
- **Compilación (`vite build`)**: Build de producción exitoso con generación de bundles optimizados.
- **Sincronización Offline**: Cola local persistente con sincronización automática hacia Firebase Firestore cuando la red está disponible.
