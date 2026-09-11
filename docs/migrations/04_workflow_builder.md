# 4. Automatización Visual tipo Diagrama de Flujo (Workflow Builder)

## 📌 Origen y Contexto
Extraído de las aplicaciones de automatización no-code estilo Zapier / Make con nodos interactivos y conexiones visuales de eventos.

## 🚀 Capacidades a Migrar a Clientum
1. **Diseñador Visual de Workflows (Drag & Drop / Nodos):**
   - Lienzo interactivo donde los administradores pueden conectar Triggers (Ej: "Nuevo Lead Creado") con Acciones (Ej: "Enviar WhatsApp", "Asignar Vendedor por Round-Robin", "Crear Tarea").
2. **Condicionales y Bifurcaciones:**
   - Reglas lógicas (Si el monto del trato > $10,000 USD $\rightarrow$ Asignar al Gerente Comercial; Si es menor $\rightarrow$ Asignar a SDR junior).
3. **Historial de Ejecución y Logs de Errores:**
   - Panel de auditoría para verificar cuántas veces se ejecutó cada regla y detectar fallos en webhooks externos.

## 🛠️ Stack Tecnológico Propuesto
- **Librería Frontend:** React Flow o custom SVG connection lines con nodos arrastrables.
- **Motor Backend:** Procesador de eventos asíncronos basado en triggers de base de datos.
