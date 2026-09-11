# ⚡ 07. Diseñador Visual de Workflows, Automatizaciones No-Code & BI Forecast
**ID de Aplicación:** `28da5046-18df-4520-96ee-91698fbc973b`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/28da5046-18df-4520-96ee-91698fbc973b](https://aistudio.google.com/u/0/apps/28da5046-18df-4520-96ee-91698fbc973b)  
**Rol en el Ecosistema:** Automatización de Procesos Comerciales, Reglas Lógicas y Business Intelligence Avanzado.

---

## 🎯 Visión General de la Aplicación

Esta aplicación es el **motor de escalabilidad operativa y analítica estratégica**. Resuelve dos de las necesidades más avanzadas de las empresas en crecimiento:
1. **Automatizaciones No-Code:** Elimina las tareas manuales repetitivas (enviar correos de bienvenida, mover tratos olvidados, crear tareas de seguimiento) mediante un diseñador visual de flujos estilo Zapier o Make.
2. **Business Intelligence (BI) & Forecast:** Proyecta los ingresos futuros del negocio en base a la probabilidad y velocidad histórica del pipeline, brindando a la dirección métricas clave de MRR, ARR, CAC y LTV.

---

## 💎 Componentes Clave & Código para Reutilizar

### 1. Diseñador Visual de Workflows con Nodos (`WorkflowFlowCanvas`)
* **Constructor Drag-and-Drop de Reglas:**
  - Estructura clásica en 3 capas lógicas:
    1. **Disparadores (Triggers):**
       - *Lead nuevo ingresado (por formulario, webhook o WhatsApp).*
       - *Oportunidad movida a etapa X (ej. "Negociación").*
       - *Propuesta comercial firmada o aceptada por el cliente.*
       - *Inactividad de más de N días sin contacto.*
       - *Pago acreditado en Mercado Pago / Stripe.*
    2. **Condiciones y Filtros (Conditions):**
       - *Si el valor estimado es superior a $500,000 ARS o $500 USD.*
       - *Si la industria es "Agro" o "Salud".*
       - *Si el responsable asignado es el Asesor A.*
    3. **Acciones Automatizadas (Actions):**
       - *Enviar mensaje de WhatsApp con plantilla oficial.*
       - *Enviar correo electrónico personalizado con la propuesta adjunta.*
       - *Crear una tarea de seguimiento en el Kanban con vencimiento en 24 horas.*
       - *Disparar una alerta inmediata en Slack o Discord.*
       - *Actualizar el campo "Estado de Pago" a "Al Día".*

### 2. Tablero de Business Intelligence & Forecast Ponderado (`BIForecastDashboard`)
* **Métricas Financieras Ejecutivas:**
  - **Forecast Ponderado:** Valor total del pipeline multiplicado por la probabilidad de cierre de cada etapa (ej. Trato de $10,000 en etapa de 70% probabilidad = $7,000 en forecast proyectado).
  - **Métricas SaaS y Recurrentes:**
    - *MRR (Monthly Recurring Revenue).*
    - *ARR (Annual Recurring Revenue).*
    - *Ticket Promedio de Venta (ACV).*
  - **Velocidad del Pipeline (Sales Velocity):**
    - Tiempo promedio en días que tarda un lead en recorrer desde la primera etapa hasta el cierre.
  - **Rendimiento Individual del Equipo:**
    - Ratio de cierre (Win Rate %) por asesor.
    - Cuotas de ventas alcanzadas vs. objetivos mensuales fijados.

### 3. Registro de Auditoría de Automatizaciones (`WorkflowExecutionLogs`)
* **Trazabilidad y Depuración:**
  - Registro cronológico en vivo de cada ejecución de workflow:
    - *Trigger disparado con éxito.*
    - *Filtros evaluados como Verdaderos/Falsos.*
    - *Acciones ejecutadas con su tiempo de respuesta.*
  - Capacidad de reintentar ejecuciones fallidas con un solo clic.

---

## 🛠️ Stack Tecnológico & Dependencias a Incorporar

- **Visual Canvas:** React Flow (`@xyflow/react` o implementación nativa con nodos SVG conectables).
- **Gráficos & Visualizaciones:** `recharts` para gráficos de área, barras apiladas de pipeline y velocímetros de cuota.
- **Lucide Icons:** `Zap`, `GitFork`, `TrendingUp`, `DollarSign`, `Activity`, `CheckCircle2`, `AlertTriangle`.

---

## 🔄 Plan de Integración en Clientum Master (`00d3a74e`)

1. **Integrar en la vista `AnalyticsView` / `BiDashboardView`:**
   - Enriquecer la pestaña existente de analíticas con los gráficos de Forecast ponderado y métricas de recurrencia.
2. **Habilitar pestaña "Automatizaciones" en Ajustes:**
   - Permitir a los gerentes de ventas activar o desactivar recetas preconfiguradas (ej. "Secuencia de bienvenida", "Alerta de trato en riesgo").
3. **Escuchador de Eventos en el CRMContext:**
   - Conectar los cambios de estado en `updateOpportunity` para que disparen automáticamente las acciones definidas en las reglas de workflow activas.
