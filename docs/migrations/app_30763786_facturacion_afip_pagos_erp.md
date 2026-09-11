# 💳 Análisis Técnico de Migración: App 05 - Facturación AFIP/ARCA, Pagos & ERP Financiero
**ID de Aplicación de Origen:** `30763786-a711-4f4b-9880-7b32f33a238e`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/30763786-a711-4f4b-9880-7b32f33a238e](https://aistudio.google.com/u/0/apps/30763786-a711-4f4b-9880-7b32f33a238e)  
**Rol en el Ecosistema:** Cierre Administrativo, Facturación Electrónica Fiscal (CAE/QR), Pasarelas de Pago (Mercado Pago/Stripe) y ERP de Ventas.  
**Estado de Integración:** 100% Operativo en Módulo ERP & Facturación.

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
Esta aplicación conecta el mundo de las ventas con la administración contable de la empresa, eliminando la duplicación manual de datos entre el CRM y los sistemas contables:
- **Facturación Electrónica Oficial:** Integración con AFIP/ARCA (Argentina) con emisión de comprobantes válidos fiscalmente con CAE y QR.
- **Cobro Inmediato con Pasarelas:** Generación de Pay Links y botones de cobro en Pesos (ARS) y Dólares (USD) con acreditación instantánea.
- **Autocierre de Tratos por Webhook:** Cuando el cliente paga mediante Mercado Pago o Stripe, el CRM mueve automáticamente el trato a *"Cerrado Ganado"*, emite la factura y notifica al asesor.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Determinación de Tipo de Factura y Cálculo Fiscal
Reglas impositivas según la condición fiscal del emisor y del receptor:
1. **Emisor Responsable Inscripto:**
   - Si Cliente es Responsable Inscripto $\rightarrow$ **Factura A** (Discrimina IVA al 21% o 10.5% y percepciones).
   - Si Cliente es Consumidor Final, Exento o Monotributo $\rightarrow$ **Factura B** (IVA incluido en el precio final sin discriminar).
2. **Emisor Monotributista:**
   - Para cualquier tipo de cliente $\rightarrow$ **Factura C** (Operación no gravada con IVA).
3. **Cálculo Desglosado:**
   $$\text{SubtotalNeto} = \sum (\text{precioUnitario}_i \times \text{cantidad}_i)$$
   $$\text{MontoIVA} = \text{SubtotalNeto} \times 0.21$$
   $$\text{TotalFactura} = \text{SubtotalNeto} + \text{MontoIVA} + \text{Percepciones}$$

### 2.2. Algoritmo de Generación de QR Fiscal AFIP (Normativa RG 4291)
Construye la URL codificada en base64 con los datos reglamentarios de la factura para renderizar el QR:
```typescript
export function generateAfipQrPayload(invoice: {
  cuitEmisor: number;
  tipoComprobante: number; // 1 = Fac A, 6 = Fac B, 11 = Fac C
  puntoVenta: number;
  numeroComprobante: number;
  importeTotal: number;
  moneda: 'PES' | 'DOL';
  tipoDocReceptor: number; // 80 = CUIT, 96 = DNI
  nroDocReceptor: number;
  cae: string;
  fechaEmision: string; // YYYY-MM-DD
}): string {
  const payloadJson = JSON.stringify({
    ver: 1,
    fecha: invoice.fechaEmision,
    cuit: invoice.cuitEmisor,
    ptoVta: invoice.puntoVenta,
    tipoCmp: invoice.tipoComprobante,
    nroCmp: invoice.numeroComprobante,
    importe: invoice.importeTotal,
    moneda: invoice.moneda,
    ctz: 1,
    tipoDocRec: invoice.tipoDocReceptor,
    nroDocRec: invoice.nroDocReceptor,
    tipoCodAut: 'E',
    codAut: Number(invoice.cae)
  });

  const base64Data = btoa(payloadJson);
  return `https://www.afip.gob.ar/fe/qr/?p=${base64Data}`;
}
```

---

## 3. 🗄️ Modelos de Datos y Esquemas Técnicos

### 3.1. Modelo de Factura Fiscal (`Invoice`)
```typescript
export interface Invoice {
  id: string;
  opportunityId?: string;
  companyId: string;
  invoiceType: 'A' | 'B' | 'C' | 'Proforma' | 'NotaCredito';
  pointOfSale: number;
  invoiceNumber: number;
  caeNumber?: string;
  caeDueDate?: string;
  issueDate: string;
  dueDate: string;
  currency: 'ARS' | 'USD';
  exchangeRate?: number;
  subtotal: number;
  taxAmount: number; // IVA
  totalAmount: number;
  status: 'Borrador' | 'Emitida' | 'Cobrada' | 'Anulada' | 'Vencida';
  paymentGateway?: 'MercadoPago' | 'Stripe' | 'Transferencia' | 'Efectivo';
  paymentTransactionId?: string;
  pdfUrl?: string;
  qrUrl?: string;
  items: {
    sku?: string;
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number; // 21, 10.5, 0
    total: number;
  }[];
}
```

---

## 4. 🧩 Componentes UI Clave a Adaptar para Clientum

| Componente | Archivo en Clientum | Funcionalidad Adaptada |
|---|---|---|
| `ERPInvoicesView` | `/src/components/erp/ERPInvoicesView.tsx` | Tabla completa de facturas emitidas, estados de cobranza, filtros y botón "Nueva Factura". |
| `InvoiceModal` | `/src/components/erp/InvoiceModal.tsx` | Asistente de facturación que carga ítems desde el catálogo, calcula IVA y solicita CAE a AFIP. |
| `PaymentLinkModal` | `/src/components/erp/PaymentLinkModal.tsx` | Generador instantáneo de link de Mercado Pago / Stripe con botón para enviar por WhatsApp. |
| `TaxReportExporter` | `/src/components/erp/TaxReportExporter.tsx` | Exportador de Libro de IVA Ventas en formato Excel/TXT para enviar al contador. |

---

## 5. 🔌 Endpoints API y Servicios Backend

```http
### Emisión de Factura Electrónica
POST /api/invoices/emit-electronic
Content-Type: application/json

{
  "opportunityId": "opp-9921",
  "companyTaxId": "30-71458921-9",
  "invoiceType": "A",
  "items": [
    { "description": "Suscripción Anual Clientum CRM Enterprise", "quantity": 1, "unitPrice": 450000, "taxRate": 21 }
  ]
}

### Webhook de notificación de pago de Mercado Pago
POST /api/webhooks/mercadopago
X-Signature: ts=1672531199,v1=...
Content-Type: application/json
```

---

## 6. 🗺️ Mapeo con `project_archive/plan_consolidado_proyecto.md`
- **Fase III - Sincronización ERP & Portal (Prioridad Estratégica):** Inventario, catálogo, pedidos, pagos, facturación y conciliación.
- **Módulos de Migración Derivados:**
  - `02_erp_billing.md`
  - `13_payments_checkout_gateways.md`
  - `15_product_catalog_pricing.md`
