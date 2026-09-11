# 11. Formularios Web Embebidos & Landing Pages de Captación

## 📌 Origen y Contexto
Extraído de las aplicaciones de generación de leads, páginas de aterrizaje interactivas y formularios de contacto web externos (Lead Magnets, cotizadores online y formularios de captura).

## 🚀 Capacidades a Migrar a Clientum
1. **Generador de Formularios Web No-Code (Form Builder):**
   - Creador visual de campos (Nombre, Empresa, Email, WhatsApp, Presupuesto estimado, Mensaje).
   - Generación de código embebible en 1 línea (`<iframe ...>` o `<script ...>`) para pegar en Webflow, WordPress, Shopify o Landing Pages propias.
2. **Ingesta Inmediata y Routing Automático (Lead Routing):**
   - Cada respuesta enviada por un usuario en la web se inserta al instante en Clientum como nuevo Lead calificado.
   - Asignación por turnos (Round-Robin) o por especialidad de vendedor (según país, volumen de facturación o industria).
3. **Página de Gracias Personalizada y Disparador de Alertas:**
   - Redirección automática a WhatsApp corporativo o enlace de Calendly para agendar reunión en el acto tras enviar el formulario.
   - Notificación de audio y push en el CRM: *"Nuevo lead web recibido de Empresa X"*.

## 🛠️ Stack Tecnológico Propuesto
- **Endpoint:** `/api/public/lead-capture` público protegido por CORS y rate limiting.
- **Frontend Admin:** Configuración de campos activos, colores de marca y mensajes de éxito desde la sección de Configuración de Clientum.
