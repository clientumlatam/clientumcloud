# 12. Generador de Campañas de Email Masivo & Secuencias Comerciales (Outbound Cadences)

## 📌 Origen y Contexto
Extraído de las aplicaciones de email marketing transaccional, automatización de prospección en frío (Cold Emailing) y secuencias multietapa de nutrición comercial.

## 🚀 Capacidades a Migrar a Clientum
1. **Editor de Campañas y Plantillas HTML/Texto Plano:**
   - Plantillas comerciales con variables dinámicas del prospecto (`{{Nombre}}`, `{{Empresa}}`, `{{Cargo}}`).
   - Biblioteca de copys probados para reactivación de contactos inactivos, seguimiento de presupuestos y prospección outbound.
2. **Secuencias de Seguimiento Escalonadas (Drip Sequences):**
   - Paso 1: Email de presentación inicial.
   - Paso 2: Si no responde en 3 días hábiles $\rightarrow$ Enviar seguimiento corto ("Re: presentación").
   - Paso 3: Si abre el email pero no responde $\rightarrow$ Alerta al vendedor para enviar mensaje de WhatsApp.
3. **Métricas de Rendimiento de Campaña:**
   - Tasas de apertura (Open Rate), clics en enlaces (CTR) y tasa de rebote o respuestas registradas en el CRM.

## 🛠️ Stack Tecnológico Propuesto
- **Backend:** Conexión con proveedores de envío transaccional (Resend, SendGrid, Amazon SES o SMTP configurado por el usuario).
- **Tracking:** Pixel transparente de 1x1 y links de redirección segura para medición de aperturas y clics.
