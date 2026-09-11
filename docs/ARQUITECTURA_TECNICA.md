# 🏗️ ARQUITECTURA TÉCNICA DETALLADA - Clientum Cloud

---

## 📐 DIAGRAMA DE CAPAS

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                           │
│                          (React 19)                                 │
├─────────────────────────────────────────────────────────────────────┤
│ • PublicSite (Landing, login, signup)                              │
│ • PrivateEnvironment (Dashboard, módulos)                          │
│ • Modal, Drawer, Toast components                                  │
│ • Tailwind CSS + Lucide Icons                                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT LAYER                         │
│                     (Context API + Hooks)                           │
├─────────────────────────────────────────────────────────────────────┤
│ CRMContext:                    ThemeContext:                        │
│ • user state                  • theme (light/dark)                 │
│ • auth modal state            • resolved theme                     │
│ • public/private switch       • CSS variables                      │
│ • module credentials                                               │
└──────────────────────────────┬──────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      INTEGRATION LAYER                              │
│                      (Firebase + APIs)                              │
├─────────────────────────────────────────────────────────────────────┤
│ Firebase Bridge:             API Layer:                             │
│ • subscribeToAuthState()     • fetch() calls                       │
│ • syncUserProfileToFirestore • /api/[...path] proxy               │
│ • signOut(), updateProfile() • HTTP interceptors                  │
│                                                                     │
│ Analytics:                   AI Services:                           │
│ • Google Analytics           • Gemini API calls                   │
│ • Event tracking             • Prompt engineering                 │
└──────────────────────────────┬──────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND LAYER                               │
│                      (Node.js + Express)                            │
├─────────────────────────────────────────────────────────────────────┤
│ server.ts (124 KB):                                                 │
│ • Express app initialization                                       │
│ • CORS middleware (cors package)                                   │
│ • HTTP proxy setup (http-proxy-middleware)                        │
│ • Static file serving                                              │
│ • Error handling middleware                                        │
│                                                                     │
│ crmRepository.ts:                                                   │
│ • Database queries (pg client)                                     │
│ • Prepared statements                                              │
│ • Transaction handling                                             │
│ • Connection pooling                                               │
│                                                                     │
│ API Routes:                                                         │
│ • /api/crm/* - CRM operations                                     │
│ • /api/auth/* - Authentication                                    │
│ • /api/erp/* - ERP/Billing                                        │
│ • /api/gemini/* - AI requests                                     │
│ • /api/whatsapp/* - WhatsApp                                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                              │
│                  (PostgreSQL + Firebase)                            │
├─────────────────────────────────────────────────────────────────────┤
│ PostgreSQL (Persistent):     Firebase (Real-time):                  │
│ • tenant_credentials         • users collection                     │
│ • crm_persistence            • tenants collection                   │
│ • payments                   • crm-sessions                        │
│ • data_quality               • public-leads                        │
│ • platform_billing           • activity logs                       │
│ • public_leads                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 FLUJO DE DATOS COMPLETO

### Caso 1: Crear un Contacto

```
┌─────────────────────┐
│ User clicks "Nuevo  │
│ Contacto" button    │
└────────────┬────────┘
             ↓
┌─────────────────────────────────────┐
│ NewRecordModal Component            │
│ (src/components/common/)            │
│ • Form inputs                       │
│ • Validation with Zod              │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│ CRMContext.addRecord()              │
│ (src/context/CRMContext.tsx)        │
│ • Update local state                │
│ • Prepare payload                   │
└────────────┬────────────────────────┘
             ↓
┌──────────────────────────────────────────────┐
│ fetch('/api/crm/contacts', {method: 'POST'})│
│ (src/lib/api.ts)                            │
│ • HTTP POST request                        │
│ • Include Firebase token                   │
└────────────┬─────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────┐
│ Express Backend Handler                      │
│ (server.ts + routes)                        │
│ • Validate token                            │
│ • Sanitize input                            │
│ • Check tenant permissions                  │
└────────────┬─────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────┐
│ crmRepository.createContact(data)            │
│ (server/crmRepository.ts)                    │
│ • Prepare INSERT SQL                        │
│ • Execute with pg client                    │
│ • Return record with ID                     │
└────────────┬─────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────┐
│ PostgreSQL INSERT                            │
│ INSERT INTO crm_persistence (...)            │
│ VALUES (...)                                 │
└────────────┬─────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────┐
│ Response 200 + JSON                          │
│ {id, name, email, created_at, ...}         │
└────────────┬─────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────┐
│ React Component receives data                │
│ • Update local state                        │
│ • Close modal                               │
│ • Show success toast                        │
└──────────────────────────────────────────────┘
```

### Caso 2: Gemini AI Copilot Request

```
┌─────────────────────────────────────┐
│ User clicks "AI Copilot" button     │
│ (FloatingAICopilotWidget.tsx)       │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────┐
│ AICopilotModal.tsx                                  │
│ • Collect context (current record, field)          │
│ • Build prompt                                      │
│ • Show loading state                               │
└────────────┬────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────┐
│ fetch('/api/gemini/complete', {                    │
│   method: 'POST',                                   │
│   body: JSON.stringify({prompt, context, ...})    │
│ })                                                  │
└────────────┬────────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ Backend: POST /api/gemini/complete                  │
│ (server.ts route handler)                           │
│ • Extract prompt from request                      │
│ • Initialize GoogleGenerativeAI client              │
│ • Add tenant context                               │
└────────────┬───────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ Google Gemini API                                    │
│ (@google/genai package)                             │
│ • generateContent(prompt)                           │
│ • Handle streaming (if applicable)                  │
└────────────┬───────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ Response: {text: "Generated suggestion..."}         │
└────────────┬───────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ Backend: Return JSON response                        │
└────────────┬───────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ Frontend: Display in AICopilotModal                 │
│ • Render markdown                                   │
│ • Add "Accept" / "Modify" buttons                   │
│ • Log analytics event                               │
└──────────────────────────────────────────────────────┘
```

---

## 📦 ESTRUCTURA DE TIPOS TYPESCRIPT

### Types Principales (src/types.ts)

```typescript
// User & Auth
interface CurrentUser {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
}

// CRM Records
interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company_id?: string;
  tags?: string[];
  created_at: Date;
  updated_at: Date;
  tenant_id: string;
}

interface Company {
  id: string;
  name: string;
  industry: string;
  website?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  employees?: number;
  created_at: Date;
  tenant_id: string;
}

interface Opportunity {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency: 'ARS' | 'USD';
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  probability: number; // 0-100
  contact_id: string;
  company_id: string;
  close_date?: Date;
  created_at: Date;
  tenant_id: string;
}

// Workflow & Automation
interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  label: string;
  config: Record<string, any>;
  position: {x: number, y: number};
}

interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: Array<{source: string, target: string}>;
  enabled: boolean;
  tenant_id: string;
}

// Tenant (Multi-tenancy)
interface Tenant {
  id: string;
  name: string;
  subscription_plan: 'free' | 'starter' | 'professional' | 'enterprise';
  subscription_status: 'active' | 'trial' | 'suspended';
  storage_limit_gb: number;
  users_limit: number;
  created_at: Date;
  created_by: string;
}

// Error Response
interface ErrorResponse {
  error: string;
  code?: string;
  status: number;
  details?: Record<string, any>;
}
```

---

## 🔐 FLUJO DE AUTENTICACIÓN DETALLADO

### Login Flow

```
┌──────────────────────────────────┐
│ User visit www.clientum.com.ar   │
└────────────┬─────────────────────┘
             ↓
┌──────────────────────────────────────────────┐
│ App.tsx checks isAuthReady                    │
│ • Firebase initializing                      │
│ • Show "Verificando sesión..."              │
└────────────┬─────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ FirebaseAuthBridge component                        │
│ subscribeToAuthState() listener registered          │
└────────────┬─────────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ User has NO active Firebase session                 │
│ → Show PublicSite (landing page)                    │
│ → AuthModal available (login form)                  │
└────────────┬─────────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ User clicks "Iniciar Sesión"                        │
│ AuthModal opens                                      │
│ • Google login button                               │
│ • Email/Password option                             │
└────────────┬─────────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ Option A: Google OAuth                              │
│ • Firebase.auth().signInWithPopup(googleProvider)  │
│ • User approves scopes                              │
└────────────┬─────────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ Firebase Auth State Update                          │
│ subscribeToAuthState callback fires with fbUser    │
└────────────┬─────────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ FirebaseAuthBridge Logic:                           │
│ 1. Check userId !== lastUserId (first login)       │
│ 2. Call syncUserProfileToFirestore():              │
│    • Create/update doc in /users/{uid}             │
│    • Fields: email, displayName, photoURL, etc.    │
│ 3. Call syncClerkAuth():                           │
│    • Update CRMContext.user                        │
│    • Set isAuthenticated = true                    │
└────────────┬─────────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ App.tsx detects:                                     │
│ • isAuthenticated = true                            │
│ • isPrivateRoute = true (if in /app/*)              │
│ • Render PrivateEnvironment (React.Suspense)       │
└────────────┬─────────────────────────────────────────┘
             ↓
┌──────────────────────────────────────────────────────┐
│ PrivateEnvironment Component loads                  │
│ • Sidebar + Navbar                                  │
│ • Module navigation                                 │
│ • CRM Data                                          │
└──────────────────────────────────────────────────────┘
```

### Logout Flow

```
┌─────────────────────────────────────┐
│ User clicks "Cerrar Sesión"         │
└────────────┬────────────────────────┘
             ↓
┌──────────────────────────────────────┐
│ CRMContext.logout() called           │
│ • Firebase.auth().signOut()          │
└────────────┬─────────────────────────┘
             ↓
┌──────────────────────────────────────┐
│ Firebase Auth State Update           │
│ subscribeToAuthState(null)           │
└────────────┬─────────────────────────┘
             ↓
┌──────────────────────────────────────┐
│ FirebaseAuthBridge updates:          │
│ • syncClerkAuth(null)               │
│ • isAuthenticated = false            │
└────────────┬─────────────────────────┘
             ↓
┌──────────────────────────────────────┐
│ App.tsx detects change               │
│ • Redirect to /                      │
│ • Show PublicSite again              │
└──────────────────────────────────────┘
```

---

## 📡 API ENDPOINTS

### CRM Endpoints

```bash
# Contactos
GET    /api/crm/contacts              # Listar
POST   /api/crm/contacts              # Crear
GET    /api/crm/contacts/:id          # Obtener
PUT    /api/crm/contacts/:id          # Actualizar
DELETE /api/crm/contacts/:id          # Eliminar

# Empresas
GET    /api/crm/companies
POST   /api/crm/companies
PATCH  /api/crm/companies/:id

# Oportunidades
GET    /api/crm/opportunities?stage=lead
POST   /api/crm/opportunities
PUT    /api/crm/opportunities/:id/stage

# Actividades
GET    /api/crm/activities?contact_id=x
POST   /api/crm/activities
```

### ERP Endpoints

```bash
# Facturación
POST   /api/erp/invoices              # Crear factura
GET    /api/erp/invoices/:id          # Obtener PDF
PUT    /api/erp/invoices/:id/mark-paid

# AFIP Integration
POST   /api/erp/afip/auth              # Obtener token
POST   /api/erp/afip/sync              # Sincronizar

# Inventario
GET    /api/erp/inventory
PATCH  /api/erp/inventory/:product_id
```

### AI Endpoints

```bash
# Gemini Integration
POST   /api/gemini/complete            # Text generation
POST   /api/gemini/analyze             # Analysis
POST   /api/gemini/suggest             # Suggestions

# Chat Copilot
WS     /ws/copilot/:session_id         # WebSocket chat
```

### WhatsApp Endpoints

```bash
# Incoming webhook
POST   /api/whatsapp/webhook           # Baileys/Twilio

# Send message
POST   /api/whatsapp/send
{
  "to": "+541234567890",
  "message": "Hola",
  "template_id": "opt"
}

# Templates
GET    /api/whatsapp/templates
```

### Integrations

```bash
# Google Maps
GET    /api/maps/geocode?address=...

# Email
POST   /api/email/send
{
  "to": "user@example.com",
  "subject": "...",
  "html": "..."
}

# CSV Import
POST   /api/import/csv
```

---

## 🗄️ SCHEMA DE POSTGRESQL

### Tabla: `tenant_credentials`
```sql
CREATE TABLE tenant_credentials (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  service_name VARCHAR(50),           -- 'google', 'whatsapp', 'afip'
  encrypted_config JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

### Tabla: `crm_persistence`
```sql
CREATE TABLE crm_persistence (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  record_type VARCHAR(50),            -- 'contact', 'company', 'opportunity'
  data JSONB,                         -- Almacena datos del registro
  created_by UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,               -- Soft delete
  search_text TSVECTOR,               -- Full-text search
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

### Tabla: `payments`
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  invoice_id UUID,
  amount DECIMAL(10, 2),
  currency VARCHAR(3),                -- 'ARS', 'USD'
  status VARCHAR(50),                 -- 'pending', 'completed', 'failed'
  payment_method VARCHAR(50),         -- 'transfer', 'card', 'cash'
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

### Tabla: `platform_billing`
```sql
CREATE TABLE platform_billing (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  subscription_plan VARCHAR(50),
  billing_cycle_start DATE,
  billing_cycle_end DATE,
  amount DECIMAL(10, 2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

---

## 🔄 CICLO DE COMPILACIÓN Y DESPLIEGUE

### Build Process

```bash
# 1. Development
npm run dev
# Inicia:
# • tsx server.ts (Node servidor con reload)
# • Vite dev server (hot reload React)
# • Puerto 5173 (Vite) + 3000 (Express)

# 2. Production Build
npm run build
# Ejecuta secuencialmente:
# A) vite build
#    └─ Compila src/ → dist/
#    └─ Optimiza JS/CSS
#    └─ Genera sourcemaps
#
# B) esbuild server.ts
#    └─ Bundlea server.ts
#    └─ Formato: CJS (Node compatible)
#    └─ Output: dist/server.cjs
#
# 3. Start
npm run start
# node dist/server.cjs
# Sirve assets estáticos + API

# 4. Deployment
git push origin main
# Vercel webhook triggered
# • Instala dependencies
# • Ejecuta build
# • Deploy automático
```

### Deploy en Vercel

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 60
    }
  }
}
```

**Environment Variables (en Vercel):**
```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
FIREBASE_ADMIN_SDK=xxx
GOOGLE_GENAI_API_KEY=xxx
DATABASE_URL=postgresql://user:pass@host/db
CLERK_SECRET_KEY=xxx
```

---

## 🧪 TESTING STRATEGY

### Smoke Tests (Incluidos)

```bash
npm run smoke:navigation
# Verifica que todas las rutas existan
# Detecta links rotos

npm run smoke:credentials
# Asegura aislamiento de credenciales
# Verifica env vars no exponerse

npm run check:root-layout
# Valida estructura de Layout root
# Detecta imports duplicados
```

### Unit Tests (Recomendado)

```typescript
// example: src/components/common/NewRecordModal.test.tsx
import {render, screen, fireEvent} from '@testing-library/react';
import NewRecordModal from './NewRecordModal';

describe('NewRecordModal', () => {
  it('should submit form with valid data', () => {
    // Test logic
  });
});
```

### Integration Tests (Recomendado)

```typescript
// example: auth.integration.test.ts
describe('Authentication Flow', () => {
  it('should login with Google and sync to Firestore', async () => {
    // Test Firebase + Firestore sync
  });
});
```

---

## 🚀 ROADMAP & NEXT STEPS

### Q4 2026
- ✅ MVP CRM (contactos, oportunidades)
- ✅ WhatsApp integration
- 🟡 Gemini Copilot (beta)
- 🟡 AFIP facturación básica

### Q1 2027
- 🔴 Workflows avanzados
- 🔴 Payment gateway integration (Stripe)
- 🔴 Two-factor authentication
- 🔴 Analytics dashboard completion

### Q2 2027
- 🔴 Mobile app (React Native)
- 🔴 API public docs
- 🔴 Marketplace integraciones
- 🔴 Performance optimization

---

## 📋 CHECKLIST DE DEPLOYMENT

- [ ] Todas las env vars configuradas
- [ ] Firebase rules actualizadas
- [ ] PostgreSQL backups funcional
- [ ] DNS records validados (Clerk)
- [ ] Rate limiting configurado
- [ ] Logs centralizados (Sentry/DataDog)
- [ ] CDN configurado (Cloudflare)
- [ ] SSL/TLS vigente
- [ ] Smoke tests pasing
- [ ] Performance audit (Lighthouse >80)

---

*Documento técnico generado automáticamente | Clientum Cloud v0.0.0*
