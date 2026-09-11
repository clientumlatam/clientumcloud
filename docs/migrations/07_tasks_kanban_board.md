# 7. Gestor Avanzado de Tareas y Tableros Kanban de Operaciones
**ID de Aplicación Origen:** `13d2cca5-c20a-4308-a64c-692a60321693`

## 📌 Origen y Contexto
Extraído de las aplicaciones de gestión de tareas estilo Trello/Asana, tableros de proyectos internos y control de entregas operativas.

## 🚀 Capacidades a Migrar a Clientum
1. **Vistas Duales (Lista vs Tablero Kanban de Tareas):**
   - Posibilidad de organizar las tareas del equipo comercial en columnas por estado (`Por Hacer`, `En Proceso`, `Revisión`, `Completado`).
2. **Asignación y Filtros por Prioridad y Vendedor:**
   - Asignar tareas a miembros específicos del equipo con etiquetas de prioridad (`Baja`, `Media`, `Alta`, `Urgente`) y fechas límite con alertas de vencimiento.
3. **Sincronización con el Pipeline del CRM:**
   - Cada tarea puede estar vinculada opcionalmente a un Trato (Oportunidad) o Empresa específica, unificando la operación diaria con las ventas.

## 🛠️ Stack Tecnológico Propuesto
- **Frontend:** Componentes de arrastre y soltar (drag-and-drop nativo o @hello-pangea/dnd) con filtros avanzados por fecha y asignado.
- **Base de Datos:** Colección `tasks` en Firestore / LocalState con índices optimizados por fecha de vencimiento (`dueDate`).
