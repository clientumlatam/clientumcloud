# ClientumCRM — Checklist antes de producción

## Clerk

- [ ] `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY` y `VITE_CLERK_PUBLISHABLE_KEY`
      provienen de la misma instancia y entorno (sin mezclar `test`/`live`).
- [ ] `VITE_CLERK_PROXY_URL` resuelve al proxy same-origin `/api/__clerk` en
      producción — no un subdominio propio (`clerk.www.*`, `clerk.*`).
- [ ] Publicado y verificado sin CORS, sin `failed_to_load_clerk_js` y sin
      bucles de redirección de sesión.

## Base de datos

- [x] `DATABASE_URL` / `NEON_DATABASE_URL` administradas por Replit/Neon —
      no se solicitan ni se pegan manualmente.

## IA

- [ ] `GEMINI_API_KEY` con valor real en Replit Secrets para habilitar IA
      real (sin esto, la app sigue en modo fallback).

## Firebase

- [x] `VITE_FIREBASE_*` consumido y la app no inicializa con valores vacíos.
- [ ] Reglas de Firebase Auth/Firestore revisadas contra acceso público
      accidental y aislamiento por tenant.

## Pagos, SMS y WhatsApp

- [ ] Proveedor de pagos elegido, con endpoints firmados e idempotentes.
- [ ] Un único proveedor SMS elegido y configurado en backend (no cargar
      credenciales de los tres proveedores a la vez).
- [ ] Envío WhatsApp vía Meta implementado antes de habilitar envíos reales.

## AFIP

- [ ] Homologación y producción separadas explícitamente
      (`AFIP_ENVIRONMENT` sin depender de un valor implícito).

## Seguridad general

- [ ] Cualquier token expuesto en código, chat o logs, rotado.
- [ ] Permisos por rol revisados antes de habilitar cobros, exportaciones,
      facturación o administración de credenciales.

---

## Resultado de la última auditoría (2026-09-08)

- **Clerk:** configuración administrada reportada por Replit, existen las
  tres claves principales en Secrets, pero no se pudo verificar coincidencia
  de instancia sin exponer valores. `VITE_CLERK_PROXY_URL` no configurado
  aún; no hay publicación de producción activa.
- **Gemini, Mercado Pago, WhatsApp:** secretos de plataforma no configurados.
  Rutas de Mercado Pago y webhook firmado de WhatsApp preparados, pero no
  habilitar como producción hasta cargar credenciales y probar.
- **Firebase:** evita inicializar con config vacía; reglas de Firestore
  exigen autenticación pero no documentan aislamiento por tenant — no
  guardar datos multi-tenant ahí hasta cerrar esa revisión.
- **AFIP y SMS:** capacidades preparadas o simuladas; sin conexión de
  producción configurada.
- **Base de datos:** variable administrada, no reemplazar manualmente.
- **Producción:** sin deployment activo — falta validar proxy real de
  Clerk, login/logout y errores de dominio público en vivo.
- **Credenciales expuestas:** cualquier clave pegada en archivos adjuntos,
  código o logs debe revocarse y regenerarse.
