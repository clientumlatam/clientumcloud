# 13. Pasarela de Cobros Online, Links de Pago y Suscripciones (Fintech Checkout)

## 📌 Origen y Contexto
Extraído de las aplicaciones de e-commerce B2B, recaudación online, pasarelas de pago (Mercado Pago, Stripe, dLocal) y facturación recurrente de suscripciones/abonos mensuales.

## 🚀 Capacidades a Migrar a Clientum
1. **Generación Instantánea de Enlaces de Pago (Pay Links):**
   - Desde la ficha de la Oportunidad o Cotización, el vendedor puede generar un link de pago con 1 clic por el monto exacto pactado (en ARS, USD o moneda local).
   - El link se puede copiar o enviar directamente por WhatsApp al cliente.
2. **Webhooks de Confirmación y Cierre Automático:**
   - En cuanto el cliente abona con tarjeta de crédito, débito o transferencia a través de la pasarela, el webhook notifica a Clientum:
     - El trato se mueve automáticamente a **Ganado (Won)**.
     - Se crea el comprobante de cobro asociado.
     - Se envía un recibo por email al comprador.
3. **Gestión de Abonos Recurrentes y Retención:**
   - Panel de control de clientes con servicios mensuales activos, fechas de renovación y alertas automáticas de tarjetas próximas a vencer.

## 🛠️ Stack Tecnológico Propuesto
- **Integraciones:** SDK de Mercado Pago Checkout Pro / API de Stripe Checkout Sessions.
- **Endpoints Webhook:** `/api/payments/webhook` con firma de seguridad para procesar transacciones confirmadas en segundo plano.
