# 🚀 Análisis Técnico de Migración: App 01 - Clientum Master CRM Core
**ID de Aplicación de Origen:** `00d3a74e-d23f-4d55-81c2-e591b8febc1c`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/00d3a74e-d23f-4d55-81c2-e591b8febc1c](https://aistudio.google.com/u/0/apps/00d3a74e-d23f-4d55-81c2-e591b8febc1c)  
**Rol en el Ecosistema:** Plataforma Central Host, Pipeline Kanban Multi-Moneda, Radar de Prospección Google Maps, AI Copilot y Hub Modular.  
**Estado de Integración:** 100% Operativo y Consolidado como Núcleo Activo.

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
Esta aplicación constituye el **núcleo host y columna vertebral (Core Engine)** sobre la que gravita todo el ecosistema de ventas de Clientum. Originalmente concebida como la interfaz comercial para ejecutivos de cuenta y directores de ventas, unifica:
- El pipeline visual de oportunidades comerciales (Kanban interactivo y tabla dinámica).
- El motor de prospección territorial B2B en tiempo real (Google Maps Radar).
- El asistente contextual de ventas asistido por IA (Gemini 2.5 Flash).
- El switchboard modular que orquesta la activación y desacoplamiento de las otras 14 aplicaciones y submódulos.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Transición de Etapas en Pipeline Kanban
- **Máquina de Estados de la Oportunidad:**
  `Lead (Prospección) -> Contactado -> Calificado -> Propuesta Presentada -> En Negociación -> Ganado (Won) | Perdido (Lost)`.
- **Reglas de Automatización de Negocio:**
  - Al transicionar a `won`: Dispara la generación automática de factura proforma o fiscal (vía App 05 / ERP) y gatilla la animación de cierre exitoso (confetti visual).
  - Al transicionar a `lost`: Requiere obligatoriamente registrar el motivo de descalificación o pérdida (`pricing`, `competitor`, `timing`, `product_gap`) para la analítica de BI.
  - Recálculo ponderado instantáneo del pipeline:
    $$\text{Weighted Forecast} = \sum_{i} (\text{amount}_i \times \text{probability}_i)$$

### 2.2. Algoritmo de Prospección Radial en Google Maps
- Búsqueda basada en cuadrante geográfico y radio paramétrico ($r \in [5, 100]\text{ km}$).
- Scoring heurístico de intención comercial de prospectos en mapa:
  $$\text{Score} = \min\left(100, (\text{Rating} \times 12) + (\min(\text{Reviews}, 50) \times 0.5) + (\text{HasPhone} ? 15 : 0) + (\text{HasWebsite} ? 15 : 0)\right)$$
- Mecanismo de desduplicación pre-inserción: compara dominio web extraído y teléfono internacional contra la base canónica de `companies` y `people`.

### 2.3. Heurística Contextual del AI Copilot Flotante
- Enriquecimiento del prompt del usuario con el snapshot del CRM: pestaña activa, cantidad de tratos abiertos, volumen en dólares del pipeline y perfil del asesor logueado.
- Estrategia de fallback dinámico: en caso de degradación de red o límites de cuota, genera respuestas analíticas locales basadas en los datos en memoria sin interrumpir al usuario.

---

## 3. 🗄️ Modelos de Datos y Esquemas Técnicos

### 3.1. Esquema Canónico de Oportunidad (`Opportunity`)
```typescript
export interface Opportunity {
  id: string;
  name: string;
  companyId?: string;
  companyName: string;
  contactPersonId?: string;
  contactPersonName?: string;
  amount: number;
  currency: 'USD' | 'ARS' | 'EUR';
  stage: 'lead' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  probability: number; // 0 - 100%
  expectedCloseDate: string; // ISO 8601 YYYY-MM-DD
  assignedToUserId: string;
  assignedToName: string;
  lossReason?: string;
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 3.2. Esquema de Lead Geolocalizado (`ScrapedMapLead`)
```typescript
export interface ScrapedMapLead {
  id: string;
  placeId: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  address: string;
  city: string;
  phone?: string;
  website?: string;
  lat: number;
  lng: number;
  commercialScore: number;
  isAlreadyInCRM: boolean;
  importedAt?: string;
}
```

---

## 4. 🧩 Componentes UI Clave a Adaptar para Clientum

| Componente Original | Ruta en App Base | Rol Adaptado en Clientum |
|---|---|---|
| `KanbanView.tsx` | `/src/components/kanban/KanbanView.tsx` | Tablero drag-and-drop con tarjetas de trato, totales por columna y multi-moneda. |
| `ModuleProspeccionMaps.tsx` | `/src/components/commercial/ModuleProspeccionMaps.tsx` | Radar de Google Maps con capas de satélite, marcadores y exportador de leads. |
| `AICopilotFloating.tsx` | `/src/components/common/AICopilotFloating.tsx` | Widget flotante con Gemini 2.5, atajos de tareas y análisis comercial. |
| `EcosistemaHub.tsx` | `/src/components/ecosystem/EcosistemaHub.tsx` | Switchboard de activación de módulos y lector integrado de `docs/migrations`. |
| `ExecutiveDashboardView.tsx` | `/src/components/dashboard/ExecutiveDashboardView.tsx` | Dashboard principal con métricas de conversión, pipeline total y gráficos ejecutivos. |

---

## 5. 🔌 Endpoints API y Servicios Backend

```http
### Búsqueda de prospectos en Google Maps
POST /api/leads/search-places
Content-Type: application/json

{
  "keyword": "Empresas de Logística",
  "city": "Rosario, Santa Fe",
  "lat": -32.9587,
  "lng": -60.6930,
  "radiusKm": 15,
  "minRating": 4.0
}

### Copilot Conversacional con Gemini
POST /api/ai/copilot
Content-Type: application/json

{
  "prompt": "Escribe un correo de seguimiento para una empresa de software",
  "temperature": 0.4,
  "context": {
    "currentTab": "opportunities",
    "activePipeline": 245000
  }
}
```

---

## 6. 🗺️ Mapeo con `project_archive/plan_consolidado_proyecto.md`
- **Fase I - CRM Fundamentos (Alta Prioridad):** Base de datos comercial, Pipeline de ventas por etapas y captura geolocalizada.
- **Módulos de Migración Derivados:**
  - `01_google_maps_prospecting.md`
  - `06_ai_chat_copilot.md`
  - `07_tasks_kanban_board.md`
