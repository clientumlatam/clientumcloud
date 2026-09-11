# 💬 06. Centro Omnicanal de Mensajería, WhatsApp Business API & Chatbots IA
**ID de Aplicación:** `d1e9cd41-54e3-42a1-a8d2-b465168ca0d8`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/d1e9cd41-54e3-42a1-a8d2-b465168ca0d8](https://aistudio.google.com/u/0/apps/d1e9cd41-54e3-42a1-a8d2-b465168ca0d8)  
**Rol en el Ecosistema:** Bandeja Inbox Unificada, WhatsApp Cloud API, Atención Omnicanal y Bots con Gemini.

---

## 🎯 Visión General de la Aplicación

En el mercado latinoamericano, **más del 80% de las transacciones comerciales B2B y B2C se gestionan o coordinan por WhatsApp**. 

Esta aplicación proporciona una **Bandeja Multicanal Compartida (Shared Team Inbox)** para WhatsApp Business Cloud API, eliminando el problema de los comerciales respondiendo desde teléfonos privados sin registro, sin métricas y con riesgo de pérdida de la cartera si un vendedor abandona la empresa.

---

## 💎 Componentes Clave & Código para Reutilizar

### 1. Bandeja Compartida de Mensajes (`OmnichannelInbox`)
* **Consola de Chat Centralizada:**
  - Panel dividido en tres columnas de alta productividad:
    1. *Lista de Conversaciones Activas* con filtro por asesor asignado, no leídos y etiquetas (ej. "Urgente", "Cotizado", "Soporte").
    2. *Ventana de Conversación Principal* con soporte de texto, emojis, notas de voz, imágenes y documentos PDF adjuntos.
    3. *Ficha Lateral del Prospecto* con datos del CRM en tiempo real: etapa en el pipeline, valor estimado, empresa y tareas pendientes.
  - Asignación de chats a miembros del equipo y transferencia de conversaciones con notas internas invisibles para el cliente.

### 2. Respuestas Rápidas & Plantillas Oficiales HSM (`CannedResponsesManager`)
* **Aceleradores de Conversación:**
  - Comandos rápidos de teclado (ej. `/precio`, `/saludo`, `/cuenta-bancaria`, `/link-demo`).
  - Gestor de Plantillas de WhatsApp Aprobadas por Meta (HSM) para iniciar conversaciones fuera de la ventana de servicio de 24 horas.
  - Inserción dinámica de variables personalizadas: `{{nombre_contacto}}`, `{{monto_propuesta}}`, `{{nombre_empresa}}`.

### 3. Agente Bot de Precalificación Asistido por IA (`GeminiSupportBot`)
* **Atención 24/7 sin Pérdida de Leads:**
  - Bot impulsado por Google Gemini configurado con el catálogo y preguntas frecuentes de Clientum.
  - Capacidades del bot:
    - Responder dudas sobre precios, planes y formas de pago.
    - Solicitar el correo electrónico y la empresa para calificar al prospecto.
    - Proponer horarios y agendar una demo en el calendario automáticamente.
    - Derivar la conversación a un vendedor humano en cuanto detecta alta intención de compra.

### 4. Creación y Actualización de Oportunidades desde el Chat (`ChatToDealConverter`)
* **Integración Nativa con el Pipeline:**
  - Cuando un prospecto escribe por primera vez, el sistema permite crear la Oportunidad en el Kanban con 1 solo clic sin salir de la conversación.
  - Las notas tomadas en el chat quedan archivadas en el historial de actividades del CRM.

---

## 🛠️ Stack Tecnológico & Dependencias a Incorporar

- **WhatsApp Cloud API Client:** Módulo de conexión con Meta Graph API (`/v20.0/{phone_number_id}/messages`).
- **Websockets / Polling:** Para actualización instantánea de nuevos mensajes entrantes sin recargar la página.
- **Lucide Icons:** `MessageSquare`, `Send`, `Paperclip`, `Bot`, `UserPlus`, `PhoneCall`, `CheckCheck`.

---

## 🔄 Plan de Integración en Clientum Master (`00d3a74e`)

1. **Integrar en la vista `InboxView` o `WebmailView`:**
   - Crear una pestaña dual o switcher: *"WhatsApp Inbox"* y *"Webmail Corporativo"*.
2. **Botón de WhatsApp en la Ficha de Oportunidad y Contacto:**
   - En cualquier parte donde aparezca un número de teléfono, hacer clic para abrir la conversación dentro del CRM o disparar el template oficial.
3. **Registro Automático de Mensajes en el Timeline del Cliente:**
   - Guardar cada intercambio de chat como una actividad en el historial de la cuenta.
