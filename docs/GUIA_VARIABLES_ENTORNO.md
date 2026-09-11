# 🔐 GUÍA DE VARIABLES DE ENTORNO - Clientum Cloud

**Fecha:** 11 de Septiembre 2026  
**Proyectos:** ClientumCRM + ClientumOS (Google AI Studio)

---

## 📋 RESUMEN EJECUTIVO

Clientum Cloud requiere **43+ variables de entorno** para funcionamiento completo. Están divididas en 8 categorías según servicio/funcionalidad.

⚠️ **IMPORTANTE:** Todas las variables están clasificadas como `Secret value` en Google AI Studio → NO deben exponerse en repos públicos.

---

## 🗂️ CATEGORÍAS DE SECRETOS

### 1. 🌐 DOMINIOS & EMAIL
| Variable | Propósito | Tipo |
|----------|----------|------|
| `ALLOWED_DOMAINS` | Dominios autorizados para acceso | Config |
| `ALLOWED_EMAIL_DOMAIN` | Dominio de email corporativo | Config |

**Ejemplo:**
```env
ALLOWED_DOMAINS=clientum.com.ar,admin.clientum.com.ar
ALLOWED_EMAIL_DOMAIN=clientum.com.ar
```

### 2. 🔥 FIREBASE (Auth + Firestore)
| Variable | Propósito | Requerida |
|----------|----------|----------|
| `VITE_FIREBASE_API_KEY` | Public API key | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth subdomain | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | Project ID | ✅ |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket | ✅ |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Push notifications | ✅ |
| `VITE_FIREBASE_APP_ID` | App identifier | ✅ |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics | ⚠️ Opcional |

**Ubicación en código:**
```typescript
// src/firebase.ts
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};
```

### 3. 🤖 GOOGLE CLOUD & GEMINI AI
| Variable | Propósito | Servicio |
|----------|----------|----------|
| `GOOGLE_ACCESS_TOKEN` | OAuth token | Google Workspace |
| `GOOGLE_GENAI_API_KEY` | Gemini API key | Google AI API |

**Integración:**
```typescript
// src/components/ai/AICopilotModal.tsx
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-pro"});
```

### 4. 📱 META (WhatsApp + Instagram)
| Variable | Propósito | Requerida |
|----------|----------|----------|
| `META_WA_ACCESS_TOKEN` | WhatsApp API token | ✅ |
| `META_WA_APP_SECRET` | Webhook verification | ✅ |
| `META_WA_BUSINESS_ACCOUNT_ID` | Business account ID | ✅ |
| `META_WA_PHONE_NUMBER` | Numero de teléfono | ✅ |
| `META_WA_VERIFY_TOKEN` | Webhook token | ✅ |

**Webhook Configuration:**
```
POST https://www.clientum.com.ar/api/whatsapp/webhook
Verify Token: ${META_WA_VERIFY_TOKEN}
```

### 5. ✏️ SANTI LANDLINE (Comunicaciones)
| Variable | Propósito | Tipo |
|----------|----------|------|
| `SANTI_API_KEY` | API key para servicio | Integration |

### 6. 🌐 VERCEL (Deployment + Analytics)
| Variable | Propósito | Tipo |
|----------|----------|------|
| `VERCEL_ACCESS_TOKEN` | Deploy token | CI/CD |
| `VERCEL_TEAM_ID` | Team identifier | Config |

**Uso:**
```bash
vercel --token ${VERCEL_ACCESS_TOKEN} --scope ${VERCEL_TEAM_ID}
```

### 7. ☁️ CLOUDFLARE (DNS + Email + CDN)
| Variable | Propósito | Requerida |
|----------|----------|----------|
| `CLOUDFLARE_API_TOKEN` | Zone API token | ✅ |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID | ✅ |
| `CLOUDFLARE_ZONE_ID` | Domain zone ID | ✅ |
| `WEBMAIL_PASSWORD` | Email password | ✅ |
| `WEBMAIL_WORKER_URL` | Worker endpoint | ✅ |

**Configuración Webmail:**
```typescript
// Cloudflare Worker para email proxy
fetch(`${process.env.WEBMAIL_WORKER_URL}/read-email`, {
  headers: {'Authorization': `Bearer ${process.env.WEBMAIL_PASSWORD}`}
})
```

---

## 🛢️ BASE DE DATOS

| Variable | Propósito | Tipo |
|----------|----------|------|
| `NEON_DATABASE_URL` | PostgreSQL connection string | Requerida |
| `DATABASE_URL` | Fallback DB connection | Requerida |

**Formato:**
```
postgresql://username:password@host:5432/database?sslmode=require
```

