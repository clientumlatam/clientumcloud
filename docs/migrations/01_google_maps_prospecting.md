# 🗺️ Análisis Técnico de Migración: App 01 - Prospección B2B Google Maps
**ID de Aplicación de Origen:** `00d3a74e-d23f-4d55-81c2-e591b8febc1c`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/00d3a74e-d23f-4d55-81c2-e591b8febc1c](https://aistudio.google.com/u/0/apps/00d3a74e-d23f-4d55-81c2-e591b8febc1c)  
**Rol en el Ecosistema:** Captación Territorial Outbound, Radar Geográfico, Scraper de Lugares y Calificación Automática de Comercios.  
**Estado de Integración:** 100% Operativo en Clientum (`ModuleProspeccionMaps.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
Esta aplicación resuelve el desafío de prospección B2B para fuerzas de venta sobre el terreno y equipos de SDR:
- Permite descubrir empresas y distribuidores en un cuadrante geográfico definido sin bases de datos desactualizadas.
- Conecta directamente con Google Places API mediante un proxy seguro del servidor que no expone la clave privada de Google Cloud en el cliente.
- Convierte en un clic los datos dispersos de un comercio en fichas estructuradas de `Company`, `Person` y `Opportunity`.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Búsqueda Radial Parametrizada
- **Entrada:** Coordenadas lat/lng de referencia o texto de ciudad, radio en kilómetros ($r \in [5, 100]\text{ km}$), categoría/nicho (*"Agroquímicas"*, *"Distribuidora mayorista"*, *"Estudios contables"*).
- **Procesamiento de Grid:** Divide el área de búsqueda en subcuadrantes circulares para maximizar la cobertura de resultados respetando la cuota máxima de 20-60 resultados por llamada de Places API.
- **Normalización de Teléfonos:** Limpia caracteres especiales y formatea a estándar internacional E.164.

### 2.2. Scoring Heurístico de Potencial Comercial
Clasifica la madurez digital e intención comercial de cada comercio encontrado:
$$\text{CommercialScore} = \min\left(100, (\text{Rating} \times 12) + (\min(\text{ReviewsCount}, 50) \times 0.6) + (\text{HasPhone} ? 15 : 0) + (\text{HasWebsite} ? 15 : 0)\right)$$
- **Score $\ge 75$:** Prospecto de Alta Prioridad (Llama visible en UI).
- **Score $45 - 74$:** Prospecto Medio con potencial.
- **Score $< 45$:** Comercio con baja presencia digital (requiere contacto presencial o telefónico).

### 2.3. Algoritmo de Desduplicación Pre-Ingesta
Antes de importar prospectos al CRM:
1. Extrae el dominio raíz del sitio web (`website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]`).
2. Verifica contra `companies.some(c => c.domain === cleanDomain)`.
3. Comprueba colisiones por teléfono normalizado contra `companies` y `people`.
4. Si ya existe, marca el estado en el mapa como `Ya en CRM` deshabilitando la doble inserción.

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface MapProspectLead {
  id: string;
  placeId: string;
  name: string;
  category: string;
  rating: number;
  userRatingsTotal: number;
  formattedAddress: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  internationalPhone?: string;
  website?: string;
  commercialScore: number;
  isAlreadyInCRM: boolean;
  photoUrl?: string;
  openingHoursStatus?: string;
}

export interface MapExportBatchPayload {
  leads: MapProspectLead[];
  assignedAdvisorId: string;
  defaultStage: 'lead' | 'contacted';
  defaultCurrency: 'USD' | 'ARS';
  estimatedDealValue: number;
  tags: string[];
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `RadarMapView.tsx` | `/src/components/commercial/ModuleProspeccionMaps.tsx` | Canvas de mapa con marcadores interactivos (azul = descubierto, verde = en CRM, púrpura = seleccionado). |
| `PlaceDetailInfoWindow.tsx` | `/src/components/commercial/PlaceDetailCard.tsx` | Tarjeta lateral desplegable con teléfono clicable, enlace web, scoring y botón de exportación individual. |
| `BulkActionToolbar.tsx` | Barra inferior fija en `ModuleProspeccionMaps.tsx` | Contador de seleccionados, estimación de valor de cartera y botón *"Exportar a Pipeline"*. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El motor de scoring de empresas y la deduplicación por dominio.
  - La sincronización directa con el pipeline Kanban (creación simultánea de Empresa + Oportunidad).
  - La exportación instantánea a CSV/Excel para campañas de llamadas.
- **Descartar de la App Base:**
  - Dependencias pesadas de librerías GIS cartográficas propietarias; se adoptó la integración canónica de Google Maps JavaScript API.
  - Búsquedas no B2B (lugares residenciales o puntos turísticos) para mantener el foco en ventas comerciales.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Búsqueda de lugares geolocalizados mediante Google Places API
POST /api/leads/search-places
Content-Type: application/json

{
  "keyword": "Empresas de Logística",
  "city": "Rosario, Santa Fe",
  "lat": -32.9587,
  "lng": -60.6930,
  "radiusKm": 25,
  "minRating": 4.0
}

### Ingesta masiva de prospectos a CRM
POST /api/leads/bulk-import-maps
Content-Type: application/json

{
  "advisorId": "user-alex-morgan",
  "items": [...]
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase I - CRM Fundamentos (Sección 3.4 Captación y Prospección):** Prospección territorial directa integrada al Kanban de ventas.
