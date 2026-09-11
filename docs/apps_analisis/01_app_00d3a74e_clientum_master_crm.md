# 🏢 01. Clientum Master CRM Core & Engine Hub
**ID de Aplicación:** `00d3a74e-d23f-4d55-81c2-e591b8febc1c`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/00d3a74e-d23f-4d55-81c2-e591b8febc1c](https://aistudio.google.com/u/0/apps/00d3a74e-d23f-4d55-81c2-e591b8febc1c)  
**Rol en el Ecosistema:** Plataforma Central, Pipeline Comercial, Hub de Estado Global y Orquestador Modular.

---

## 🎯 Visión General de la Aplicación

Esta aplicación constituye la **piedra angular y cerebro unificado** del ecosistema Clientum. Alberga el pipeline principal de oportunidades comerciales, la arquitectura multi-moneda (USD y ARS), el sistema de persistencia híbrida (local state + Firebase Firestore en producción), el buscador cartográfico B2B con Google Maps y la capa de asistencia con inteligencia artificial Gemini.

Cualquier funcionalidad importada desde las otras 6 aplicaciones satélite debe acoplarse directamente a este núcleo sin romper la cohesión ni degradar el rendimiento.

---

## 💎 Componentes Clave & Código para Reutilizar

### 1. Sistema de Pipeline Comercial (`/src/components/opportunities/`)
* **KanbanView & TableView:**
  - Tablero interactivo con columnas dinámicas según etapas de venta: *Lead, Contactado, Propuesta, Negociación, Ganado, Perdido*.
  - Cálculo en tiempo real de valor total ponderado por probabilidad, conteo de tratos y tiempo medio de permanencia por etapa.
  - Modales completos para creación, edición, notas, historial de actividades y cambio rápido de etapa.
* **Manejo Multi-Moneda:**
  - Selector unificado de moneda con cálculo de cotización y sumatorias independientes en Pesos Argentinos (ARS) y Dólares Estadounidenses (USD).

### 2. Radar de Prospección B2B (`/src/components/prospecting/`)
* **Buscador Cartográfico con Google Maps & Places:**
  - Búsqueda geolocalizada de negocios por rubro (ej. "Distribuidoras en Córdoba", "Inmobiliarias en Palermo").
  - Extracción automática de razón social, dirección física, teléfono, sitio web, rating y cantidad de reseñas.
  - Conversión a prospecto del CRM con 1 solo clic (`Convertir en Oportunidad` o `Guardar como Lead`).

### 3. Generador de Propuestas & Firma Digital (`/src/components/power/BrochureView.tsx` & `/src/components/proposals/`)
* **Presupuestos y Cotizaciones Ejecutivas:**
  - Diseñador visual de propuestas con desglose de ítems, descuentos comerciales e impuestos.
  - Exportación a documento PDF descargable de alta resolución.
  - Enlace de vista pública para el cliente final con formulario de aceptación y firma electrónica.

### 4. Floating AI Copilot Contextual (`/src/components/copilot/FloatingCopilot.tsx`)
* **Asistente Comercial con Gemini 2.5:**
  - Widget flotante persistente accesible desde cualquier pantalla del CRM.
  - Inyección de contexto automático: detecta en qué oportunidad o vista está el vendedor y asiste con:
    - Argumentos de refutación de objeciones comerciales.
    - Redacción de correos en frío y mensajes de WhatsApp.
    - Creación de tareas y recordatorios con comandos en lenguaje natural.

### 5. Hub de Módulos & Ecosistema (`/src/components/ecosystem/EcosystemHubView.tsx`)
* **Switchboard de 15 Módulos:**
  - Panel central para encender o pausar capacidades de forma independiente.
  - Integración directa con las guías de migración y documentación técnica alojadas en `/docs/migrations/`.

---

## 🧱 Modelo de Datos Central (`/src/types.ts`)

Los modelos ya definidos en esta aplicación sirven como esquema canónico para todas las demás:
- `Opportunity`: Trato comercial con valor, moneda, etapa, probabilidad, contacto y fechas límite.
- `Company`: Organización cliente con CUIT/RUT, rubro, empleados y dirección.
- `Person`: Contacto individual con cargo, teléfono, email, LinkedIn y relación con la empresa.
- `Task`: Actividad operativa pendiente con fecha límite, prioridad y asignatario.
- `ActivityLog`: Auditoría cronológica de cada interacción registrada.

---

## 🚀 Plan de Adopción e Integración

1. **Mantener como Entry Point:** Esta app (`00d3a74e`) debe ser el host principal donde convergen las 6 apps restantes.
2. **Capa de Navegación Unificada:** La barra lateral (`Sidebar`) y la navegación superior (`Header`) ya cuentan con acceso a las vistas de Pipeline, Contactos, Calendario, Analítica y Ecosistema.
3. **Persistencia Sincronizada:** Utilizar el `CRMContext` para compartir el estado de leads, empresas y oportunidades entre todos los módulos satélite importados.
