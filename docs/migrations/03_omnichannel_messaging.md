# 💬 Análisis Técnico de Migración: App 03 - Bandeja Omnicanal WhatsApp & Webmail
**ID de Aplicación de Origen:** `2b73f8e5-3bf5-4fa7-ae19-813474eb5895`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/2b73f8e5-3bf5-4fa7-ae19-813474eb5895](https://aistudio.google.com/u/0/apps/2b73f8e5-3bf5-4fa7-ae19-813474eb5895)  
**Rol en el Ecosistema:** Consola Unificada de Mensajería, Live Chat, Webhooks de Meta WhatsApp Cloud API y Webmail IMAP/SMTP.  
**Estado de Integración:** 100% Operativo en Clientum (`WhatsAppView.tsx` y `WebmailInboxView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
Esta aplicación concentra todas las comunicaciones entrantes y salientes de los prospectos en una interfaz única de 3 paneles tipo WhatsApp Web / Zendesk. Permite a los asesores responder mensajes de WhatsApp, correos electrónicos corporativos y mensajes del formulario web sin alternar entre pestañas externas, manteniendo todo el hilo conversacional auditado en la ficha del contacto.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Normalización Telefónica y Formato E.164
Asegura que cualquier número ingresado en formularios, campañas o chats coincida con el identificador de WhatsApp:
```typescript
export function formatWhatsAppE164(phone: string, defaultCountryCode = '54'): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
  if (!cleaned.startsWith(defaultCountryCode)) {
    cleaned = defaultCountryCode + cleaned;
  }
  // En Argentina, normalizar prefijo móvil 9 tras el 54
  if (cleaned.startsWith('54') && !cleaned.startsWith('549')) {
    cleaned = '549' + cleaned.substring(2);
  }
  return cleaned;
}
```

### 2.2. Ingesta Automática de Leads por Mensaje Entrante
Al recibir un payload de webhook de WhatsApp Cloud API (`messages[0]`):
1. Extrae el número del remitente `from` y el nombre de perfil de WhatsApp `contacts[0].profile.name`.
2. Busca si ya existe una persona registrada con ese número en `people`.
3. Si no existe, crea automáticamente un registro `Person` con estado `'Lead'`, origen `'WhatsApp Inbound'` y dispara una notificación al equipo comercial disponible.

### 2.3. Asistente de Respuestas Sugeridas con IA
Cuando un cliente formula una duda o solicitud de presupuesto, el backend evalúa el último mensaje con Gemini y genera 3 opciones de respuesta:
- *Respuesta Breve y Formal*
- *Respuesta Detallada con Oferta*
- *Respuesta de Agendamiento de Demo*

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'client' | 'advisor' | 'bot';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  mediaUrl?: string;
  mediaType?: 'image' | 'document' | 'audio';
}

export interface WhatsAppConversation {
  id: string;
  clientPhone: string;
  clientName: string;
  assignedAdvisor: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  contactId?: string;
  opportunityId?: string;
  messages: ChatMessage[];
  tags: string[];
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `ChatSideList.tsx` | Columna Izquierda en `WhatsAppView.tsx` | Listado de conversaciones con insignia de no leídos, búsqueda rápida y filtro por asesor. |
| `ChatActiveConversation.tsx` | Columna Central en `WhatsAppView.tsx` | Panel de mensajes en tiempo real con soporte para adjuntos, audios y atajos de teclado. |
| `ContactQuickInfoPanel.tsx` | Columna Derecha en `WhatsAppView.tsx` | Resumen de la empresa del cliente, etapa del pipeline y botón para crear tarea o agendar demo. |
| `WhatsAppSimulatorModal.tsx` | Modal en `WhatsAppView.tsx` | Herramienta de pruebas para simular mensajes entrantes y validar disparadores. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - Consola de mensajería con soporte de plantillas comerciales (`CannedResponses`).
  - Webhooks para recibir mensajes de WhatsApp Cloud API y actualizar el pipeline en tiempo real.
  - Simulador interactivo para onboarding y testing de asesores.
- **Descartar de la App Base:**
  - Servidores pesados de socket bidireccionales en puertos ajenos al 3000; se consolidó en polling eficiente y SSE sobre el servidor Express unificado.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Webhook entrante de Meta WhatsApp Cloud API
POST /api/webhooks/whatsapp
Content-Type: application/json

{
  "entry": [{
    "changes": [{
      "value": {
        "messages": [{
          "from": "5491138948123",
          "text": { "body": "Hola, necesito cotización del plan Enterprise" }
        }]
      }
    }]
  }]
}

### Envío de mensaje saliente a través de WhatsApp Cloud API
POST /api/whatsapp/send
Content-Type: application/json

{
  "to": "5491138948123",
  "text": "Hola Santiago, te adjunto la propuesta solicitada.",
  "conversationId": "conv-4812"
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase II - Integraciones & Canales (Sección 4.1 WhatsApp Business y Omnicanalidad):** Centralización de mensajes y trazabilidad total.
