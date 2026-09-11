# 2. Pasarela de Facturación Electrónica y Órdenes de Compra (ERP Connector)

## 📌 Origen y Contexto
Extraído de las aplicaciones de gestión administrativa, ERP y facturación electrónica (integraciones con AFIP, facturación AFIP/ARCA, Stripe y pasarelas de pago regionales).

## 🚀 Capacidades a Migrar a Clientum
1. **Emisión Automática al Ganar un Trato (Won):**
   - Al mover una oportunidad a la etapa "Ganado", el sistema dispara la creación de una **Orden de Compra / Factura Proforma** con los ítems y precios cotizados.
2. **Gestión de Impuestos y Monedas (ARS / USD / EUR):**
   - Cálculo automático de IVA (21%, 10.5%), percepciones y retenciones según la jurisdicción del cliente.
3. **Control de Cobros y Vencimientos:**
   - Seguimiento del estado de pago (Pendiente, Parcial, Pagado, Vencido) con alertas automáticas al departamento de administración cuando una factura vence.

## 🛠️ Stack Tecnológico Propuesto
- **Backend:** Endpoints `/api/invoices/generate` y `/api/billing/sync` con validación de CUIT/RUT y exportación a PDF (jsPDF / PDFKit).
- **Base de Datos:** Colección `invoices` vinculada por `opportunityId` y `companyId`.
