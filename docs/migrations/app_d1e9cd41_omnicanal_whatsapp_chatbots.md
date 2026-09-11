# 💬 Análisis Técnico de Migración: App 06 - Centro Omnicanal WhatsApp & Chatbots IA
**ID de Aplicación de Origen:** `d1e9cd41-54e3-42a1-a8d2-b465168ca0d8`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/d1e9cd41-54e3-42a1-a8d2-b465168ca0d8](https://aistudio.google.com/u/0/apps/d1e9cd41-54e3-42a1-a8d2-b465168ca0d8)  
**Rol en el Ecosistema:** Bandeja de Entrada Unificada (WhatsApp + Webmail), Plantillas HSM, Bot Precalificador con Gemini y Helpdesk.  
**Estado de Integración:** Conectado en WhatsApp View y Centro de Mensajes.

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
En los mercados hispanohablantes, WhatsApp es el canal donde se cierran más del 80% de las ventas B2B. Esta aplicación centraliza todas las conversaciones del equipo en un solo lugar:
- **Shared Team Inbox:** Se acabó el problema de vendedores usando teléfonos privados donde la empresa pierde el historial y el contacto si un asesor renuncia.
- **Integración con Meta Graph API:** Soporte oficial para WhatsApp Cloud API con plantillas pre-aprobadas (HSM) para contactar a clientes fuera de la ventana de 24 horas.
- **Bot de Calificación IA 24/7:** Bot con Gemini que atiende leads en la madrugada o fines de semana, responde preguntas sobre planes y agenda demos sin intervención humana.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Normalización y Creación de Lead desde Conversación Entrante
1. Recepción del webhook de WhatsApp (`entry[0].changes[0].value.messages[0]`).
2. Extracción del número telefónico (`from`) y nombre del remitente (`profile.name`).
3. Normalización del número a formato E.164 (ej. `+54 9 11 4433-2211`).
4. Búsqueda de coincidencia en la base de `people`:
   - Si existe: Adjunta el mensaje entrante a la conversación y actualiza `lastContactedAt`.
   - Si no existe: Crea automáticamente un nuevo `Lead` en la etapa inicial del pipeline, asigna al asesor de guardia y dispara una respuesta automática de bienvenida.

### 2.2. Algoritmo de Generación de Respuesta Sugerida por Gemini
- Analiza los últimos 5 mensajes intercambiados y la etapa de la oportunidad vinculada.
- Genera 3 sugerencias de respuesta rápida con diferente tono:
  - *Opción A (Consultiva):* Pregunta para profundizar en la necesidad.
  - *Opción B (Directa de Cierre):* Propuesta de llamada de 10 minutos con link de agendamiento.
  - *Opción C (Informativa):* Envío de brochure o rango de precios.

---

## 3. 🗄️ Modelos de Datos y Esquemas Técnicos

### 3.1. Modelo de Conversación (`WhatsAppConversation`)
```typescript
export interface WhatsAppConversation {
  id: string;
  phoneNumber: string; // E.164
  contactName: string;
  personId?: string;
  opportunityId?: string;
  companyId?: string;
  assignedAdvisorId: string;
  status: 'Open' | 'Pending' | 'Closed';
  unreadCount: number;
  lastMessageText: string;
  lastMessageTimestamp: string;
  tags: string[]; // ["VIP", "Calificado", "Cotizado"]
  isBotHandling: boolean;
}
```

### 3.2. Modelo de Mensaje (`ChatMessage`)
```typescript
export interface ChatMessage {
  id: string;
  conversationId: string;
  senderType: 'client' | 'advisor' | 'bot';
  senderName: string;
  text: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio' | 'document' | 'video';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  templateName?: string;
  timestamp: string;
}
```

---

## 4. 🧩 Componentes UI Clave a Adaptar para Clientum

| Componente | Archivo en Clientum | Funcionalidad Adaptada |
|---|---|---|
| `WhatsAppView` | `/src/components/whatsapp/WhatsAppView.tsx` | Consola de 3 columnas (Lista de chats $\rightarrow$ Ventana de mensajes $\rightarrow$ Ficha del CRM con acciones). |
| `WhatsAppSimulatorModal` | `/src/components/whatsapp/WhatsAppSimulatorModal.tsx` | Entorno de pruebas interactivas para simular mensajes entrantes de clientes. |
| `CannedResponsesDropdown` | `/src/components/whatsapp/CannedResponsesDropdown.tsx` | Selector de atajos rápidos (`/precio`, `/demo`, `/cuenta`) con variables automáticas. |
| `BotToggleSwitch` | `/src/components/whatsapp/BotToggleSwitch.tsx` | Interruptor para pausar el bot IA y tomar control manual de la conversación. |

---

## 5. 🔌 Endpoints API y Servicios Backend

```http
### Webhook receptor de Meta WhatsApp Cloud API
POST /api/webhooks/whatsapp
X-Hub-Signature-256: sha256=...
Content-Type: application/json

### Envío de mensaje saliente
POST /api/whatsapp/send-message
Content-Type: application/json

{
  "to": "+5491144332211",
  "text": "Hola Javier, te paso la propuesta comercial solicitada en PDF.",
  "mediaUrl": "https://clientum.lat/proposals/prop-102.pdf"
}
```

---

## 6. 🗺️ Mapeo con `project_archive/plan_consolidado_proyecto.md`
- **Fase II - Integraciones & Canales (Prioridad Media):** Conexión de WhatsApp, comunicación unificada y trazabilidad de conversaciones.
- **Módulos de Migración Derivados:**
  - `03_omnichannel_messaging.md`
  - `14_helpdesk_support_tickets.md`
