# 💳 05. Facturación Electrónica AFIP/ARCA, Pasarelas de Cobro & ERP Financiero
**ID de Aplicación:** `30763786-a711-4f4b-9880-7b32f33a238e`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/30763786-a711-4f4b-9880-7b32f33a238e](https://aistudio.google.com/u/0/apps/30763786-a711-4f4b-9880-7b32f33a238e)  
**Rol en el Ecosistema:** Cierre Financiero, Facturación Fiscal Electrónica y Recaudación Digital de Ventas.

---

## 🎯 Visión General de la Aplicación

Esta aplicación es el puente definitivo entre **el embudo comercial y la administración contable**. Permite que un trato cerrado en el CRM no requiera procesos manuales de facturación ni reclamos de transferencias bancarias:
1. **Emite comprobantes electrónicos fiscales oficiales** (AFIP en Argentina, adaptable a DIAN/SAT regionalmente).
2. **Genera links de pago inmediatos** (Mercado Pago y Stripe) con cálculo de impuestos e intereses.
3. **Autocierra oportunidades** al confirmarse la acreditación del pago mediante webhooks bancarios.

---

## 💎 Componentes Clave & Código para Reutilizar

### 1. Conector Fiscal AFIP / ARCA (`AfipInvoiceGenerator`)
* **Emisión de Comprobantes Oficiales en Línea:**
  - Soporte completo para los tipos de factura reglamentarios:
    - **Factura A** (con discriminación de IVA 21%, 10.5% y percepciones para Responsables Inscriptos).
    - **Factura B** (Consumidor Final y Monotributo).
    - **Factura C** (Prestación de servicios para Monotributistas).
    - **Notas de Crédito y Débito**.
  - Obtención y estampado del **CAE** (Código de Autorización Electrónico) y fecha de vencimiento.
  - Generación obligatoria del **Código QR Fiscal Interactivo** exigido por normativa tributaria.
  - Generación del PDF oficial con membrete corporativo, CUIT, ingresos brutos y detalle de ítems.

### 2. Generador de Enlaces de Pago y Cobro Digital (`PayLinkCheckout`)
* **Integración Mercado Pago & Stripe:**
  - Creación de botones y enlaces de pago en Pesos Argentinos (ARS) y Dólares (USD).
  - Modalidades de cobro:
    - *Pago Único de Contado o Cuotas sin interés.*
    - *Suscripciones y Abonos Mensuales Recurrentes (Débito automático en tarjeta).*
  - Envío automático del link de pago al cliente por WhatsApp o Email desde la misma ficha del trato.
  - Página de Checkout pública optimizada para dispositivos móviles con soporte para tarjetas de crédito, débito y dinero en cuenta.

### 3. Conciliación y Autocierre de Pipeline por Webhook (`PaymentWebhookAutomator`)
* **Cierre Automático sin Intervención Humana:**
  - Cuando la pasarela de pago confirma el estado `approved` o `paid`:
    - Cambia automáticamente la Oportunidad en el CRM a **"Cerrada Ganada"**.
    - Emite automáticamente la Factura Electrónica y la adjunta a la ficha del cliente.
    - Notifica al asesor comercial responsable y al canal interno de ventas.
    - Habilita el acceso al producto o servicio vendido.

### 4. Libro de IVA Ventas y Reporte Impositivo (`TaxReportExporter`)
* **Módulo para el Estudio Contable:**
  - Exportación con un clic del Libro de IVA Ventas en formato Excel y TXT según el régimen de información de compras y ventas de AFIP (Régimen CITI / Libro IVA Digital).
  - Totalizadores de ventas netas gravadas, IVA débito fiscal, ventas exentas y retenciones sufridas.

---

## 🛠️ Stack Tecnológico & Dependencias a Incorporar

- **QR Code Generator:** `qrcode` o utilidades SVG ligeras para dibujar el QR fiscal oficial de AFIP.
- **Mercado Pago SDK:** `mercadopago` o llamadas REST directas al endpoint `/v1/checkout/preferences`.
- **Stripe SDK:** `@stripe/stripe-js` y llamadas seguras en backend a `/api/stripe/create-checkout-session`.
- **PDF Generation:** Motor de impresión HTML-to-Canvas / jsPDF para exportación de comprobantes.

---

## 🔄 Plan de Integración en Clientum Master (`00d3a74e`)

1. **Reemplazar el simulador en la vista `FacturacionView` y `PaymentsView`:**
   - Conectar la pantalla existente con la lógica real de cálculo impositivo y generación de CAE.
2. **Acción "Generar Link de Pago" en el detalle de la Oportunidad:**
   - Agregar un botón accesible en cada tarjeta del Kanban para emitir el cobro en 10 segundos.
3. **Pestaña "Finanzas & Facturación" en la ficha de cada Empresa:**
   - Ver el historial completo de facturas emitidas y saldos pendientes de cada cuenta.
