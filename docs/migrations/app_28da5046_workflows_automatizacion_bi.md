# ⚡ Análisis Técnico de Migración: App 07 - Workflows No-Code & Business Intelligence
**ID de Aplicación de Origen:** `28da5046-18df-4520-96ee-91698fbc973b`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/28da5046-18df-4520-96ee-91698fbc973b](https://aistudio.google.com/u/0/apps/28da5046-18df-4520-96ee-91698fbc973b)  
**Rol en el Ecosistema:** Automatización Visual de Procesos Comerciales, Triggers/Acciones, Proyección de Ingresos y BI Avanzado.  
**Estado de Integración:** Conectado en Workflows y Analítica de Negocio.

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
Esta aplicación eleva a Clientum de un simple registro de datos a un **motor inteligente y autónomo de ventas**:
- **Automatizaciones No-Code Estilo Zapier:** Permite a cualquier gerente comercial definir reglas visuales (ej. *"Si un trato pasa a Negociación y vale más de $1,000 USD, enviar alerta al director y crear tarea de seguimiento"*).
- **Business Intelligence y Forecast:** Proyecciones matemáticas de ingresos futuros considerando la velocidad de ventas y la tasa de conversión por etapa.
- **Trazabilidad y Auditoría:** Historial transparente de ejecuciones de reglas para identificar fallos y asegurar que ningún cliente quede desatendido.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Evaluación y Ejecución de Nodos de Workflow
Un workflow se evalúa como un árbol de decisión acíclico dirigido (DAG):
1. **Disparador (Trigger Event):** Se activa tras un evento del sistema (`deal.stage_changed`, `lead.created`, `invoice.overdue`).
2. **Evaluación de Condiciones (Filters):** Evalúa un conjunto de predicados booleanos (`AND` / `OR`):
   $$\text{Result} = \bigwedge_{j} (\text{field}_j \text{ op}_j \text{ value}_j)$$
3. **Pila de Acciones en Cascada (Action Queue):** Si la condición es verdadera, encola y ejecuta las acciones con soporte para delays (esperas de N horas/días):
   - `send_email`
   - `send_whatsapp`
   - `create_task`
   - `update_field`
   - `trigger_webhook`

### 2.2. Algoritmo de Forecast de Ingresos Ponderado y Velocidad de Ventas
- **Cálculo de Forecast Mensual:**
  $$\text{Weighted Pipeline} = \sum_{k} \text{DealAmount}_k \times P(\text{Stage}_k)$$
- **Fórmula de Velocidad de Ventas (Sales Velocity):**
  $$V = \frac{\text{Tratos Activos} \times \text{Win Rate (\%)} \times \text{Ticket Promedio (ACV)}}{\text{Duración Promedio del Ciclo en Días}}$$
  Indica cuánto dinero nuevo genera el equipo comercial por día.

---

## 3. 🗄️ Modelos de Datos y Esquemas Técnicos

### 3.1. Modelo de Definición de Workflow (`WorkflowRule`)
```typescript
export interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: {
    eventType: 'deal_created' | 'deal_stage_changed' | 'lead_inbound' | 'payment_confirmed' | 'task_overdue';
    targetStage?: string;
  };
  conditions: {
    field: string;
    operator: 'equals' | 'not_equals' | 'greater_than' | 'contains';
    value: any;
  }[];
  actions: {
    id: string;
    actionType: 'send_whatsapp' | 'send_email' | 'create_task' | 'reassign_deal' | 'call_webhook';
    delayMinutes?: number;
    parameters: Record<string, any>;
  }[];
  executionCount: number;
  lastExecutedAt?: string;
}
```

### 3.2. Modelo de Registro de Auditoría (`WorkflowExecutionLog`)
```typescript
export interface WorkflowExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  triggeredByEntityId: string; // ID del trato o contacto
  status: 'Success' | 'Failed' | 'Partial';
  executionTimeMs: number;
  evaluatedConditions: boolean;
  executedActionsCount: number;
  errorMessage?: string;
  timestamp: string;
}
```

---

## 4. 🧩 Componentes UI Clave a Adaptar para Clientum

| Componente | Archivo en Clientum | Funcionalidad Adaptada |
|---|---|---|
| `WorkflowCanvas` | `/src/components/workflows/WorkflowsView.tsx` | Diseñador visual con bloques de Disparador, Condición y Acciones conectadas por líneas. |
| `BIForecastDashboard` | `/src/components/bi/AnalyticsBIView.tsx` | Gráficos de tendencias con Recharts mostrando el forecast ponderado vs. meta mensual. |
| `SalesVelocityGauge` | `/src/components/bi/SalesVelocityGauge.tsx` | Velocímetro visual que mide la aceleración del pipeline en dólares/día. |
| `ExecutionLogsDrawer` | `/src/components/workflows/ExecutionLogsDrawer.tsx` | Panel lateral con el registro cronológico de reglas disparadas y diagnósticos de error. |

---

## 5. 🔌 Endpoints API y Servicios Backend

```http
### Creación o actualización de regla de workflow
POST /api/workflows
Content-Type: application/json

{
  "name": "Alerta Trato Alto Valor",
  "trigger": { "eventType": "deal_stage_changed", "targetStage": "negotiation" },
  "conditions": [{ "field": "amount", "operator": "greater_than", "value": 5000 }],
  "actions": [
    { "actionType": "create_task", "parameters": { "title": "Llamada de Director de Ventas", "priority": "High" } }
  ]
}

### Consulta de métricas para Business Intelligence
GET /api/analytics/sales-velocity?period=current_quarter
```

---

## 6. 🗺️ Mapeo con `project_archive/plan_consolidado_proyecto.md`
- **Fase I (Sección 3.2 Pipeline de ventas):** Automatizaciones de avance de etapa y registro de motivos de pérdida.
- **Fase II (Sección Integraciones & Canales):** Disparadores automáticos por WhatsApp y correo electrónico.
- **Módulos de Migración Derivados:**
  - `04_workflow_builder.md`
  - `08_analytics_bi_dashboard.md`
