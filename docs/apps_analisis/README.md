# 🌐 Auditoría & Matriz de Integración del Ecosistema de Aplicaciones
**Proyecto:** Clientum CRM Master Platform  
**Entorno:** Google AI Studio Applets Ecosystem  
**Fecha de Análisis:** Septiembre 2026  
**Auditor:** AI Systems Architect & Lead Engineer

---

## 📌 Resumen Ejecutivo

El presente repositorio y su arquitectura comercial se benefician del trabajo previo distribuido en **7 aplicaciones especializadas de Google AI Studio**. Cada una de estas aplicaciones resuelve con profundidad un eslabón crítico de la cadena de valor comercial, desde la prospección en frío y la agenda de citas, hasta la facturación fiscal, la omnicanalidad y la orquestación mediante workflows.

El objetivo de esta carpeta (`/docs/apps_analisis/`) es proveer una **auditoría técnica exhaustiva, módulo por módulo**, detallando:
1. Qué componentes, hooks, vistas y modelos de datos son inmediatamente reutilizables.
2. Cómo se ensamblan dentro del núcleo unificado de **Clientum CRM** (`00d3a74e-d23f-4d55-81c2-e591b8febc1c`).
3. El plan de migración paso a paso con su stack tecnológico y dependencias.

---

## 🗺️ Mapa de las 7 Aplicaciones del Ecosistema

