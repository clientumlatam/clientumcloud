# 👥 Análisis Técnico de Migración: App 02 - Directorio B2B & Enriquecimiento de Contactos
**ID de Aplicación de Origen:** `2fb77921-7f3f-4047-8d56-4fef383fa37b`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/2fb77921-7f3f-4047-8d56-4fef383fa37b](https://aistudio.google.com/u/0/apps/2fb77921-7f3f-4047-8d56-4fef383fa37b)  
**Rol en el Ecosistema:** Gestión Relacional B2B, Estructura Jerárquica Empresa-Personas, Importador Universal CSV y Perfiles Corporativos.  
**Estado de Integración:** 100% Operativo en Directorio y CSV Studio.

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
A diferencia de los CRMs orientados a B2C donde el contacto individual es la única entidad, esta aplicación resuelve la complejidad de la venta consultiva empresarial B2B:
- **Cuentas Corporativas Multidecisores:** Una empresa cliente (`Company`) contiene múltiples personas vinculadas (`People`) con diferentes roles en la decisión de compra.
- **Ingesta de Carteras Heredadas:** Herramienta de importación masiva desde Excel o CSV con normalización semántica de encabezados.
- **Línea de Vida Unificada:** Historial de toques (llamadas, correos, reuniones, notas) centralizado a nivel cuenta y a nivel persona.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo de Mapeo Semántico de Columnas CSV
Para evitar fricción al importar bases de contactos con diferentes estructuras:
- **Diccionario de Sinónimos de Encabezados:**
  - `Empresa` $\leftarrow$ `["empresa", "company", "razon_social", "razón social", "organization", "cuenta"]`
  - `Nombre` $\leftarrow$ `["nombre", "first_name", "firstname", "contacto", "lead_name"]`
  - `Apellido` $\leftarrow$ `["apellido", "last_name", "surname"]`
  - `Email` $\leftarrow$ `["email", "correo", "e-mail", "mail", "correo electrónico"]`
  - `Teléfono` $\leftarrow$ `["telefono", "teléfono", "phone", "whatsapp", "celular", "mobile"]`
  - `Cargo / Rol` $\leftarrow$ `["cargo", "puesto", "job_title", "title", "rol", "position"]`
- **Tolerancia de Similitud Léxica:** Detección de cadenas mediante distancia de Levenshtein normalizada para sugerir automáticamente el mapeo con $>80\%$ de confianza.

### 2.2. Algoritmo de Desduplicación y Merge Inteligente
1. Comprobación de existencia por CUIT / RFC / Tax ID (clave unívoca primaria).
2. Comprobación por Dominio Web Normalizado (ej. `acme.com` extraído de `contacto@acme.com` o `https://www.acme.com`).
3. Comprobación de Personas por Email normalizado (`trim().toLowerCase()`).
4. Si existe coincidencia: En lugar de descartar o sobrescribir ciegamente, adjunta las nuevas notas y teléfonos como canales secundarios respetando la fecha del contacto original.

---

## 3. 🗄️ Modelos de Datos y Esquemas Técnicos

### 3.1. Modelo Jerárquico Empresa (`Company`)
```typescript
export interface Company {
  id: string;
  name: string;
  legalName?: string;
  taxId?: string; // CUIT / RFC / NIF
  domain: string;
  industry: string;
  tier: 'Startup' | 'SMB' | 'Mid-Market' | 'Enterprise';
  employeeRange?: '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
  annualRevenueEstimate?: number;
  phone: string;
  address: string;
  city: string;
  country: string;
  website: string;
  linkedinUrl?: string;
  assignedAdvisorId: string;
  status: 'Lead' | 'Prospecto' | 'Cliente Activo' | 'Inactivo';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### 3.2. Modelo Contacto de Decisión (`Person`)
```typescript
export interface Person {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsappPhone?: string;
  jobTitle: string;
  decisionRole: 'Decision Maker' | 'Influencer' | 'Procurement' | 'End User' | 'Blocker';
  department: 'Dirección' | 'Finanzas' | 'Compras' | 'Tecnología' | 'Operaciones';
  linkedinUrl?: string;
  status: 'Lead' | 'Contactado' | 'Cliente' | 'Ex-Empleado';
  isPrimaryContact: boolean;
  notes?: string;
  lastContactedAt?: string;
  createdAt: string;
}
```

---

## 4. 🧩 Componentes UI Clave a Adaptar para Clientum

| Componente | Archivo en Clientum | Funcionalidad Adaptada |
|---|---|---|
| `CompanyHierarchyTree` | `/src/components/companies/CompaniesView.tsx` | Visualización en acordeón mostrando cada empresa y la lista de sus decisores vinculados con acciones rápidas de WhatsApp/Email. |
| `SmartCSVImporterModal` | `/src/components/csv/CSVStudioView.tsx` | Asistente en 4 pasos (Subir archivo $\rightarrow$ Mapear columnas $\rightarrow$ Validar duplicados $\rightarrow$ Ingestar en base de datos). |
| `ContactActivityTimeline` | `/src/components/people/PeopleView.tsx` | Feed vertical que unifica llamadas registradas, correos enviados y notas comerciales por contacto. |
| `EnrichmentBadge` | `/src/components/companies/CompanyDetailModal.tsx` | Chip visual que muestra el favicon de la empresa, tecnologías detectadas y enlace directo al perfil corporativo. |

---

## 5. 🔌 Endpoints API y Servicios Backend

```http
### Importación masiva de lote de contactos
POST /api/contacts/import-batch
Content-Type: application/json

{
  "source": "csv_import",
  "duplicateStrategy": "update_existing",
  "records": [
    {
      "companyName": "Tech Soluciones SA",
      "domain": "techsoluciones.com",
      "firstName": "Martín",
      "lastName": "Gómez",
      "email": "mgomez@techsoluciones.com",
      "phone": "+5491144332211",
      "role": "Director de IT"
    }
  ]
}

### Enriquecimiento de perfil por dominio
GET /api/companies/enrich?domain=techsoluciones.com
```

---

## 6. 🗺️ Mapeo con `project_archive/plan_consolidado_proyecto.md`
- **Fase I - Fundamentos (Sección 3.1 Base de datos comercial):** Árbol de cuentas B2B, aislamiento por workspace, prevención de duplicados e importador CSV.
- **Módulo de Migración Derivado:**
  - `09_contacts_enrichment.md`