**Migraciones:**
```bash
npm run db:migrate
# Lee NEON_DATABASE_URL y ejecuta migrations/
```

---

## 🔐 ENCRIPTACIÓN & SEGURIDAD

| Variable | Propósito | Longitud |
|----------|----------|----------|
| `WORKFLOW_ENCRYPTION_KEY` | AES encryption key | 32 chars |
| `SESSION_SECRET` | Session cookie key | 32+ chars |
| `API_KEY_PEPPER` | Password hashing pepper | 16+ chars |

**Uso:**
```typescript
// Encriptar workflow configs
const encrypted = encrypt(workflow.config, process.env.WORKFLOW_ENCRYPTION_KEY);

// Session management
sessionStorage.setId(userID, process.env.SESSION_SECRET);
```

---

## 👤 ADMIN & APIKEYS

| Variable | Propósito | Tipo |
|----------|----------|------|
| `CLIENTUM_APIKEY_ADMIN` | Admin API key | Access Control |
| `ALLOW_ADMIN_TOKEN_OVERRIDE` | Debug flag | Development only |

**Protección:**
```typescript
// server.ts
if (req.headers['x-api-key'] !== process.env.CLIENTUM_APIKEY_ADMIN) {
  return res.status(401).json({error: 'Unauthorized'});
}
```

---

## 🗺️ INTEGRACIONES ADICIONALES

### AFIP (Facturación Argentina)
```env
VAPI_PRIVATE_KEY=        # Clave privada certificado AFIP
VAPI_PUBLIC_KEY=         # Clave pública certificado AFIP
```

### Performance Monitoring
```env
DISABLE_HMR=false        # Vite HMR (AI Studio)
```

---

## 📊 MATRIZ COMPLETA DE VARIABLES

### ClientumCRM (Screenshot 1)
```
ALLOWED_DOMAINS ✓
ALLOWED_EMAIL_DOMAIN ✓
VITE_FIREBASE_API_KEY ✓
VITE_FIREBASE_AUTH_DOMAIN ✓
VITE_FIREBASE_PROJECT_ID ✓
VITE_FIREBASE_STORAGE_BUCKET ✓
VITE_FIREBASE_MESSAGING_SENDER_ID ✓
VITE_FIREBASE_APP_ID ✓
GOOGLE_ACCESS_TOKEN ✓
SANTI_API_KEY ✓
META_WA_ACCESS_TOKEN ✓
META_WA_APP_SECRET ✓
META_WA_BUSINESS_ACCOUNT_ID ✓
META_WA_PHONE_NUMBER ✓
META_WA_VERIFY_TOKEN ✓
VAPI_PRIVATE_KEY ✓
VAPI_PUBLIC_KEY ✓
WEBMAIL_PASSWORD ✓
WEBMAIL_WORKER_URL ✓
```

### ClientumOS (Screenshot 2)
```
DISABLE_HMR ✓
NEON_DATABASE_URL ✓
WORKFLOW_ENCRYPTION_KEY ✓
API_KEY_PEPPER ✓
SESSION_SECRET ✓
CLIENTUM_APIKEY_ADMIN ✓
VERCEL_ACCESS_TOKEN ✓
VERCEL_TEAM_ID ✓
CLOUDFLARE_API_TOKEN ✓
CLOUDFLARE_ACCOUNT_ID ✓
CLOUDFLARE_ZONE_ID ✓
VITE_FIREBASE_API_KEY ✓ (duplicada)
VITE_FIREBASE_AUTH_DOMAIN ✓ (duplicada)
VITE_FIREBASE_PROJECT_ID ✓ (duplicada)
VITE_FIREBASE_STORAGE_BUCKET ✓ (duplicada)
VITE_FIREBASE_MESSAGING_SENDER_ID ✓ (duplicada)
VITE_FIREBASE_APP_ID ✓ (duplicada)
VITE_FIREBASE_MEASUREMENT_ID ✓
```

---

## ⚡ ORDEN DE INICIALIZACIÓN

### 1️⃣ **Startup Sequence**

```
App Load
  ↓
├─ Load env vars (dotenv)
├─ Initialize Firebase (VITE_FIREBASE_*)
├─ Connect PostgreSQL (NEON_DATABASE_URL)
├─ Initialize Cloudflare (CLOUDFLARE_*)
├─ Initialize Google Cloud (GOOGLE_GENAI_API_KEY)
├─ Initialize WhatsApp (META_WA_*)
├─ Start Vercel deployment hooks
└─ Ready for requests
```

### 2️⃣ **Environment Validation Script**

