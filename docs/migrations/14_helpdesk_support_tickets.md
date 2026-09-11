# 🎧 Análisis Técnico de Migración: App 14 - Mesa de Ayuda & Tickets Post-Venta
**ID de Aplicación de Origen:** `d091722e-131b-419b-a010-09fa44bc8100`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/d091722e-131b-419b-a010-09fa44bc8100](https://aistudio.google.com/u/0/apps/d091722e-131b-419b-a010-09fa44bc8100)  
**Rol en el Ecosistema:** Atención Post-Venta, Gestión de Incidencias, Control de SLA y Medición de Satisfacción (CSAT).  
**Estado de Integración:** 100% Operativo en Clientum (`ClientPortalView.tsx` y `SupportTicketsTab.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación complementa el ciclo comercial reteniendo a los clientes tras la firma. Centraliza las consultas técnicas, solicitudes de soporte y reclamos de servicio en tickets organizados con tiempos máximos de respuesta (SLA: Service Level Agreement). Evita que los clientes que ya compraron se sientan desatendidos.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Control de SLA y Semáforo de Tiempos
Calcula las horas hábiles transcurridas desde la apertura del ticket y asigna el estado del semáforo:
```typescript
export function computeTicketSLA(createdAt: string, priority: 'low' | 'medium' | 'high' | 'urgent'): { status: 'ok' | 'warning' | 'breached'; hoursLeft: number } {
  const slaMaxHours = { low: 48, medium: 24, high: 8, urgent: 2 }[priority];
  const elapsedHours = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
  const hoursLeft = Math.max(0, slaMaxHours - elapsedHours);

  if (hoursLeft === 0) return { status: 'breached', hoursLeft: 0 };
  if (hoursLeft <= slaMaxHours * 0.25) return { status: 'warning', hoursLeft: Math.round(hoursLeft) };
  return { status: 'ok', hoursLeft: Math.round(hoursLeft) };
}
```

### 2.2. Algoritmo de Cálculo de CSAT (Customer Satisfaction Score)
Al cerrarse el ticket, se envía una encuesta automática de 1 a 5 estrellas:
$$\text{CSAT Score} = \frac{\text{Tickets con 4 o 5 Estrellas}}{\text{Total de Encuestas Respondidas}} \times 100$$

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface SupportTicket {
  id: string;
  code: string; // ej: TCK-8041
  companyId: string;
  companyName: string;
  contactId: string;
  contactName: string;
  subject: string;
  description: string;
  category: 'tecnico' | 'facturacion' | 'onboarding' | 'mejora';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed';
  assignedAgent: string;
  slaHoursLeft: number;
  slaBreached: boolean;
  csatRating?: 1 | 2 | 3 | 4 | 5;
  csatFeedback?: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `TicketsBoard.tsx` | `/src/components/portal/ClientPortalView.tsx` | Bandeja con filtros por estado, prioridad y semáforos visuales de SLA. |
| `TicketDetailChat.tsx` | Modal en `ClientPortalView.tsx` | Hilo de mensajes entre el cliente y el agente de soporte con subida de capturas de pantalla. |
| `CSATRatingWidget.tsx` | Modal público para el cliente | Selector de 5 estrellas con campo de comentario breve. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El historial de tickets visibles en la ficha de la Empresa en el CRM.
  - La alerta a los asesores si un cliente con oportunidad de renovación tiene un ticket abierto.
  - El cálculo automático de CSAT.
- **Descartar de la App Base:**
  - Motores telefónicos IVR complejos que requieren centralitas SIP; la comunicación se apoya en WhatsApp y Webmail.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Crear nuevo ticket de soporte
POST /api/support/tickets
Content-Type: application/json

{
  "companyId": "comp-551",
  "contactId": "pers-109",
  "subject": "Duda en configuración de usuarios",
  "priority": "medium"
}

### Enviar calificación de satisfacción CSAT
POST /api/public/support/tickets/:ticketCode/csat
Content-Type: application/json

{
  "rating": 5,
  "feedback": "Excelente y rápida atención de Alex."
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase III - Retención & Post-Venta:** Fidelización de clientes y prevención de churn mediante atención rápida.
