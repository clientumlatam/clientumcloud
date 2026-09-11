# 🎯 04. Lead Generation Engine, Web Scraping & Captura de Prospectos
**ID de Aplicación:** `57e7b004-c4d3-42fc-8d79-e4aee8e4deb3`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/57e7b004-c4d3-42fc-8d79-e4aee8e4deb3](https://aistudio.google.com/u/0/apps/57e7b004-c4d3-42fc-8d79-e4aee8e4deb3)  
**Rol en el Ecosistema:** Captación Masiva de Prospectos, Constructor No-Code de Formularios y Scoring de Leads.

---

## 🎯 Visión General de la Aplicación

Esta aplicación está enfocada en el **inicio del embudo de ventas (Top of Funnel - ToFU)**. Su propósito es alimentar constantemente el pipeline de ventas con prospectos calificados, combinando dos vertientes:
1. **Captación Inbound:** Formularios web embebibles, popups interactivos y webhooks de integración para recibir leads de pauta publicitaria (Meta Ads, Google Ads) o landing pages.
2. **Prospección Outbound:** Herramientas de extracción e inspección de dominios web corporativos y validación automática de datos de contacto.

---

## 💎 Componentes Clave & Código para Reutilizar

### 1. Constructor Visual No-Code de Formularios (`WebFormBuilder`)
* **Creador de Formularios de Contacto y Cotización:**
  - Selector drag-and-drop de campos: Nombre, Empresa, Email, Teléfono con selector de país, Campo de texto libre, Selector de presupuesto y Carga de archivos.
  - Personalización de estilos: colores corporativos, tipografía, bordes redondeados y texto del botón de envío.
  - Configuración post-envío:
    - Mensaje de agradecimiento en pantalla.
    - Redirección automática a enlace de WhatsApp con mensaje predeterminado.
    - Redirección a URL externa (ej. página de agendamiento o confirmación).
  - Generador de código:
    - Código `<iframe>` listo para incrustar en WordPress, Webflow o Shopify.
    - Snippet JavaScript `<script>` ligero para inyección como widget flotante.

### 2. Motor de Ingesta por Webhook (`LeadWebhookReceiver`)
* **Endpoint de Captura para Zapier / Make / Meta Ads:**
  - Endpoint REST seguro con Token de Autenticación para recibir payloads JSON de leads externos.
  - Normalizador de campos inteligente: transforma `"full_name"`, `"telefono"`, `"whatsapp_number"`, `"company_legal"` a la estructura canónica del CRM.
  - Deduplicación automática: si el lead ya existe por correo o teléfono, agrega la nueva consulta como una actividad en lugar de duplicar la ficha.

### 3. Algoritmo de Lead Scoring Predictivo (`LeadScoringEngine`)
* **Puntuación Automática de Intención (0 a 100 puntos):**
  - Criterios demográficos y firmográficos:
    - *Dominio de correo corporativo (+20 pts) vs correo gratuito gmail/hotmail (+5 pts).*
    - *Presupuesto declarado alto (+30 pts).*
    - *Rubro prioritario / Target ideal ICP (+25 pts).*
  - Criterios de interacción:
    - *Llenó el formulario completo con teléfono (+15 pts).*
    - *Descargó el brochure o propuesta (+10 pts).*
  - Clasificación visual en 3 niveles: 🔥 **Lead Caliente (80-100)**, ⚡ **Tibio (50-79)**, ❄️ **Frío (0-49)**.

### 4. Reglas de Enrutamiento Automático (Round Robin) (`LeadRoutingRules`)
* **Distribución Equitativa de Prospectos:**
  - Asignación automática por turnos entre los asesores comerciales activos.
  - Asignación basada en territorio o rubro (ej. leads de agro al asesor especializado en agro).
  - Alerta inmediata por correo y notificación en la app al comercial asignado.

---

## 🛠️ Stack Tecnológico & Dependencias a Incorporar

- **Generador de Embeds:** Templates de HTML puro encapsulados para el iframe.
- **Validadores:** Expresiones regulares robustas para detección de correos corporativos vs. proveedores públicos (`gmail`, `yahoo`, `hotmail`, `outlook`).
- **Lucide Icons:** `Target`, `Flame`, `Sparkles`, `Code`, `Webhook`, `Sliders`, `ArrowRightLeft`.

---

## 🔄 Plan de Integración en Clientum Master (`00d3a74e`)

1. **Vincular en la sección `webDev` / Formularios Web:**
   - La pestaña actual de desarrollo web puede enriquecerse con este constructor no-code de formularios.
2. **Inspección de Lead Score en el Kanban:**
   - En cada tarjeta de oportunidad del Kanban, mostrar la insignia de fuego (🔥) con el puntaje de Lead Score para que el equipo priorice a los prospectos con mayor probabilidad de cierre.
3. **Webhook de Ingesta en el backend Express (`server.ts`):**
   - Habilitar la ruta `POST /api/webhooks/leads` para conectar campañas de Meta Ads directamente al CRM.
