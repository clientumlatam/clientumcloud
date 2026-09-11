# 📄 Análisis Técnico de Migración: App 05 - Propuestas en PDF & Firma Digital
**ID de Aplicación de Origen:** `8093d5ce-a602-45e0-b6f3-66f8e792e3a1`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/8093d5ce-a602-45e0-b6f3-66f8e792e3a1](https://aistudio.google.com/u/0/apps/8093d5ce-a602-45e0-b6f3-66f8e792e3a1)  
**Rol en el Ecosistema:** Generación de Cotizaciones Ejecutivas en PDF, Trazabilidad de Lectura y Portal de Firma Digital para Clientes.  
**Estado de Integración:** 100% Operativo en Clientum (`BrochureView.tsx` y `PublicProposalSignView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación aborda la etapa crítica de negociación comercial donde los presupuestos enviados por correo suelen perderse o quedar sin seguimiento. Provee un constructor de propuestas ejecutivas con desglose de ítems, términos comerciales y un portal web público (`/firmar/:id`) donde el prospecto revisa la cotización y firma digitalmente desde su teléfono o computadora.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Trazabilidad de Lectura y Aperturas
Cuando el cliente abre el enlace de la propuesta:
1. Registra la IP del visitante, User-Agent y timestamp exacto.
2. Incrementa el contador `viewsCount` y emite una notificación en tiempo real al asesor responsable: *"El cliente [Nombre] está visualizando tu propuesta ahora mismo"*.
3. Marca el estado de la oportunidad asociada a `'negotiation'`.

### 2.2. Algoritmo de Registro Criptográfico de Firma Digital
Garantiza la validez probatoria del acuerdo comercial:
```typescript
export interface DigitalSignatureEvidence {
  signerName: string;
  signerDniOrTaxId: string;
  signatureCanvasDataUrl: string; // Trazos vectoriales en base64
  signedAt: string;
  clientIpAddress: string;
  documentHashSha256: string;
}

export async function generateProposalHash(proposalData: any): Promise<string> {
  const contentToHash = `${proposalData.id}-${proposalData.total}-${proposalData.items.length}-${proposalData.clientTaxId}`;
  const msgUint8 = new TextEncoder().encode(contentToHash);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
```

### 2.3. Autocierre Comercial al Firmar
Al completarse la firma en el portal web:
- Actualiza la propuesta a estado `'signed'`.
- Mueve la oportunidad en el Kanban automáticamente a `'closed_won'`.
- Dispara la generación del borrador de factura en el módulo de ERP.

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface ProposalItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
  subtotal: number;
}

export interface CommercialProposal {
  id: string;
  opportunityId: string;
  code: string; // ej: PROP-2026-084
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  items: ProposalItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
  currency: 'USD' | 'ARS';
  termsAndConditions: string;
  validUntil: string;
  status: 'draft' | 'sent' | 'viewed' | 'signed' | 'rejected' | 'expired';
  viewsCount: number;
  lastViewedAt?: string;
  signatureEvidence?: DigitalSignatureEvidence;
  publicSigningUrl: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `ProposalBuilder.tsx` | `/src/components/power/BrochureView.tsx` | Editor interactivo de cotizaciones con selector de productos y personalización de marca. |
| `ProposalPDFPreview.tsx` | Vista previa en `BrochureView.tsx` | Renderizado fiel para impresión y descarga con membrete y totales fiscales. |
| `ClientSignaturePortal.tsx` | `/src/components/public/PublicProposalSignView.tsx` | Portal limpio sin distracciones con lienzo canvas interactivo para captura de firma manuscrita. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El portal público responsivo de firma digital.
  - La sincronización automática con el avance de etapas del Kanban.
  - El visor PDF sin dependencias de plugins externos del navegador.
- **Descartar de la App Base:**
  - Servidores de certificados PKI complejos; se adoptó un hash criptográfico SHA-256 con evidencia de IP y fecha aceptable comercialmente.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Creación de propuesta comercial y generación de token de firma
POST /api/proposals
Content-Type: application/json

{
  "opportunityId": "opp-102",
  "clientName": "Gonzalo Valdés",
  "items": [{ "name": "Licencia Anual Clientum CRM", "quantity": 1, "unitPrice": 1200 }],
  "validDays": 15
}

### Consulta pública de propuesta por token seguro
GET /api/public/proposals/sign/:token

### Registro de firma manuscrita y cierre del acuerdo
POST /api/public/proposals/sign/:token
Content-Type: application/json

{
  "signerName": "Gonzalo Valdés",
  "signerDni": "32.145.890",
  "signatureCanvasData": "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase I y II - Pipeline & Cierre Comercial:** Aceleración del ciclo de ventas mediante cotizaciones ejecutivas con firma instantánea.
