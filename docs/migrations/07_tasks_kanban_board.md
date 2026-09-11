# ✅ Análisis Técnico de Migración: App 07 - Tablero Kanban de Tareas
**ID de Aplicación de Origen:** `13d2cca5-c20a-4308-a64c-692a60321693`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/13d2cca5-c20a-4308-a64c-692a60321693](https://aistudio.google.com/u/0/apps/13d2cca5-c20a-4308-a64c-692a60321693)  
**Rol en el Ecosistema:** Gestión de Actividades Comerciales, Seguimientos Agendados, Alertas de Vencimiento y Prevención de Tratos Olvidados.  
**Estado de Integración:** 100% Operativo en Clientum (`TasksView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación resuelve la desorganización de los vendedores al gestionar múltiples oportunidades simultáneas. Ofrece un tablero interactivo drag-and-drop donde cada tarea (llamada, reunión, envío de propuesta, cobranza) avanza por columnas de estado (*Pendiente*, *En Progreso*, *Completada*, *Vencida*), vinculada directamente a la oportunidad comercial correspondiente.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Detección de Vencimiento y Priorización Dinámica
Calcula el estado temporal de la tarea respecto a la fecha y hora actual:
```typescript
export function computeTaskUrgency(dueDate: string, dueTime?: string): 'overdue' | 'today' | 'upcoming' {
  const now = new Date();
  const taskDeadline = new Date(dueTime ? `${dueDate}T${dueTime}` : `${dueDate}T23:59:59`);
  
  const diffHours = (taskDeadline.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (diffHours < 0) return 'overdue';
  if (diffHours <= 24) return 'today';
  return 'upcoming';
}
```

### 2.2. Regla de Impacto en Oportunidades Estancadas (*Deal Rotting*)
Si una oportunidad en etapa comercial activa no registra ninguna tarea completada o actividad en los últimos 7 días:
- Se eleva la alerta visual en la tarjeta del Kanban comercial con borde amarillo/rojo (*"Trato sin seguimiento reciente"*).
- El Copilot IA genera una tarea automática recomendada: *"Llamar a [Contacto] para destrabar negociación"*.

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export type TaskType = 'call' | 'email' | 'meeting' | 'whatsapp' | 'proposal' | 'followup';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'cancelled';

export interface CommercialTask {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  assignedTo: string; // Advisor ID o nombre
  opportunityId?: string;
  opportunityTitle?: string;
  contactId?: string;
  contactName?: string;
  completedAt?: string;
  createdAt: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `TaskBoardContainer.tsx` | `/src/components/tasks/TasksView.tsx` | Tablero ágil con 4 columnas funcionales y badges numéricos de cantidad y tareas vencidas. |
| `TaskCardItem.tsx` | Tarjeta en `TasksView.tsx` | Ficha compacta con icono por tipo (teléfono, video, doc), etiqueta de prioridad en color e indicación de cliente. |
| `NewTaskModal.tsx` | `/src/components/tasks/NewTaskModal.tsx` | Formulario rápido con autocompletado de contactos y oportunidades existentes. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El filtrado ágil por responsable comercial (Alex Morgan, Carlos Díaz, etc.).
  - Los contadores de tareas prioritarias en la barra superior.
  - El checkbox de completado rápido con efecto visual de tachado y registro histórico en el contacto.
- **Descartar de la App Base:**
  - Librerías pesadas de diagramas de Gantt con dependencias complejas, manteniendo la interfaz centrada en Kanban rápido y accesible.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Listar tareas comerciales con filtros
GET /api/tasks?status=todo&assignedTo=Alex%20Morgan

### Crear nueva tarea vinculada a oportunidad
POST /api/tasks
Content-Type: application/json

{
  "title": "Enviar contrato firmado por correo",
  "type": "email",
  "priority": "high",
  "dueDate": "2026-09-15",
  "opportunityId": "opp-889"
}

### Actualizar estado de tarea (drag & drop)
PATCH /api/tasks/:id
Content-Type: application/json

{
  "status": "completed"
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase I - CRM Fundamentos (Sección 3.3 Tareas y Actividades):** Control operativo riguroso para eliminar la pérdida de tratos por olvido.
