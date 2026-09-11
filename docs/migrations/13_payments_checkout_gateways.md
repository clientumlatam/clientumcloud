# 💳 Análisis Técnico de Migración: App 13 - Pasarelas de Cobro & Pay Links
**ID de Aplicación de Origen:** `cc98101a-ee41-455b-8012-33bfa8e31294`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/cc98101a-ee41-455b-8012-33bfa8e31294](https://aistudio.google.com/u/0/apps/cc98101a-ee41-455b-8012-33bfa8e31294)  
**Rol en el Ecosistema:** Generación de Links de Cobro Inmediato (Mercado Pago / Stripe), Recepción de Pagos y Autocierre de Oportunidades.  
**Estado de Integración:** 100% Operativo en Clientum (`PaymentsView.tsx` y `PaymentLinkModal.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación resuelve la fricción en el momento decisivo del cobro. Permite a los asesores generar un link de pago con tarjeta de crédito, débito o transferencia bancaria en pesos argentinos (Mercado Pago Checkout Pro) o dólares internacionales (Stripe Checkout). Al impactar el pago, un webhook confirma la transacción y marca la oportunidad como ganada instantáneamente.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Generación Dinámica de Preferencia de Pago
Crea la sesión de cobro con metadatos del CRM para garantizar la trazabilidad:
```typescript
export function buildMercadoPagoPreference(opportunity: Opportunity, client: Person) {
  return {
    items: [{
      id: opportunity.id,
      title: opportunity.name,
      quantity: 1,
      currency_id: opportunity.currency === 'USD' ? 'USD' : 'ARS',
      unit_price: opportunity.amount
    }],
    payer: {
      name: client.firstName,
      surname: client.lastName,
      email: client.email,
      phone: { number: client.phone || '' }
    },
    back_urls: {
      success: `https://crm.clientum.com/pago-confirmado?oppId=${opportunity.id}`,
      failure: `https://crm.clientum.com/pago-fallido?oppId=${opportunity.id}`
    },
    auto_return: 'approved',
    external_reference: opportunity.id
  };
}
```

### 2.2. Manejo de Webhooks con Verificación de Firma HMAC
Valida que la notificación de cobro proviene legítimamente de los servidores de Mercado Pago o Stripe antes de cambiar el estado de la oportunidad.

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface PaymentTransaction {
  id: string;
  opportunityId: string;
  clientName: string;
  gateway: 'mercadopago' | 'stripe' | 'transferencia_bancaria';
  externalTransactionId?: string;
  amount: number;
  currency: 'ARS' | 'USD';
  status: 'pending' | 'approved' | 'rejected' | 'refunded';
  paymentMethod: 'credit_card' | 'debit_card' | 'bank_transfer' | 'crypto';
  paymentUrl: string;
  paidAt?: string;
  createdAt: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `PaymentLinkGeneratorModal.tsx` | `/src/components/payments/PaymentLinkModal.tsx` | Modal emergente con selector de pasarela, cálculo de comisión y botón de copiar enlace. |
| `PaymentsTransactionsTable.tsx` | `/src/components/payments/PaymentsView.tsx` | Historial de transacciones con filtros por pasarela, estado del cobro y comprobante descargable. |
| `ClientPaymentConfirmation.tsx` | `/src/components/public/PublicPaymentSuccessView.tsx` | Pantalla de agradecimiento con confeti animado y mensaje de confirmación para el cliente. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El botón directo *"Generar Link de Pago"* en la tarjeta de oportunidad del Kanban.
  - La sincronización automática de estado `'paid'` con el módulo de facturación ERP.
  - El soporte dual ARS (Mercado Pago) / USD (Stripe).
- **Descartar de la App Base:**
  - Módulos de reconciliación bancaria masiva compleja, manteniendo la pasarela ligera y focalizada en ventas.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Crear enlace de pago para una oportunidad comercial
POST /api/payments/create-link
Content-Type: application/json

{
  "opportunityId": "opp-402",
  "amount": 250000,
  "currency": "ARS",
  "gateway": "mercadopago"
}

### Webhook de notificación de pago de Mercado Pago
POST /api/webhooks/mercadopago?topic=payment&id=1234567890
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase II y III - Monetización & Finanzas:** Cierre de ventas con cobro online integrado y trazabilidad contable.
