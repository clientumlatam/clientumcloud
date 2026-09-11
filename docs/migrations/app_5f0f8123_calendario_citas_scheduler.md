# 📅 Análisis Técnico de Migración: App 03 - Calendario Comercial & Scheduler de Demos
**ID de Aplicación de Origen:** `5f0f8123-8234-454a-a069-b237a07c73fb`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/5f0f8123-8234-454a-a069-b237a07c73fb](https://aistudio.google.com/u/0/apps/5f0f8123-8234-454a-a069-b237a07c73fb)  
**Rol en el Ecosistema:** Agenda de Ventas, Portal Público de Reserva de Demos (`/book/asesor`), iCal y Google Calendar Sync.  
**Estado de Integración:** Conectado en Módulo de Agenda y Scheduler.

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La coordinación de reuniones es el cuello de botella más costoso en los ciclos de venta medianos y largos. Esta aplicación extrae y adapta la experiencia de herramientas como Calendly o Cal.com directamente dentro del CRM:
- **Reserva Autónoma por el Prospecto:** Un enlace público donde el cliente elige el horario que mejor le conviene sin intercambios manuales.
- **Sincronización Bidireccional:** Visualización de la agenda personal del asesor (Google Calendar / Outlook) para no superponer compromisos.
- **Impacto Inmediato en el Pipeline:** Al confirmarse la reunión, la oportunidad avanza automáticamente a *"Reunión Agendada"*, se crea la actividad en el CRM y se envía la invitación por email con enlace de Google Meet.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo Generador de Franjas Horarias Disponibles (Time-Slot Generator)
Dado un rango de fechas y la configuración del asesor:
1. **Definición de Jornada Laboral:** Horarios disponibles por día de la semana (ej. Lunes a Viernes de 09:00 a 13:00 y de 14:30 a 18:00).
2. **Duración del Slot y Tiempo de Colchón (Buffer Time):**
   - Duración estándar de demo: 30 o 45 minutos.
   - Buffer entre reuniones: 15 minutos para volcar notas y preparar la siguiente llamada.
3. **Sustracción de Eventos Ocupados:**
   $$\text{AvailableSlots} = \text{CandidateSlots} \setminus (\text{ExistingMeetings} \cup \text{BlockedCalendarEvents})$$
4. **Respeto de Antelación Mínima:** No permitir agendar citas con menos de 4 horas de anticipación para que el comercial pueda preparar la propuesta.

### 2.2. Algoritmo de Generación VCALENDAR (.ics)
- Emisión instantánea de archivo en formato iCalendar estándar RFC 5545:
```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Clientum CRM//Commercial Scheduler//ES
METHOD:REQUEST
BEGIN:VEVENT
UID:meet-{id}@clientum.lat
DTSTAMP:{timestamp}
DTSTART:{iso_start}
DTEND:{iso_end}
SUMMARY:Demo Comercial: {Nombre Empresa} <> Clientum
DESCRIPTION:Reunión de demostración técnica solicitada por {contacto}.
LOCATION:https://meet.google.com/{meeting_code}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
```

---

## 3. 🗄️ Modelos de Datos y Esquemas Técnicos

### 3.1. Modelo de Cita Comercial (`CommercialMeeting`)
```typescript
export interface CommercialMeeting {
  id: string;
  opportunityId?: string;
  companyId?: string;
  contactPersonId?: string;
  advisorUserId: string;
  title: string;
  meetingType: 'Demo' | 'Negociacion' | 'Kickoff' | 'Seguimiento';
  status: 'Agendada' | 'Completada' | 'Cancelada' | 'No-Show';
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  durationMinutes: number;
  meetingUrl: string; // Google Meet / Zoom link
  notes?: string;
  clientTimezone: string;
  remindersSent: {
    atBooking: boolean;
    dayBefore: boolean;
    oneHourBefore: boolean;
  };
  outcomeSummary?: string;
  createdAt: string;
}
```

### 3.2. Modelo de Disponibilidad del Asesor (`AdvisorAvailability`)
```typescript
export interface AdvisorAvailability {
  userId: string;
  slug: string; // ej: "alex-morgan" -> clientum.lat/book/alex-morgan
  weeklySchedule: {
    dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 0; // 1 = Lunes
    isActive: boolean;
    slots: { start: string; end: string }[]; // ej: ["09:00", "13:00"]
  }[];
  slotDurationMinutes: number;
  bufferMinutes: number;
  minNoticeHours: number;
  maxFutureDays: number;
}
```

---

## 4. 🧩 Componentes UI Clave a Adaptar para Clientum

| Componente | Archivo en Clientum | Funcionalidad Adaptada |
|---|---|---|
| `CommercialCalendarView` | `/src/components/calendar/CalendarView.tsx` | Vista general con alternancia Mes/Semana/Día con filtros por tipo de evento y asesor comercial. |
| `PublicBookingPage` | `/src/components/calendar/PublicBookingPage.tsx` | Portal público de reserva con selector de fecha interactivo, grilla de horas disponibles y formulario de confirmación. |
| `MeetingCardPopover` | `/src/components/calendar/MeetingCardPopover.tsx` | Modal emergente para reprogramar, cancelar o iniciar llamada de Meet con un clic. |
| `ShowUpMetricsCard` | `/src/components/calendar/ShowUpMetricsCard.tsx` | Tarjeta ejecutiva con el porcentaje de asistencia a demos (*Show-Up Rate*) y motivos de cancelación. |

---

## 5. 🔌 Endpoints API y Servicios Backend

```http
### Obtener franjas horarias disponibles para un asesor
GET /api/scheduler/availability?advisorSlug=alex-morgan&date=2026-09-15

Response:
{
  "advisorName": "Alex Morgan",
  "date": "2026-09-15",
  "availableSlots": [
    { "start": "09:30", "end": "10:15" },
    { "start": "11:00", "end": "11:45" },
    { "start": "15:00", "end": "15:45" }
  ]
}

### Confirmar reserva pública
POST /api/scheduler/book
Content-Type: application/json

{
  "advisorSlug": "alex-morgan",
  "slot": "2026-09-15T09:30:00Z",
  "client": {
    "name": "Javier López",
    "email": "jlopez@distribuidora.com",
    "company": "Distribuidora del Litoral",
    "phone": "+5493415556677",
    "teamSize": "25-50"
  }
}
```

---

## 6. 🗺️ Mapeo con `project_archive/plan_consolidado_proyecto.md`
- **Fase I (Sección 3.3 Actividades y seguimiento):** Unificación de tareas, llamadas y reuniones con agenda diaria/semanal y sincronización con calendarios externos.
- **Módulo de Migración Derivado:**
  - `10_calendar_scheduler.md`
