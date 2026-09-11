# 3. Centro Multicanal de Mensajería Unificada (WhatsApp + Webmail)

## 📌 Origen y Contexto
Extraído de las aplicaciones de mensajería omnicanal, bandejas de correo unificadas y bots de WhatsApp corporativo.

## 🚀 Capacidades a Migrar a Clientum
1. **Bandeja de Entrada Unificada (Unified Inbox):**
   - Una vista de comunicaciones donde el comercial puede ver en una sola línea de tiempo los correos electrónicos recibidos/enviados y los chats de WhatsApp vinculados a una misma Empresa o Contacto.
2. **Plantillas de Mensajes y Disparadores con Gemini:**
   - Sugerencias automáticas de respuesta basadas en el historial de chat y el tono de la conversación.
3. **Registro Automático de Interacciones:**
   - Cada mensaje enviado o recibido se registra automáticamente como una **Actividad** en el timeline del CRM para evitar pérdida de contexto.

## 🛠️ Stack Tecnológico Propuesto
- **Integraciones:** WhatsApp Cloud API / Baileys wrapper y clientes SMTP/IMAP o simulación de buzón corporativo con webhook receptor.
- **UI:** Interfaz de chat de doble panel con indicadores de lectura y estados de entrega.
