# 📅 03. Calendario Comercial, Scheduler de Demos & Reservas de Citas
**ID de Aplicación:** `5f0f8123-8234-454a-a069-b237a07c73fb`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/5f0f8123-8234-454a-a069-b237a07c73fb](https://aistudio.google.com/u/0/apps/5f0f8123-8234-454a-a069-b237a07c73fb)  
**Rol en el Ecosistema:** Agenda de Ventas, Agendamiento Público de Demos (Calendly autónomo) y Sincronización de Citas.

---

## 🎯 Visión General de la Aplicación

Esta aplicación resuelve una de las mayores fugas de conversión en ventas consultivas: **la fricción al coordinar llamadas y demostraciones de producto**. 

En lugar de intercambios interminables de correos o mensajes preguntando "¿qué día te queda cómodo?", esta aplicación implementa un sistema integral de calendario y scheduler público donde los prospectos eligen un horario disponible en la agenda del asesor, recibiendo confirmación inmediata y recordatorios automáticos.

---

## 💎 Componentes Clave & Código para Reutilizar

### 1. Vista de Calendario Multifuncional (`CommercialCalendarView`)
* **Grilla Interactiva de Vistas Temporales:**
  - Alternancia entre vistas: **Mes**, **Semana**, **Día** y **Lista de Agenda Próxima**.
  - Codificación por colores según el tipo de evento:
    - 🔵 *Demostración de Producto (Demo)*
    - 🟢 *Llamada de Cierre o Negociación*
    - 🟡 *Seguimiento o Touchpoint*
    - 🟣 *Reunión de Onboarding o Kick-off*
  - Arrastrar y soltar (drag & drop) o redimensionar eventos para reprogramar reuniones instantáneamente.

### 2. Portal Público de Agendamiento Autónomo (`PublicBookingPage`)
* **Experiencia Estilo Calendly / Cal.com:**
  - Enlace único por asesor o por equipo comercial: `clientum.lat/book/{vendedor-slug}` o `clientum.lat/demo`.
  - Detección de disponibilidad en tiempo real considerando descansos (buffers entre reuniones) y horarios de atención configurables (ej. Lun a Vie de 09:00 a 18:00).
  - Formulario de pre-reunión integrado: nombre, empresa, teléfono, tamaño de equipo y necesidad principal.
  - Al completar la reserva:
    - Crea automáticamente la Cita en el Calendario.
    - Crea o actualiza el Lead en el CRM.
    - Mueve la Oportunidad a la etapa *"Reunión Agendada"*.

### 3. Generador de Archivos iCal & Sincronización Google Calendar (`CalendarSyncEngine`)
* **Exportación y Sincronización Universal:**
  - Generador de archivos `.ics` descargables para Outlook, Apple Calendar y Google Calendar.
  - Enlace directo con parámetros `https://calendar.google.com/calendar/render?action=TEMPLATE...` para que el cliente agregue la reunión a su Google Calendar en 1 clic.
  - Enlaces automáticos a salas virtuales (Google Meet, Zoom o Teams).

### 4. Métricas de Asistencia y Conversión de Citas (`BookingMetricsCard`)
* **Control de Embudo de Demos:**
  - Tasa de Asistencia (*Show-Up Rate*): porcentaje de reuniones concretadas vs. reuniones canceladas o no presentadas (*No-Show*).
  - Tasa de Conversión de Demo a Propuesta: efectividad de cada asesor al salir de una reunión.

---

## 🛠️ Stack Tecnológico & Dependencias a Incorporar

- **Date Utilities:** `date-fns` (o utilidades nativas ligeras) para manejo preciso de fechas, husos horarios y sumas de días.
- **Lucide Icons:** `Calendar`, `Clock`, `Video`, `UserCheck`, `AlertCircle`, `ChevronLeft`, `ChevronRight`.
- **Generación iCal:** Función ligera de construcción de formato VCALENDAR / VEVENT para exportar `.ics`.

---

## 🔄 Plan de Integración en Clientum Master (`00d3a74e`)

1. **Reemplazar la pestaña estática `CalendarView`:**
   - Incorporar la grilla interactiva y el modal de creación de citas vinculado directamente a Oportunidades y Leads existentes.
2. **Habilitar el tab de Configuración de Reservas Públicas:**
   - En *Ajustes de Integraciones*, permitir que cada usuario del CRM defina sus horas hábiles y obtenga su enlace público de agendamiento.
3. **Tarjeta de Próxima Reunión en el Pipeline:**
   - En cada tarjeta del Kanban de Oportunidades, mostrar una insignia con la fecha y hora de la próxima reunión agendada, alertando en rojo si la cita es hoy.
