# 📧 Análisis Técnico de Migración: App 12 - Campañas Masivas & Cadencias
**ID de Aplicación de Origen:** `b76a401c-66fe-4d7a-a220-438491bb4f10`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/b76a401c-66fe-4d7a-a220-438491bb4f10](https://aistudio.google.com/u/0/apps/b76a401c-66fe-4d7a-a220-438491bb4f10)  
**Rol en el Ecosistema:** Automatización de Secuencias de Correo en Frío (Drip Campaigns), Cadencias Multietapa y Medición de Aperturas/Clics.  
**Estado de Integración:** 100% Operativo en Clientum (`CampaignsView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación dota a los SDRs y comerciales de la capacidad de programar secuencias de seguimiento estructuradas (Día 1: Presentación, Día 3: Caso de Éxito, Día 7: Pregunta de Reenganche). Si el cliente responde o agenda una cita, la cadencia se detiene automáticamente para dar paso a la atención humana personalizada.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Interpolación de Variables en Plantillas
Reemplaza etiquetas dinámicas con datos reales del contacto o la empresa:
```typescript
export function renderEmailTemplate(templateHtml: string, context: { person: Person; company?: Company }): string {
  return templateHtml
    .replace(/\{\{\s*nombre\s*\}\}/gi, context.person.firstName)
    .replace(/\{\{\s*apellido\s*\}\}/gi, context.person.lastName)
    .replace(/\{\{\s*empresa\s*\}\}/gi, context.company?.name || 'su empresa')
    .replace(/\{\{\s*cargo\s*\}\}/gi, context.person.jobTitle || 'Colega')
    .replace(/\{\{\s*firma_asesor\s*\}\}/gi, context.person.assignedTo);
}
```

### 2.2. Algoritmo de Detección de Respuestas y Detención Automática (*Auto-Stop on Reply*)
Al recibir un correo entrante o un mensaje de WhatsApp del contacto:
1. Comprueba si el contacto está enrolado en alguna secuencia activa.
2. Si coincide el remitente, actualiza el estado de la cadencia para ese contacto a `'replied_stopped'`.
3. Evita situaciones embarazosas de continuar enviando correos automáticos de seguimiento tras haber recibido una respuesta.

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface CadenceStep {
  stepNumber: number;
  delayDays: number; // Días después del paso anterior
  subject: string;
  bodyHtml: string;
  channel: 'email' | 'whatsapp' | 'task_reminder';
}

export interface EmailCadenceCampaign {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  steps: CadenceStep[];
  enrolledCount: number;
  deliveredCount: number;
  openRatePercentage: number;
  clickRatePercentage: number;
  replyRatePercentage: number;
  createdAt: string;
}

export interface EnrolledContactCadence {
  id: string;
  cadenceId: string;
  contactId: string;
  currentStep: number;
  status: 'active' | 'completed' | 'replied_stopped' | 'unsubscribed';
  nextStepScheduledAt: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `CadenceListView.tsx` | `/src/components/campaigns/CampaignsView.tsx` | Tarjetas de secuencias con barras de progreso de envío y métricas de apertura (Open Rate). |
| `CadenceStepEditor.tsx` | Modal en `CampaignsView.tsx` | Constructor cronológico de pasos con editor WYSIWYG de plantillas y selector de variables. |
| `CampaignAudienceSelector.tsx` | Selector en `CampaignsView.tsx` | Filtrado por etiquetas de leads (*"Google Maps B2B"*, *"Agro"*, *"Inactivos"*). |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El editor de secuencias con retrasos en días laborables (evita envíos de sábado y domingo).
  - La sincronización con el historial del contacto (`Timeline`).
  - El botón de desuscripción de 1 clic para cumplimiento normativo anti-spam.
- **Descartar de la App Base:**
  - Servidores SMTP locales propios que requerían calentamiento de IP de meses; se integró con proveedores de transaccional estándar (Resend / SendGrid / Google Workspace SMTP).

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Lanzar o pausar campaña de cadencias
POST /api/campaigns/:id/toggle-status
Content-Type: application/json

{
  "status": "running"
}

### Enrolar lista de contactos en una secuencia
POST /api/campaigns/:id/enroll-contacts
Content-Type: application/json

{
  "contactIds": ["person-101", "person-102", "person-103"]
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase II - Comunicación & Prospección Automatizada:** Generación continua de oportunidades mediante prospección en frío asistida.
