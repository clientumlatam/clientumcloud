# 1. Módulo de Prospección Geolocalizada (Google Maps & Places API)

## 📌 Origen y Contexto
Extraído de las aplicaciones de prospección comercial basadas en mapas y geolocalización. Permite descubrir negocios locales, clientes potenciales B2B y competidores directamente sobre la interfaz cartográfica.

## 🚀 Capacidades a Migrar a Clientum
1. **Buscador de Negocios B2B por Radio y Rubro:**
   - Consultas directas (ej: "Clínicas médicas en Palermo", "Empresas de logística en Santiago de Chile").
   - Filtrado por calificación de Google Maps, estado abierto/cerrado y distancia.
2. **Importación con 1 Clic al CRM:**
   - Conversión inmediata de un marcador de Google Maps en un **Lead** o **Empresa** formal con nombre, dirección postal, coordenadas GPS, teléfono y sitio web.
3. **Enriquecimiento de Datos:**
   - Obtención automática de reseñas públicas y horarios comerciales para evaluar el tamaño y madurez del prospecto antes de realizar la llamada comercial.

## 🛠️ Stack Tecnológico Propuesto
- **Frontend:** Google Maps JavaScript SDK / Leaflet con marcadores personalizados y clustering.
- **Backend:** Proxy `/api/maps/search` para consultar la API de Google Places sin exponer credenciales en el navegador.
