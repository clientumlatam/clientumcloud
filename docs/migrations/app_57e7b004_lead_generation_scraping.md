# 🎯 Análisis Técnico de Migración: App 04 - Lead Generation, Web Scraping & Forms
**ID de Aplicación de Origen:** `57e7b004-c4d3-42fc-8d79-e4aee8e4deb3`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/57e7b004-c4d3-42fc-8d79-e4aee8e4deb3](https://aistudio.google.com/u/0/apps/57e7b004-c4d3-42fc-8d79-e4aee8e4deb3)  
**Rol en el Ecosistema:** Captación Inbound (Formularios Embebibles & Webhooks), Lead Scoring Predictivo y Distribución Round Robin.  
**Estado de Integración:** Conectado en Form Builder & Webhooks.

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
Ubicada en la etapa inicial del embudo comercial (Top of Funnel - ToFU), esta aplicación asegura que el pipeline de Clientum nunca se quede sin prospectos frescos:
- **Constructor de Formularios No-Code:** Generación de formularios personalizados que cualquier cliente puede incrustar en su sitio web con un simple snippet `<script>` o `<iframe>`.
- **Ingesta Externa por Webhooks:** Recepción de leads en tiempo real desde plataformas publicitarias (Meta Lead Ads, Google Ads, LinkedIn Ads, Zapier).
- **Calificación Previa (Lead Scoring):** Clasificación automática en prospectos Calientes, Tibios o Fríos según variables firmográficas e intención de compra.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Lead Scoring Predictivo (0 a 100 puntos)
Calcula el puntaje de prioridad comercial en el instante exacto en que ingresa el formulario:
```typescript
export function calculateLeadScore(data: {
  email: string;
  phone?: string;
  budgetEstimated?: number;
  industry?: string;
  companySize?: string;
}): { score: number; classification: 'Caliente' | 'Tibio' | 'Frio' } {
  let score = 20; // Base por contacto

  // Dominio corporativo vs gratuito
  const freeEmailProviders = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'live.com'];
  const domain = data.email.split('@')[1]?.toLowerCase() || '';
  if (domain && !freeEmailProviders.includes(domain)) {
    score += 25; // Correo empresarial verificado
  }

  // Teléfono directo o WhatsApp cargado
  if (data.phone && data.phone.trim().length >= 8) {
    score += 15;
  }

  // Presupuesto declarado
  if (data.budgetEstimated && data.budgetEstimated > 2000) {
    score += 25;
  } else if (data.budgetEstimated && data.budgetEstimated > 500) {
    score += 15;
  }

  // Tamaño de empresa
  if (data.companySize === '100+' || data.companySize === 'Enterprise') {
    score += 15;
  } else if (data.companySize === '20-99') {
    score += 10;
  }

  score = Math.min(100, score);
  const classification = score >= 75 ? 'Caliente' : score >= 45 ? 'Tibio' : 'Frio';
  return { score, classification };
}
```

### 2.2. Algoritmo de Distribución Equitativa (Round Robin)
- Asignación balanceada de nuevos prospectos entre el equipo comercial activo:
  1. Identifica qué asesores comerciales tienen habilitada la recepción de leads (`isAvailableForLeads = true`).
  2. Consulta la marca de tiempo del último lead asignado a cada asesor.
  3. Asigna el nuevo contacto al asesor que hace más tiempo no recibe un prospecto.
  4. Dispara una notificación push / email inmediata al asesor asignado para contactar al cliente en menos de 5 minutos (*Golden Window* de ventas).

---

## 3. 🗄️ Modelos de Datos y Esquemas Técnicos

### 3.1. Modelo de Formulario Web (`WebFormDefinition`)
```typescript
export interface WebFormDefinition {
  id: string;
  title: string;
  description?: string;
  targetPipelineStage: string;
  fields: {
    id: string;
    label: string;
    name: string;
    type: 'text' | 'email' | 'phone' | 'select' | 'number' | 'textarea';
    required: boolean;
    options?: string[];
  }[];
  submitButtonText: string;
  themeColor: string;
  successAction: 'message' | 'redirect_whatsapp' | 'redirect_url';
  successRedirectUrl?: string;
  whatsappPresetMessage?: string;
  submissionsCount: number;
  createdAt: string;
}
```

### 3.2. Modelo de Envío de Formulario (`FormSubmission`)
```typescript
export interface FormSubmission {
  id: string;
  formId: string;
  leadId?: string;
  submittedData: Record<string, any>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ipAddress: string;
  leadScore: number;
  assignedAdvisorId: string;
  createdAt: string;
}
```

---

## 4. 🧩 Componentes UI Clave a Adaptar para Clientum

| Componente | Archivo en Clientum | Funcionalidad Adaptada |
|---|---|---|
| `WebFormBuilder` | `/src/components/forms/WebFormsView.tsx` | Diseñador drag-and-drop de formularios con previsualización en vivo desktop/móvil. |
| `FormEmbedSnippetModal` | `/src/components/forms/FormEmbedSnippetModal.tsx` | Ventana con código `<iframe>` y `<script>` listo para copiar con 1 clic. |
| `LeadScoringBadge` | `/src/components/kanban/OpportunityCard.tsx` | Indicador visual de llama 🔥 (Lead Caliente), rayo ⚡ (Tibio) o copo ❄️ (Frío) en cada tarjeta del pipeline. |
| `WebhookInspector` | `/src/components/settings/WebhookSettingsView.tsx` | Visor de payloads entrantes de Meta Ads con visor JSON y botón de prueba. |

---

## 5. 🔌 Endpoints API y Servicios Backend

```http
### Endpoint público para ingesta de formulario
POST /api/webforms/:formId/submit
Content-Type: application/json

{
  "name": "Lucía Morales",
  "email": "lmorales@bodegasur.com",
  "phone": "+5492614553322",
  "company": "Bodega Sur",
  "budget": 3500,
  "utm_source": "google_ads",
  "utm_campaign": "search_b2b"
}

### Webhook genérico de ingesta de leads (Zapier / Make)
POST /api/webhooks/incoming-lead
Authorization: Bearer {clientum_tenant_token}
Content-Type: application/json
```

---

## 6. 🗺️ Mapeo con `project_archive/plan_consolidado_proyecto.md`
- **Fase I (Sección 3.4 Captación desde la web pública):** Formularios conectados al backend, creación automática del lead, almacenamiento de UTMs y deduplicación.
- **Módulos de Migración Derivados:**
  - `11_webforms_lead_capture.md`
  - `12_email_campaigns_cadences.md`
