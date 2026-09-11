# 🛍️ Análisis Técnico de Migración: App 15 - Catálogo de Productos & Tarifarios
**ID de Aplicación de Origen:** `ef90123c-5501-4478-90aa-88f117bc9302`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/ef90123c-5501-4478-90aa-88f117bc9302](https://aistudio.google.com/u/0/apps/ef90123c-5501-4478-90aa-88f117bc9302)  
**Rol en el Ecosistema:** Catálogo Maestro de Artículos y Servicios, Listas de Precios Segmentadas, Control de Stock y Márgenes Comerciales.  
**Estado de Integración:** 100% Operativo en Clientum (`TiendaDigitalView.tsx` y `ProductCatalogTab.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación resuelve la inconsistencia en los precios cotizados por los vendedores. Provee una base de datos centralizada de SKUs (software, servicios profesionales, hardware o productos físicos) con listas de precios diferenciadas (Minorista, Mayorista, Distribuidor, Corporativo) y cálculo automático del margen de rentabilidad para evitar cotizaciones a pérdida.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Determinación de Precio Dinámico por Lista
Al agregar un producto a una cotización o propuesta, el precio unitario se ajusta según el perfil de la cuenta:
```typescript
export function resolveProductPrice(product: CatalogProduct, priceTier: 'standard' | 'wholesaler' | 'partner' | 'enterprise'): number {
  switch (priceTier) {
    case 'wholesaler': return product.wholesalePrice || (product.basePrice * 0.85);
    case 'partner': return product.partnerPrice || (product.basePrice * 0.75);
    case 'enterprise': return product.enterprisePrice || (product.basePrice * 0.70);
    default: return product.basePrice;
  }
}
```

### 2.2. Algoritmo de Cálculo de Margen de Contribución
$$\text{GrossMarginPercentage} = \frac{\text{SalePrice} - \text{UnitCost}}{\text{SalePrice}} \times 100$$
Si el margen desciende de un umbral mínimo configurable (ej. $< 20\%$), el CRM requiere autorización de un supervisor comercial antes de emitir la propuesta.

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface CatalogProduct {
  id: string;
  sku: string; // ej: CLI-ENT-ANNUAL
  name: string;
  category: 'Software / SaaS' | 'Servicios' | 'Hardware' | 'Consultoria';
  description: string;
  basePrice: number;
  wholesalePrice?: number;
  enterprisePrice?: number;
  cost: number;
  currency: 'USD' | 'ARS';
  stockQuantity?: number;
  isRecurring: boolean; // Si es suscripción mensual/anual
  billingPeriod?: 'monthly' | 'quarterly' | 'annual';
  taxRate: 0 | 10.5 | 21;
  isActive: boolean;
  thumbnailUrl?: string;
  createdAt: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `ProductCatalogGrid.tsx` | `/src/components/catalog/TiendaDigitalView.tsx` | Cuadrícula y tabla de productos con buscador por SKU o nombre, badge de categoría y stock disponible. |
| `ProductFormDrawer.tsx` | Cajón modal en `TiendaDigitalView.tsx` | Edición de precios base, costos, alícuotas impositivas e imágenes de producto. |
| `QuickItemSelector.tsx` | Selector en modales de Factura y Propuesta | Desplegable inteligente con autocompletado y cálculo instantáneo del subtotal. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El selector rápido de productos en la generación de propuestas PDF y facturas ERP.
  - La advertencia de margen de ganancia insuficiente para vendedores.
  - La distinción entre productos únicos y suscripciones recurrentes (MRR).
- **Descartar de la App Base:**
  - Motores de logística con cálculo de dimensiones de paquetes y tarifas de flete complejas; se mantuvo el foco en cotización comercial B2B.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Listar catálogo de productos con filtros
GET /api/catalog/products?active=true&category=Software%20/%20SaaS

### Crear nuevo producto o servicio
POST /api/catalog/products
Content-Type: application/json

{
  "sku": "CLI-ONB-PRO",
  "name": "Servicio de Onboarding e Implementación CRM",
  "category": "Servicios",
  "basePrice": 850,
  "cost": 300,
  "currency": "USD",
  "isRecurring": false
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase I y II - Catálogo Comercial & E-commerce B2B:** Estandarización de la oferta comercial y agilización de propuestas.
