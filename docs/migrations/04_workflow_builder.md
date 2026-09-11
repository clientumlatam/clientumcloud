# ⚡ Análisis Técnico de Migración: App 04 - Diseñador Visual de Workflows
**ID de Aplicación de Origen:** `9fae155b-7b0e-436f-b2aa-ef8cebfe7a35`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/9fae155b-7b0e-436f-b2aa-ef8cebfe7a35](https://aistudio.google.com/u/0/apps/9fae155b-7b0e-436f-b2aa-ef8cebfe7a35)  
**Rol en el Ecosistema:** Motor No-Code de Automatización por Eventos, Disparadores de Pipeline, Round-Robin y Webhooks.  
**Estado de Integración:** 100% Operativo en Clientum (`WorkflowsView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación provee un motor declarativo tipo Zapier / Make integrado en el CRM. Permite que usuarios sin conocimientos de programación configuren flujos automáticos basados en eventos del ciclo de ventas: cuando un lead se registra, cuando una oportunidad cambia de etapa, o cuando una factura vence sin ser abonada.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Motor de Evaluación de Reglas de Eventos (Event-Condition-Action)
Cada acción en el CRM emite un evento interno (`crm_event`). El motor evalúa las reglas activas:
```typescript
interface CRMEvent {
  type: 'opportunity_stage_changed' | 'lead_created' | 'invoice_paid' | 'task_overdue';
  payload: Record<string, any>;
  timestamp: string;
}

export function evaluateWorkflowRule(rule: WorkflowRule, event: CRMEvent): boolean {
  if (!rule.active) return false;
  if (rule.trigger.type !== event.type) return false;
  
  // Evaluar condiciones lógicas (AND/OR)
  return rule.conditions.every(cond => {
    const val = event.payload[cond.field];
    switch (cond.operator) {
      case 'equals': return val === cond.value;
      case 'greater_than': return Number(val) > Number(cond.value);
      case 'contains': return String(val).toLowerCase().includes(String(cond.value).toLowerCase());
      default: return false;
    }
  });
}
```

### 2.2. Algoritmo de Asignación Round Robin
Distribuye leads equitativamente entre los asesores del equipo para garantizar una respuesta rápida:
```typescript
export function getNextRoundRobinAdvisor(teamMembers: TeamMember[], lastAssignedId?: string): string {
  const activeMembers = teamMembers.filter(m => m.isAvailable && m.role === 'Advisor');
  if (activeMembers.length === 0) return teamMembers[0]?.id || 'admin';
  
  const currentIndex = activeMembers.findIndex(m => m.id === lastAssignedId);
  const nextIndex = (currentIndex + 1) % activeMembers.length;
  return activeMembers[nextIndex].id;
}
```

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
  value: any;
}

export interface WorkflowAction {
  id: string;
  type: 'send_whatsapp' | 'send_email' | 'create_task' | 'change_stage' | 'call_webhook' | 'assign_advisor';
  config: Record<string, any>;
}

export interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'opportunity_stage_changed' | 'lead_created' | 'payment_received';
    config?: Record<string, any>;
  };
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  active: boolean;
  executionsCount: number;
  lastExecutedAt?: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `WorkflowList.tsx` | `/src/components/workflows/WorkflowsView.tsx` | Lista de reglas con interruptores toggle activo/inactivo y métricas de ejecuciones. |
| `RuleBuilderCanvas.tsx` | `/src/components/workflows/RuleBuilderModal.tsx` | Editor en bloques: Disparador (Bloque Verde) $\rightarrow$ Filtros (Bloque Amarillo) $\rightarrow$ Acciones en cascada (Bloques Azules). |
| `ExecutionLogViewer.tsx` | Pestaña de Auditoría en `WorkflowsView.tsx` | Historial de disparos con status `success` o `failed` y tiempo de ejecución en milisegundos. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El editor visual intuitivo de disparadores y acciones comerciales.
  - La cola asíncrona de ejecución para envíos de WhatsApp y asignación de asesores.
  - Los registros de auditoría por regla para depurar flujos.
- **Descartar de la App Base:**
  - Lienzo infinito de nodos tipo Node-RED que complejiza la experiencia en móviles; se optó por un flujo secuencial vertical altamente legible.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Crear o actualizar regla de automatización
POST /api/workflows
Content-Type: application/json

{
  "name": "Alerta Trato Alto Valor",
  "trigger": { "type": "opportunity_stage_changed" },
  "conditions": [{ "field": "amount", "operator": "greater_than", "value": 500000 }],
  "actions": [{ "type": "send_whatsapp", "config": { "template": "alerta_gerencia" } }],
  "active": true
}

### Disparo manual de prueba de regla
POST /api/workflows/:id/test
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase II - Integraciones & Automatización:** Conexión de eventos comerciales con disparos automáticos de correo, WhatsApp y asignación.
