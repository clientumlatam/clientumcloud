# 📁 Índice Maestro de Migración & Hoja de Ruta (Clientum CRM Master Architecture)

Este directorio documenta el inventario completo y el análisis técnico exhaustivo de migración hacia **Clientum CRM**, integrando la información técnica de las 15 aplicaciones de origen del ecosistema, articuladas con `project_archive/plan_consolidado_proyecto.md`.

---

## 🏛️ 1. Las 15 Aplicaciones de Origen Analizadas (Documentación Técnica)

Cada uno de los 15 archivos Markdown documenta:
1. Identificador único de Google AI Studio y enlace de acceso directo.
2. Lógica de negocio y algoritmos a extraer (fórmulas, heurísticas y validaciones).
3. Modelos y estructuras de datos canónicas en TypeScript.
4. Componentes UI de la app origen y su adaptación para ClientumCRM.
5. Definición de qué partes adaptar y qué descartar para optimizar el desarrollo.
6. Endpoints y contratos API `/api/*`.
7. Mapeo con las fases del plan consolidado de proyecto.

| # | Archivo de Análisis | ID de App Origen | Nombre & Rol en el Ecosistema | Estado en Clientum |
|---|---|---|---|---|
| **01** | [`01_google_maps_prospecting.md`](./01_google_maps_prospecting.md) | `00d3a74e-d23f-4d55-81c2-e591b8febc1c` | **Prospección B2B Google Maps**: Radar cartográfico, scoring de comercios y exportación masiva a pipeline | 100% Operativo |
| **02** | [`02_erp_billing.md`](./02_erp_billing.md) | `7ca3102c-db18-47ee-84ec-6b2c45167c13` | **Facturación & ERP Connector**: Emisión AFIP/ARCA, comprobantes A/B/C, CAE y QR fiscal RG 4291 | 100% Operativo |
| **03** | [`03_omnichannel_messaging.md`](./03_omnichannel_messaging.md) | `2b73f8e5-3bf5-4fa7-ae19-813474eb5895` | **Bandeja Omnicanal WhatsApp & Webmail**: Meta Cloud API, formato E.164, bandeja unificada y live testing | 100% Operativo |
| **04** | [`04_workflow_builder.md`](./04_workflow_builder.md) | `9fae155b-7b0e-436f-b2aa-ef8cebfe7a35` | **Diseñador Visual de Workflows**: Motor ECA, disparadores de etapas, round-robin y webhooks en cascada | 100% Operativo |
| **05** | [`05_proposal_generator.md`](./05_proposal_generator.md) | `8093d5ce-a602-45e0-b6f3-66f8e792e3a1` | **Propuestas en PDF & Firma Digital**: Cotizaciones ejecutivas, portal público `/firmar/:id` y hash SHA-256 | 100% Operativo |
| **06** | [`06_ai_chat_copilot.md`](./06_ai_chat_copilot.md) | `e460c865-6182-4a02-91c6-0fa1c6017d1c` | **Copilot de Ventas Gemini Flotante**: Inyección contextual de pantalla, manejo de objeciones y tareas rápidas | 100% Operativo |
| **07** | [`07_tasks_kanban_board.md`](./07_tasks_kanban_board.md) | `13d2cca5-c20a-4308-a64c-692a60321693` | **Tablero Kanban de Tareas**: Seguimientos operativos por estado, alertas de vencimiento y deal rotting | 100% Operativo |
| **08** | [`08_analytics_bi_dashboard.md`](./08_analytics_bi_dashboard.md) | `f2cd5244-e9b7-4f0e-8682-0e2c8c4356f8` | **Business Intelligence & Forecast**: Forecast ponderado de pipeline, Sales Velocity ($V$) y tasa de deserción | 100% Operativo |
| **09** | [`09_contacts_enrichment.md`](./09_contacts_enrichment.md) | `2fb77921-7f3f-4047-8d56-4fef383fa37b` | **Directorio B2B & Enriquecimiento**: Árbol jerárquico Empresa $\to$ Contactos, importador CSV (Levenshtein) | 100% Operativo |
| **10** | [`10_calendar_scheduler.md`](./10_calendar_scheduler.md) | `5f0f8123-8234-454a-a069-b237a07c73fb` | **Calendario Comercial & Citas**: Agenda interactiva, portal público `/book/:asesor` y exportador RFC 5545 | 100% Operativo |
| **11** | [`11_webforms_lead_capture.md`](./11_webforms_lead_capture.md) | `a12b4e78-9844-48ac-b43a-71829411dc31` | **Formularios Web Embebidos**: Generador no-code de iframes, captura de UTMs y Lead Scoring automático | 100% Operativo |
| **12** | [`12_email_campaigns_cadences.md`](./12_email_campaigns_cadences.md) | `b76a401c-66fe-4d7a-a220-438491bb4f10` | **Campañas Masivas & Cadencias**: Secuencias de prospección escalonadas (Drip), variables dinámicas y auto-stop | 100% Operativo |
| **13** | [`13_payments_checkout_gateways.md`](./13_payments_checkout_gateways.md) | `cc98101a-ee41-455b-8012-33bfa8e31294` | **Pasarelas de Cobro & Pay Links**: Links de cobro Mercado Pago (ARS) / Stripe (USD) y autocierre por webhook | 100% Operativo |
| **14** | [`14_helpdesk_support_tickets.md`](./14_helpdesk_support_tickets.md) | `d091722e-131b-419b-a010-09fa44bc8100` | **Mesa de Ayuda & Tickets Post-Venta**: Gestión de incidencias, temporizadores de SLA y encuestas CSAT 5★ | 100% Operativo |
| **15** | [`15_product_catalog_pricing.md`](./15_product_catalog_pricing.md) | `ef90123c-5501-4478-90aa-88f117bc9302` | **Catálogo de Productos & Tarifarios**: Base de SKUs, tarifas segmentadas, cálculo de márgenes y abonos MRR | 100% Operativo |

---

## 🗺️ 2. Alineación Estratégica con las Fases del Proyecto

1. **Fase I - CRM Core & Prospección:**
   - Módulos 01 (Maps), 07 (Tareas), 09 (Contactos B2B), 10 (Calendario), 11 (Formularios Web), 15 (Catálogo).
2. **Fase II - Comunicación, Omnicanalidad & Automatización:**
   - Módulos 03 (WhatsApp & Webmail), 04 (Workflows), 05 (Propuestas PDF), 06 (Copilot Gemini), 12 (Cadencias).
3. **Fase III - ERP, Cobros, Analítica & Post-Venta:**
   - Módulos 02 (Facturación AFIP), 08 (Business Intelligence), 13 (Pasarelas de Pago), 14 (Helpdesk Tickets).
