# 📊 Análisis Técnico de Migración: App 08 - Business Intelligence & Forecast
**ID de Aplicación de Origen:** `f2cd5244-e9b7-4f0e-8682-0e2c8c4356f8`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/f2cd5244-e9b7-4f0e-8682-0e2c8c4356f8](https://aistudio.google.com/u/0/apps/f2cd5244-e9b7-4f0e-8682-0e2c8c4356f8)  
**Rol en el Ecosistema:** Analítica Comercial Predictiva, Forecast Ponderado, Velocidad de Ventas (Sales Velocity) y Métricas de Productividad.  
**Estado de Integración:** 100% Operativo en Clientum (`AnalyticsBIView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
Esta aplicación provee la capa de inteligencia gerencial para directores comerciales y líderes de equipo. Transforma los datos dispersos de oportunidades ganadas, perdidas y en curso en gráficos de tendencias, cálculos de ingresos recurrentes mensuales (MRR) y proyecciones realistas de cierre de trimestre basadas en probabilidades por etapa.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Forecast Ponderado (Weighted Pipeline Forecast)
Calcula el ingreso esperado multiplicando el valor monetario de cada oportunidad activa por la probabilidad estadística de su etapa actual:
$$\text{WeightedForecast} = \sum_{i=1}^{N} \left( \text{amount}_i \times \frac{\text{probability}(\text{stage}_i)}{100} \right)$$
- `lead`: 10%
- `contacted`: 25%
- `qualified`: 50%
- `proposal`: 75%
- `negotiation`: 90%

### 2.2. Algoritmo de Velocidad de Ventas (Sales Velocity Equation)
Permite saber cuánto dinero genera el embudo por día:
$$V = \frac{\text{Oportunidades Calificadas} \times \text{Ticket Promedio (USD)} \times \text{Tasa de Cierre (Win Rate)}}{\text{Duración Promedio del Ciclo de Ventas (Días)}}$$

### 2.3. Detección de Fugas en el Embudo (Stage Conversion Drop-off)
Identifica la etapa con mayor tasa de deserción calculando el ratio de paso entre etapas consecutivas:
$$\text{PassRate}_{A \to B} = \frac{\text{Oportunidades que pasaron a B}}{\text{Oportunidades que entraron a A}} \times 100$$

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface StageConversionMetric {
  stageId: string;
  stageName: string;
  count: number;
  totalValue: number;
  conversionRate: number; // Porcentaje de paso a la siguiente etapa
  avgDaysInStage: number;
}

export interface AdvisorPerformanceMetric {
  advisorId: string;
  advisorName: string;
  dealsWonCount: number;
  dealsWonTotalValue: number;
  winRate: number;
  avgResponseTimeMinutes: number;
  tasksCompletedCount: number;
}

export interface CommercialBIDashboardData {
  timeframe: 'this_month' | 'last_month' | 'quarter' | 'year';
  totalPipelineValue: number;
  weightedForecastValue: number;
  totalWonValue: number;
  winRatePercentage: number;
  salesVelocityPerDay: number;
  stageMetrics: StageConversionMetric[];
  advisorLeaderboard: AdvisorPerformanceMetric[];
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `BIExecutiveSummary.tsx` | Tarjetas KPI en `AnalyticsBIView.tsx` | 4 métricas principales con badges de porcentaje comparativo respecto al mes anterior. |
| `PipelineFunnelChart.tsx` | Gráfico de embudo en `AnalyticsBIView.tsx` | Representación decreciente en barras con gradiente que señala cuellos de botella. |
| `RepLeaderboardTable.tsx` | Tabla en `AnalyticsBIView.tsx` | Ranking de asesores ordenados por volumen cerrado con avatares e insignias de rendimiento. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El motor de cálculo probabilístico de forecast.
  - La visualización del embudo con detección de etapa con mayor pérdida.
  - El selector de período temporal (Mes actual, Trimestre, Año móvil).
- **Descartar de la App Base:**
  - Dependencias de librerías de visualización sobredimensionadas como Highcharts comerciales con licencias propietarias; se implementó con componentes SVG limpios y React estándar.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Obtener métricas consolidadas de Business Intelligence
GET /api/analytics/bi-overview?timeframe=quarter

### Exportar informe ejecutivo gerencial en PDF / Excel
GET /api/analytics/export-report?format=xlsx
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase III - Analítica & BI Avanzado:** Visibilidad integral de ingresos futuros y control cuantitativo del rendimiento de ventas.
