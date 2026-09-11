# 👥 02. Directorio B2B, Contactos & Enriquecimiento Corporativo
**ID de Aplicación:** `2fb77921-7f3f-4047-8d56-4fef383fa37b`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/2fb77921-7f3f-4047-8d56-4fef383fa37b](https://aistudio.google.com/u/0/apps/2fb77921-7f3f-4047-8d56-4fef383fa37b)  
**Rol en el Ecosistema:** Gestión Relacional de Cuentas B2B, Estructura Empresa-Personas e Ingesta de Contactos.

---

## 🎯 Visión General de la Aplicación

Esta aplicación está especializada en la **gestión profunda de relaciones B2B**. A diferencia de un CRM genérico B2C centrado únicamente en personas individuales, esta solución modela con precisión la realidad de las ventas corporativas complejas: una sola cuenta comercial (Empresa) cuenta con múltiples decisores (Director de Finanzas, Comprador, Gerente Técnico, etc.) con diferentes niveles de influencia y canales de contacto.

Además, incorpora herramientas de **enriquecimiento de prospectos** y utilidades masivas de importación para migrar carteras de clientes desde hojas de cálculo y sistemas heredados.

---

## 💎 Componentes Clave & Código para Reutilizar

### 1. Modelo Relacional Jerárquico Empresa $\rightarrow$ Personas (`CompanyPersonsTree`)
* **Árbol de Decisores por Cuenta:**
  - Visualización anidada que muestra la ficha de la Empresa y debajo todos los contactos vinculados con sus respectivos roles:
    - *Decisor Económico / Firma.*
    - *Usuario Clave / Sponsor Interno.*
    - *Comprador / Compras.*
    - *Soporte Técnico / Evaluador.*
  - Enlaces rápidos directos para iniciar llamada, abrir chat de WhatsApp o enviar correo electrónico pre-formateado a cualquier integrante del equipo del cliente.

### 2. Importador Masivo Universal CSV/Excel (`DataImporterModal`)
* **Asistente de Ingesta Guiada:**
  - Lectura en memoria de archivos `.csv` y `.xlsx` usando `PapaParse`.
  - Mapeador inteligente de columnas por similitud semántica (detecta si la columna se llama *"Razón Social"*, *"Company"*, *"Empresa"* o *"Nombre Fantasía"* y la mapea automáticamente a `companyName`).
  - Validación de datos previa a la inserción (identifica correos inválidos, números sin código de país y duplicados por CUIT/Email).
  - Resumen previo interactivo para previsualizar las filas antes de confirmar la importación a la base principal.

### 3. Enriquecimiento de Datos de Perfil B2B (`ProfileEnricher`)
* **Integración con Fuentes Públicas y Redes Profesionales:**
  - Enlace dinámico directo al perfil de LinkedIn de la empresa y del contacto.
  - Consulta de tecnologías usadas por el prospecto (CMS, pasarela de pago, hosting).
  - Detección automática del huso horario y país a partir del prefijo telefónico y dominio del correo.

### 4. Línea de Tiempo de Interacciones por Contacto (`ContactActivityTimeline`)
* **Historial Cronológico de Toques:**
  - Registro de cada punto de contacto: llamada de prospección, reunión de demo, nota interna dejada por un asesor, correo enviado o mensaje de WhatsApp.
  - Indicador de *"Último Contacto Realizado"* (hace 2 días, hace 2 semanas, etc.) para alertar sobre cuentas frías o desatendidas.

---

## 🛠️ Stack Tecnológico & Dependencias a Incorporar

- **PapaParse (`papaparse` + `@types/papaparse`):** Para parsing cliente ultra-rápido de archivos CSV sin pasar por el backend.
- **Lucide Icons:** Iconos de jerarquía (`Building2`, `UserCheck`, `Users`, `UploadCloud`, `FileSpreadsheet`, `Linkedin`).
- **Exportadores:** Generador de reportes a `.csv` para descargar bases segmentadas con filtros aplicados.

---

## 🔄 Plan de Integración en Clientum Master (`00d3a74e`)

1. **Reemplazo / Potenciación de la vista `PeopleView.tsx` y `CompaniesView.tsx`:**
   - Unificar la vista actual de Contactos con la vista jerárquica de Árbol Empresa-Contactos.
2. **Incorporar el botón "Importar Base CSV" en la barra de herramientas:**
   - Permitir a los usuarios cargar carteras de hasta 5,000 contactos en segundos con preview visual.
3. **Tarjeta de Información del Contacto en el Detalle de la Oportunidad:**
   - Mostrar al vendedor dentro del Kanban quién es el contacto principal del trato y quiénes son los decisores secundarios con sus teléfonos directos.