```typescript
// scripts/validate-env.mjs
const required = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'NEON_DATABASE_URL',
  'CLOUDFLARE_API_TOKEN',
  'META_WA_ACCESS_TOKEN',
  'GOOGLE_GENAI_API_KEY',
];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ Missing required: ${key}`);
    process.exit(1);
  }
}
console.log('✅ All env vars present');
```

---

## 🔍 AUDITORÍA DE SECRETOS

### Scanning Tools
```bash
# Detectar secrets expuestos en código
npm install --save-dev @trufflesecurity/trufflehog

trufflehog filesystem . --json

# ESLint plugin para env vars
npm install --save-dev eslint-plugin-no-secrets
```

### .env.example (Template - NO SECRETS!)
```
# Dominios
ALLOWED_DOMAINS=
ALLOWED_EMAIL_DOMAIN=

# Firebase (obtener de Firebase Console)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Google Cloud
GOOGLE_ACCESS_TOKEN=
GOOGLE_GENAI_API_KEY=

# Meta (WhatsApp)
META_WA_ACCESS_TOKEN=
META_WA_APP_SECRET=
META_WA_BUSINESS_ACCOUNT_ID=
META_WA_PHONE_NUMBER=
META_WA_VERIFY_TOKEN=

# Base de datos
NEON_DATABASE_URL=

# Seguridad
WORKFLOW_ENCRYPTION_KEY=
SESSION_SECRET=
API_KEY_PEPPER=

# Admin
CLIENTUM_APIKEY_ADMIN=

# Vercel
VERCEL_ACCESS_TOKEN=
VERCEL_TEAM_ID=

# Cloudflare
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ZONE_ID=
WEBMAIL_PASSWORD=
WEBMAIL_WORKER_URL=

# AFIP
VAPI_PRIVATE_KEY=
VAPI_PUBLIC_KEY=

# Desarrollo
DISABLE_HMR=false
```

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Todas las variables de entorno configuradas en Vercel
- [ ] Firebase credentials validadas
- [ ] PostgreSQL connection tested
- [ ] Cloudflare DNS updated
- [ ] WhatsApp webhook verified
- [ ] Gemini API quota disponible
- [ ] Secrets NO committeadas en git
- [ ] .env.example actualizado (sin valores)
- [ ] Rotation de keys planeada (30-60 days)
- [ ] Backup de secrets en gestor seguro (1Password, Vault)

---

## 🔄 ROTACIÓN DE SECRETOS (Quarterly)

### Checklist por servicio:

**Firebase:**
- [ ] Regenerar API key en Firebase Console
- [ ] Actualizar VITE_FIREBASE_API_KEY
- [ ] Test login flow

**Meta (WhatsApp):**
- [ ] Regenerar access token en Meta Dashboard
- [ ] Actualizar META_WA_ACCESS_TOKEN
- [ ] Verificar webhook funcional

**PostgreSQL:**
- [ ] Cambiar contraseña en Neon console
- [ ] Actualizar NEON_DATABASE_URL
- [ ] Test conexión

**Cloudflare:**
- [ ] Regenerar API token
- [ ] Actualizar CLOUDFLARE_API_TOKEN
- [ ] Test DNS updates

**Session Keys:**
- [ ] Regenerar SESSION_SECRET
- [ ] Invalidar todas las sesiones activas
- [ ] Forzar re-login

---

## 📞 SOPORTE & RECURSOS

### Obtener Secrets

| Servicio | Ubicación | Instrucciones |
|----------|----------|---------------|
| Firebase | console.firebase.google.com | Project Settings → General |
| Meta | developers.facebook.com/apps | Settings → Basic |
| Google Cloud | console.cloud.google.com | APIs & Services → Credentials |
| Cloudflare | dash.cloudflare.com | Account → API Tokens |
| Vercel | vercel.com/dashboard | Settings → Tokens |
| PostgreSQL (Neon) | console.neon.tech | Connection String |

### Documentación Oficial
- 🔗 Firebase: https://firebase.google.com/docs
- 🔗 Meta WhatsApp: https://developers.facebook.com/docs/whatsapp
- 🔗 Google Gemini: https://ai.google.dev/docs
- 🔗 Cloudflare: https://developers.cloudflare.com/
- 🔗 Vercel: https://vercel.com/docs

---

## ✅ VALIDACIÓN FINAL

```bash
# Script para verificar todas las vars
npm run validate:env

# Test de conexiones
npm run test:connections

# Deploy de prueba
vercel deploy --prebuilt
```

---

*Guía de Secrets v1.0 | Clientum Cloud | Septiembre 2026*
*⚠️ CONFIDENCIAL - NO COMPARTIR VALORES REALES*
