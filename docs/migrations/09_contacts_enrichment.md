# 👥 Análisis Técnico de Migración: App 09 - Directorio B2B & Enriquecimiento
**ID de Aplicación de Origen:** `2fb77921-7f3f-4047-8d56-4fef383fa37b`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/2fb77921-7f3f-4047-8d56-4fef383fa37b](https://aistudio.google.com/u/0/apps/2fb77921-7f3f-4047-8d56-4fef383fa37b)  
**Rol en el Ecosistema:** Directorio Relacional Empresa $\to$ Contactos Múltiples (1:N), Importador Inteligente CSV/Excel y Clasificación de Decisores.  
**Estado de Integración:** 100% Operativo en Clientum (`CompaniesView.tsx` y `PeopleView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación aborda la complejidad de las ventas B2B corporativas, donde las decisiones de compra no las toma un individuo aislado sino un comité de compra (Director de Operaciones, CFO, Gerente de Compras, Usuario Final). Implementa una arquitectura relacional sólida con árbol jerárquico de empresa y múltiples contactos asociados clasificados por nivel de influencia.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Mapeo Semántico de Columnas CSV con Distancia de Levenshtein
Al importar un archivo CSV o Excel de clientes, mapea automáticamente columnas con nombres arbitrarios hacia el esquema de Clientum:
```typescript
const SCHEMA_ALIASES: Record<string, string[]> = {
  name: ['nombre', 'razon social', 'empresa', 'company', 'organization'],
  taxId: ['cuit', 'cuil', 'rfc', 'rut', 'tax_id', 'identificacion fiscal'],
  email: ['correo', 'e-mail', 'mail', 'email corporativo'],
  phone: ['telefono', 'celular', 'whatsapp', 'movil', 'tel']
};

export function autoMapCsvColumn(headerName: string): string | null {
  const normalized = headerName.trim().toLowerCase();
  for (const [canonicalField, aliases] of Object.entries(SCHEMA_ALIASES)) {
    if (aliases.some(alias => normalized.includes(alias) || levenshtein(normalized, alias) <= 2)) {
      return canonicalField;
    }
  }
  return null;
}
```

### 2.2. Clasificación de Decisores en la Cuenta B2B
Cada contacto vinculado a una empresa recibe un rol comercial:
- `Decision Maker` (CEO, Director General, Socio).
- `Influencer` (Gerente de Área, Consultor Externo).
- `Champion` (Defensor interno del proyecto Clientum).
- `Gatekeeper` (Asistente ejecutivo, Recepción).

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface Company {
  id: string;
  name: string;
  domain?: string;
  industry: string;
  taxId?: string; // CUIT/CUIL
  size?: '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
  tier?: 'Startup' | 'Pyme' | 'Mid-Market' | 'Enterprise';
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  contactsCount: number;
  totalDealsValue: number;
  tags: string[];
  createdAt: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyId?: string;
  companyName?: string;
  jobTitle?: string;
  roleInSale?: 'Decision Maker' | 'Influencer' | 'Champion' | 'Gatekeeper' | 'User';
  linkedinUrl?: string;
  status: 'Lead' | 'Contacted' | 'Customer' | 'Inactive';
  assignedTo: string;
  lastActivityDate?: string;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `CompanyDirectoryView.tsx` | `/src/components/companies/CompaniesView.tsx` | Tabla jerárquica con avatar de iniciales, conteo de empleados, estado de CUIT y contactos vinculados. |
| `PersonProfileDrawer.tsx` | Cajón lateral en `PeopleView.tsx` | Ficha técnica 360° con timeline de llamadas, correos, WhatsApps y etapa en el pipeline. |
| `CSVImportWizard.tsx` | `/src/components/power/CSVStudioView.tsx` | Asistente de 3 pasos: Carga de archivo $\rightarrow$ Previsualización con mapeo de columnas $\rightarrow$ Inserción masiva sin duplicados. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El asistente visual de importación y corrección de CSV.
  - El árbol de contactos por empresa para ventas a grandes cuentas.
  - La sincronización bidireccional entre la empresa y las oportunidades abiertas.
- **Descartar de la App Base:**
  - Vistas monolíticas sin paginación que saturaban la memoria del navegador con más de 5.000 registros; se implementó filtrado rápido en memoria y virtualización ligera.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Subir e interpretar archivo CSV para importación
POST /api/contacts/import-csv
Content-Type: multipart/form-data

### Crear empresa con contactos hijos en una sola transacción
POST /api/companies/with-contacts
Content-Type: application/json

{
  "company": { "name": "BioAgro Pampeana SA", "industry": "Agro", "taxId": "30709876541" },
  "contacts": [
    { "firstName": "Ignacio", "lastName": "Lombardi", "jobTitle": "Director de Producción", "roleInSale": "Decision Maker" }
  ]
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase I - CRM Fundamentos (Sección 3.1 Directorio Relacional B2B):** Base de datos canónica para empresas y contactos interconectados.
