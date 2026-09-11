# 📝 Análisis Técnico de Migración: App 11 - Formularios Web Embebidos
**ID de Aplicación de Origen:** `a12b4e78-9844-48ac-b43a-71829411dc31`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/a12b4e78-9844-48ac-b43a-71829411dc31](https://aistudio.google.com/u/0/apps/a12b4e78-9844-48ac-b43a-71829411dc31)  
**Rol en el Ecosistema:** Generador Visual de Formularios de Captación, Snippet de Inserción Iframe/Script, Captura de UTMs y Creación Inmediata de Leads.  
**Estado de Integración:** 100% Operativo en Clientum (`WebFormsView.tsx` y `PublicWebFormEmbedView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación resuelve la conexión entre los sitios web, landing pages o blogs corporativos de las empresas y el CRM. Permite diseñar formularios personalizados sin tocar código, generar un código snippet embebible (`<iframe src="..."></iframe>` o `<script src="..."></script>`) y capturar instantáneamente cada envío en la base de datos de leads de Clientum junto con los parámetros publicitarios de Google Ads, Meta Ads o LinkedIn (UTMs).

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Captura de Atribución y Campañas Publicitarias (UTM Capture)
Al cargarse el formulario embebido en el sitio externo, intercepta los parámetros de la URL padre:
```typescript
export function extractUTMParameters(searchParams: URLSearchParams): Record<string, string> {
  return {
    utm_source: searchParams.get('utm_source') || 'direct',
    utm_medium: searchParams.get('utm_medium') || 'organic',
    utm_campaign: searchParams.get('utm_campaign') || 'none',
    utm_term: searchParams.get('utm_term') || '',
    utm_content: searchParams.get('utm_content') || '',
    referrerUrl: document.referrer || window.location.href
  };
}
```

### 2.2. Algoritmo de Lead Scoring Predictivo en la Ingesta
Evalúa la calidad del prospecto en el instante de la sumisión para asignar prioridad:
- Dominio de correo corporativo (no `@gmail.com`, `@hotmail.com`): $+30\text{ pts}$.
- Teléfono móvil completado con código de área válido: $+20\text{ pts}$.
- Presupuesto mensual declarado $> \$1.000\text{ USD}$: $+30\text{ pts}$.
- Cargo declarado en nivel directivo (CEO, Gerente): $+20\text{ pts}$.
Total $\ge 70$: Lead Calificado transferido directamente a la etapa `'qualified'`.

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface WebFormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'number';
  placeholder?: string;
  required: boolean;
  options?: string[]; // Para selects
}

export interface WebFormDefinition {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  buttonText: string;
  primaryColor: string;
  fields: WebFormField[];
  redirectUrlAfterSubmit?: string;
  redirectToWhatsApp?: boolean;
  assignedAdvisorId?: string;
  defaultStage: 'lead' | 'contacted' | 'qualified';
  viewsCount: number;
  submissionsCount: number;
  createdAt: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `FormBuilderStudio.tsx` | `/src/components/forms/WebFormsView.tsx` | Diseñador drag-and-drop de campos con panel de personalización de colores y tipografía. |
| `SnippetCodeGeneratorModal.tsx` | Modal de Código en `WebFormsView.tsx` | Generador de código iframe y script HTML con botón de copiado al portapapeles a 1 clic. |
| `PublicFormStandalone.tsx` | `/src/components/public/PublicWebFormEmbedView.tsx` | Página optimizada ultra-ligera sin bordes lista para embeber en WordPress, Webflow o Shopify. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El generador de iframe responsivo con soporte Cross-Origin (`CORS`).
  - La redirección opcional a WhatsApp con mensaje pre-cargado tras enviar el formulario.
  - El contador de visitas y tasa de conversión del formulario.
- **Descartar de la App Base:**
  - Frameworks CSS externos que interferían con el diseño del sitio cliente; se utilizó CSS encapsulado y neutro en el iframe.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Envío público de formulario desde sitio web externo
POST /api/public/forms/:formId/submit
Content-Type: application/json

{
  "firstName": "Agustina",
  "lastName": "Pérez",
  "email": "agustina@distribuidorasur.com",
  "phone": "+5491165432198",
  "company": "Distribuidora Sur SA",
  "utm_source": "google_ads",
  "utm_campaign": "b2b_lead_gen"
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase I y II - Captación & Formularios:** Atracción de prospectos inbound y automatización del primer contacto comercial.
