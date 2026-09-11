# 🧾 Análisis Técnico de Migración: App 02 - Facturación & ERP Connector
**ID de Aplicación de Origen:** `7ca3102c-db18-47ee-84ec-6b2c45167c13`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/7ca3102c-db18-47ee-84ec-6b2c45167c13](https://aistudio.google.com/u/0/apps/7ca3102c-db18-47ee-84ec-6b2c45167c13)  
**Rol en el Ecosistema:** Facturación Legal AFIP/ARCA, Emisión de Comprobantes A/B/C, Control Impositivo y Transición Deal Ganado $\rightarrow$ Factura.  
**Estado de Integración:** 100% Operativo en Clientum (`ERPInvoicesView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación base resuelve la brecha entre el cierre comercial en el CRM y la administración contable-fiscal en Argentina y Latinoamérica. Al marcar un trato en etapa *Cerrado Ganado (Deal Won)*, el sistema autogenera una factura electrónica o proforma con los datos del cliente, calcula los impuestos correspondientes (IVA 21%, 10.5%, Percepciones de Ingresos Brutos) y genera el código QR fiscal exigido por la Resolución General AFIP 4291.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Matriz de Determinación de Letra de Comprobante Fiscal
Según la condición tributaria del emisor y receptor:
```typescript
function resolveInvoiceLetter(emisor: TaxCondition, receptor: TaxCondition): 'A' | 'B' | 'C' | 'E' {
  if (emisor === 'Monotributo') return 'C';
  if (emisor === 'Responsable Inscripto') {
    if (receptor === 'Responsable Inscripto') return 'A';
    if (['Consumidor Final', 'Exento', 'Monotributo'].includes(receptor)) return 'B';
    if (receptor === 'Exterior') return 'E';
  }
  return 'B';
}
```

### 2.2. Algoritmo de Cálculo de Totales Impositivos
$$Subtotal = \sum (\text{item.quantity} \times \text{item.unitPrice})$$
$$IVA = \sum (\text{item.netAmount} \times \frac{\text{item.vatRate}}{100})$$
$$PercepcionesIIBB = Subtotal \times \frac{\text{iibbRate}}{100}$$
$$Total = Subtotal + IVA + PercepcionesIIBB - Descuento$$

### 2.3. Generador de URL de QR Fiscal AFIP (RG 4291)
Arma el payload JSON oficial, lo codifica en Base64 URL-safe y genera la URL verificadora oficial:
```typescript
const afipPayload = {
  ver: 1,
  fecha: invoice.date,
  cuit: Number(invoice.issuerCuit),
  ptoVta: invoice.pointOfSale,
  tipoCmp: getAfipDocCode(invoice.type),
  nroCmp: invoice.number,
  importe: invoice.total,
  moneda: 'PES',
  ctz: 1,
  tipoDocRec: 80, // CUIT
  nroDocRec: Number(invoice.clientTaxId),
  tipoCodAut: 'E',
  codAut: Number(invoice.caeNumber)
};
const qrBase64 = Buffer.from(JSON.stringify(afipPayload)).toString('base64');
const afipVerifyUrl = `https://www.afip.gob.ar/fe/qr/?p=${qrBase64}`;
```

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export type TaxCondition = 'Responsable Inscripto' | 'Monotributo' | 'Exento' | 'Consumidor Final';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: 0 | 10.5 | 21 | 27;
  subtotal: number;
}

export interface ERPInvoice {
  id: string;
  opportunityId?: string;
  number: string;
  type: 'Factura A' | 'Factura B' | 'Factura C' | 'Nota de Crédito A' | 'Nota de Crédito B';
  pointOfSale: number;
  issueDate: string;
  dueDate: string;
  clientName: string;
  clientTaxId: string; // CUIT/CUIL
  clientTaxCondition: TaxCondition;
  items: InvoiceItem[];
  netSubtotal: number;
  vatTotal: number;
  iibbTotal: number;
  total: number;
  currency: 'ARS' | 'USD';
  status: 'draft' | 'emitted' | 'paid' | 'overdue' | 'cancelled';
  caeNumber?: string;
  caeExpirationDate?: string;
  afipQrUrl?: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `InvoicesDashboard.tsx` | `/src/components/erp/ERPInvoicesView.tsx` | Tabla interactiva con filtros por estado, búsqueda por CUIT/Cliente y métricas de facturación mensual. |
| `NewInvoiceModal.tsx` | `/src/components/erp/InvoiceModal.tsx` | Modal con cálculo en tiempo real de renglones, selector de alícuotas de IVA y vista previa de totales. |
| `InvoicePrintView.tsx` | `/src/components/erp/InvoicePDFView.tsx` | Plantilla de impresión profesional apta para exportación a PDF con código de barras y QR AFIP. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El generador automático de factura desde el modal de Oportunidad ganada.
  - La validación del dígito verificador del CUIT (Módulo 11).
  - La visualización del código QR oficial y el estado del CAE.
- **Descartar de la App Base:**
  - Libros contables complejos de partida doble (asientos de diario, balances de sumas y saldos), delegándolos al ERP externo del cliente mediante webhook.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Emisión de factura y solicitud de CAE
POST /api/erp/invoices
Content-Type: application/json

{
  "opportunityId": "opp-9842",
  "type": "Factura A",
  "clientTaxId": "30712345678",
  "items": [
    { "description": "Implementación Clientum Enterprise", "quantity": 1, "unitPrice": 450000, "vatRate": 21 }
  ]
}

### Consulta de estado impositivo en AFIP por CUIT (Padrón A5)
GET /api/erp/afip/cuit/30712345678
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase III - Madurez Operativa & ERP:** Automatización de facturación y vinculación de pagos a tratos cerrados.
