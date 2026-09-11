# 9. Directorio de Contactos y Enriquecimiento de Datos B2B
**ID de Aplicación Origen:** `2fb77921-7f3f-4047-8d56-4fef383fa37b`

## 📌 Origen y Contexto
Extraído de las aplicaciones de gestión de bases de datos de contactos, agendas corporativas y directorios B2B.

## 🚀 Capacidades a Migrar a Clientum
1. **Directorio Jerárquico Empresa $\rightarrow$ Contactos:**
   - Relación uno a muchos donde una Empresa agrupa múltiples contactos (Directores, Compradores, Técnicos) con sus cargos y redes sociales (LinkedIn).
2. **Historial de Interacciones por Contacto:**
   - Registro detallado de llamadas, reuniones, notas y mensajes de cada persona dentro de la organización cliente.
3. **Importación y Exportación Masiva (CSV / Excel):**
   - Asistente de importación con mapeo automático de columnas para migrar bases de datos existentes desde otros CRMs (HubSpot, Salesforce, Excel).

## 🛠️ Stack Tecnológico Propuesto
- **Parsing:** PapaParse para lectura de archivos CSV en el cliente y validación previa antes de insertar en la base de datos.
- **UI:** Tablas con paginación, búsqueda instantánea y filtros avanzados por etiqueta y cargo.