| # | ID de Aplicación | Enlace AI Studio | Nombre / Rol Especializado | Estado en Clientum |
|---|---|---|---|---|
| **01** | `00d3a74e-d23f-4d55-81c2-e591b8febc1c` | [Abrir Applet](https://aistudio.google.com/u/0/apps/00d3a74e-d23f-4d55-81c2-e591b8febc1c) | **Clientum Master CRM Core** (Plataforma Base, Pipeline Kanban & Radar Maps) | 🚀 App Master Activa |
| **02** | `2fb77921-7f3f-4047-8d56-4fef383fa37b` | [Abrir Applet](https://aistudio.google.com/u/0/apps/2fb77921-7f3f-4047-8d56-4fef383fa37b) | **Directorio B2B & Enriquecimiento de Contactos** (Árbol Empresa-Personas) | 🟢 Integrable / Listo |
| **03** | `5f0f8123-8234-454a-a069-b237a07c73fb` | [Abrir Applet](https://aistudio.google.com/u/0/apps/5f0f8123-8234-454a-a069-b237a07c73fb) | **Calendario Comercial & Scheduler de Citas** (Estilo Calendly B2B) | 🟢 Integrable / Listo |
| **04** | `57e7b004-c4d3-42fc-8d79-e4aee8e4deb3` | [Abrir Applet](https://aistudio.google.com/u/0/apps/57e7b004-c4d3-42fc-8d79-e4aee8e4deb3) | **Lead Generation Engine, Scraper & Forms** (Captación & Ingesta Masiva) | 🟢 Integrable / Listo |
| **05** | `30763786-a711-4f4b-9880-7b32f33a238e` | [Abrir Applet](https://aistudio.google.com/u/0/apps/30763786-a711-4f4b-9880-7b32f33a238e) | **Facturación Electrónica AFIP/ARCA, Pagos & ERP** (Mercado Pago / Stripe) | 🟢 Integrable / Listo |
| **06** | `d1e9cd41-54e3-42a1-a8d2-b465168ca0d8` | [Abrir Applet](https://aistudio.google.com/u/0/apps/d1e9cd41-54e3-42a1-a8d2-b465168ca0d8) | **Centro Omnicanal WhatsApp Cloud & Chatbots IA** (Inbox & Mensajería) | 🟢 Integrable / Listo |
| **07** | `28da5046-18df-4520-96ee-91698fbc973b` | [Abrir Applet](https://aistudio.google.com/u/0/apps/28da5046-18df-4520-96ee-91698fbc973b) | **Workflows No-Code tipo Zapier & Analítica BI** (Triggers & Forecast) | 🟢 Integrable / Listo |

---

## 📑 Índice de Documentos Individuales de Análisis

Puedes consultar el análisis profundo y pormenorizado de cada aplicación en sus archivos dedicados:

1. **[`01_app_00d3a74e_clientum_master_crm.md`](./01_app_00d3a74e_clientum_master_crm.md)**:  
   *Análisis del Núcleo Master: Pipeline Kanban con drag-and-drop, Prospección Google Maps con radar en tiempo real, Copilot flotante con Gemini 2.5 y panel de Módulos & Ecosistema.*

2. **[`02_app_2fb77921_directorio_contactos_b2b.md`](./02_app_2fb77921_directorio_contactos_b2b.md)**:  
   *Análisis de Directorio y Enriquecimiento B2B: Relaciones jerárquicas 1:N Empresa $\rightarrow$ Personas, importador universal CSV/Excel con mapeo guiado, enriquecimiento de perfiles corporativos e historial de interacción.*

3. **[`03_app_5f0f8123_calendario_citas_scheduler.md`](./03_app_5f0f8123_calendario_citas_scheduler.md)**:  
   *Análisis de Agenda y Agendamiento: Vistas Mes/Semana/Día, portal público de reserva de citas para prospectos (`/book/asesor`), sincronización con Google Calendar/iCal y alertas pre-reunión.*

4. **[`04_app_57e7b004_lead_generation_scraping.md`](./04_app_57e7b004_lead_generation_scraping.md)**:  
   *Análisis de Captación & Scraping: Formularios web incrustables (iframe/script), webhooks de ingesta, scraping e inspección de dominios web, y algoritmo de Lead Scoring automático.*

5. **[`05_app_30763786_facturacion_afip_pagos_erp.md`](./05_app_30763786_facturacion_afip_pagos_erp.md)**:  
   *Análisis Financiero & ERP: Conector AFIP/ARCA para Facturas A, B, C con CAE y QR fiscal, pasarelas Mercado Pago/Stripe, links de cobro con autocierre de tratos y libro de IVA ventas.*

6. **[`06_app_d1e9cd41_omnicanal_whatsapp_chatbots.md`](./06_app_d1e9cd41_omnicanal_whatsapp_chatbots.md)**:  
   *Análisis de Mensajería Omnicanal: Bandeja unificada WhatsApp Cloud API, respuestas rápidas, plantillas HSM aprobadas, bot de precalificación y creación de tratos desde mensajes entrantes.*

7. **[`07_app_28da5046_workflows_automatizacion_bi.md`](./07_app_28da5046_workflows_automatizacion_bi.md)**:  
   *Análisis de Workflows & BI: Lienzo drag-and-drop de automatizaciones (Triggers $\rightarrow$ Condiciones $\rightarrow$ Acciones), proyecciones MRR/ARR, forecast ponderado de pipeline y análisis de cohorte.*

---

## ⚡ Estrategia de Fusión Recomendada

Para unificar las 7 aplicaciones sin generar deuda técnica ni sobrecargar la experiencia del usuario, se aplica el principio de **Orquestación Modular con Switchboard**:

```
                              ┌────────────────────────────────────────┐
                              │     CLIENTUM MASTER PLATFORM (00d3)    │
                              │  Pipeline | Kanban | Context | Vault   │
                              └───────────────────┬────────────────────┘
                                                  │
         ┌──────────────────┬─────────────────────┼────────────────────┬──────────────────┐
         │                  │                     │                    │                  │
         ▼                  ▼                     ▼                    ▼                  ▼
┌─────────────────┐ ┌───────────────┐ ┌───────────────────────┐ ┌───────────────┐ ┌───────────────┐
│ 02. Directorio  │ │ 03. Scheduler │ │ 04. Lead Generation   │ │ 05. Factura   │ │ 06. WhatsApp  │
│ Contactos (2fb7)│ │ Citas (5f0f)  │ │ & Scraping (57e7)     │ │ & ERP (3076)  │ │ Omnicanal(d1e9│
└─────────────────┘ └───────────────┘ └───────────────────────┘ └───────────────┘ └───────────────┘
                                                  ▲
                                                  │
                                      ┌───────────────────────┐
                                      │ 07. Workflows & BI    │
                                      │ Automatización (28da) │
                                      └───────────────────────┘
```

1. **Fase 1 (Completada):** Consolidación de Google Maps Scraper, Generador de Propuestas con firma y Copilot lateral en la aplicación master `00d3`.
2. **Fase 2 (En curso):** Activación del panel *Módulos & Ecosistema* permitiendo a cada tenant habilitar solo los módulos que utiliza.
3. **Fase 3:** Integración profunda del Calendario Público (`5f0f`), la Facturación AFIP real con certificado digital (`3076`) y el motor de Automatizaciones no-code (`28da`).
