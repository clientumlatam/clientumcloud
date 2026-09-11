# 🤖 Análisis Técnico de Migración: App 06 - Copilot de Ventas Gemini Flotante
**ID de Aplicación de Origen:** `e460c865-6182-4a02-91c6-0fa1c6017d1c`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/e460c865-6182-4a02-91c6-0fa1c6017d1c](https://aistudio.google.com/u/0/apps/e460c865-6182-4a02-91c6-0fa1c6017d1c)  
**Rol en el Ecosistema:** Asistente IA Contextual Flotante, Manejo de Objeciones, Redacción de Mensajes y Automatización de Tareas Rápidas.  
**Estado de Integración:** 100% Operativo en Clientum (`AICopilotFloating.tsx` y `AgenteOSDashboard.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación dota al vendedor de un copiloto inteligente omnipresente mientras navega por el CRM. Gracias al modelo Gemini 2.5 Flash y a un sistema de captura de contexto en tiempo real, el copiloto conoce exactamente en qué pestaña se encuentra el usuario (ej. Kanban de oportunidades, prospección de mapas, o bandeja de WhatsApp) y adapta sus respuestas y sugerencias de acción a esa pantalla activa.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Inyección Dinámica del Contexto de Pantalla (Context Grounding)
Antes de enviar el prompt del usuario al backend Gemini, el cliente recopila el estado actual de la sesión:
```typescript
export function buildScreenContext(activeTab: string, crmState: any): string {
  switch (activeTab) {
    case 'pipeline':
      return `[CONTEXTO: El vendedor está en el Pipeline Kanban con ${crmState.opportunities.length} oportunidades activas por un valor total de $${crmState.totalPipelineValue} USD.]`;
    case 'whatsapp':
      return `[CONTEXTO: El vendedor tiene abierta la conversación con ${crmState.selectedConversation?.clientName || 'un cliente'} sobre WhatsApp.]`;
    case 'googleMaps':
      return `[CONTEXTO: El vendedor está en el radar de prospección buscando comercios en ${crmState.currentSearchCity || 'su zona'}.]`;
    default:
      return `[CONTEXTO: El vendedor está en el panel principal de Clientum CRM.]`;
  }
}
```

### 2.2. Sistema de Function Calling / Quick Actions
El modelo no solo responde texto, sino que emite intenciones estructuradas que la interfaz ejecuta inmediatamente:
- `CREATE_TASK`: Crea una tarea con fecha y recordatorio.
- `MOVE_OPPORTUNITY`: Cambia la etapa de un trato.
- `DRAFT_WHATSAPP`: Coloca un mensaje pre-redactado listo para enviar.

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionType: 'navigate' | 'create_task' | 'fill_form';
    payload: Record<string, any>;
  }[];
}

export interface CopilotSession {
  sessionId: string;
  advisorId: string;
  messages: CopilotMessage[];
  lastContextTab: string;
  tokenUsage: number;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `FloatingChatWidget.tsx` | `/src/components/copilot/AICopilotFloating.tsx` | Botón flotante animado con panel expandible lateral, historial y chips de sugerencias rápidas. |
| `PromptSuggestions.tsx` | Chips en `AICopilotFloating.tsx` | Accesos de 1 clic: *"¿Cómo rebato 'está muy caro'?"*, *"Redactar seguimiento por WhatsApp"*, *"Resumen del día"*. |
| `AgenteOSWorkspace.tsx` | `/src/components/ai/AgenteOSDashboard.tsx` | Consola analítica completa de agentes especializados (SDR Bot, Closer Bot, Cobranzas Bot). |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El botón flotante persistente disponible en toda la aplicación.
  - La conexión segura con `@google/genai` en el servidor Node.js sin exponer la API Key.
  - La ejecución de acciones rápidas sobre el estado local de React (`CRMContext`).
- **Descartar de la App Base:**
  - Streaming por WebSockets no estándar; se utilizó SSE (`text/event-stream`) estándar o llamadas JSON rápidas optimizadas con Gemini 2.5 Flash (<600ms de latencia).

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Consulta conversacional al Copilot con contexto de CRM
POST /api/ai/copilot-chat
Content-Type: application/json

{
  "prompt": "¿Qué argumento puedo darle a una empresa de logística que duda entre Clientum y una planilla Excel?",
  "activeTab": "googleMaps",
  "selectedLeadName": "Transportes San Martín SRL"
}

### Generación asistida de mensaje comercial
POST /api/ai/draft-message
Content-Type: application/json

{
  "channel": "whatsapp",
  "clientName": "Romina",
  "objective": "reactivacion_seguimiento",
  "tone": "profesional_cercano"
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase I y II - Asistencia Inteligente y Agente OS:** Empoderamiento de los asesores con IA generativa de Google para acelerar conversiones.
