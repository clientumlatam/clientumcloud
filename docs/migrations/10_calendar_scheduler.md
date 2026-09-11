# 📅 Análisis Técnico de Migración: App 10 - Calendario Comercial & Citas
**ID de Aplicación de Origen:** `5f0f8123-8234-454a-a069-b237a07c73fb`  
**URL de AI Studio:** [https://aistudio.google.com/u/0/apps/5f0f8123-8234-454a-a069-b237a07c73fb](https://aistudio.google.com/u/0/apps/5f0f8123-8234-454a-a069-b237a07c73fb)  
**Rol en el Ecosistema:** Agendamiento Comercial, Calendario Mensual/Semanal, Portal Público de Citas tipo Calendly y Enlaces de Reunión Virtual.  
**Estado de Integración:** 100% Operativo en Clientum (`CalendarView.tsx` y `PublicBookingView.tsx`).

---

## 1. 🎯 Visión Arquitectónica y Contexto de Origen
La aplicación resuelve la fricción de ida y vuelta para coordinar videollamadas o reuniones presenciales con prospectos. Proporciona una agenda interna interactiva para los asesores del CRM y genera enlaces de reserva públicos personalizados (`https://crm.clientum.com/book/alex-morgan`) donde los clientes eligen un horario disponible en tiempo real con sustracción automática de eventos ocupados.

---

## 2. 🧠 Lógica de Negocio y Algoritmos a Extraer

### 2.1. Algoritmo Generador de Slots Horarios Disponibles
Calcula las franjas horarias libres considerando la jornada laboral, duración de la reunión y buffer de descanso entre citas:
```typescript
export function calculateAvailableSlots(
  workingHours: { start: string; end: string }, // ej: "09:00", "18:00"
  slotDurationMinutes: number, // ej: 30
  bufferMinutes: number, // ej: 10
  existingMeetings: { start: string; end: string }[]
): string[] {
  const slots: string[] = [];
  let currentMinutes = parseTimeToMinutes(workingHours.start);
  const endMinutes = parseTimeToMinutes(workingHours.end);

  while (currentMinutes + slotDurationMinutes <= endMinutes) {
    const slotStartStr = minutesToTime(currentMinutes);
    const slotEndStr = minutesToTime(currentMinutes + slotDurationMinutes);
    
    // Verificar si colisiona con alguna reunión ya agendada
    const hasCollision = existingMeetings.some(m => 
      isOverlapping(slotStartStr, slotEndStr, m.start, m.end)
    );

    if (!hasCollision) {
      slots.push(slotStartStr);
    }

    currentMinutes += slotDurationMinutes + bufferMinutes;
  }

  return slots;
}
```

### 2.2. Generador de Invitaciones iCalendar RFC 5545 (`.ics`)
Crea el archivo estándar de calendario para que el cliente lo añada a Google Calendar, Outlook o Apple Calendar con enlace de Google Meet o Zoom.

---

## 3. 🗄️ Modelos de Datos y Esquemas en TypeScript

```typescript
export interface CommercialMeeting {
  id: string;
  title: string;
  description?: string;
  advisorId: string;
  advisorName: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  opportunityId?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  durationMinutes: number;
  meetingType: 'google_meet' | 'zoom' | 'presencial' | 'phone';
  meetingUrl?: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled' | 'completed';
  notes?: string;
}

export interface AdvisorBookingSchedule {
  advisorId: string;
  slug: string; // ej: "alex-morgan"
  displayName: string;
  avatarUrl?: string;
  timezone: string;
  activeDays: number[]; // 1 = Lunes, 5 = Viernes
  workingHours: { start: string; end: string };
  defaultDurationMinutes: number;
  bufferMinutes: number;
}
```

---

## 4. 🧩 Componentes UI de la App Origen a Adaptar

| Componente Origen | Componente en ClientumCRM | Adaptación Realizada |
|---|---|---|
| `MainCalendarView.tsx` | `/src/components/calendar/CalendarView.tsx` | Grilla mensual y semanal con citas coloreadas por tipo y tooltip al pasar el cursor. |
| `BookingWidgetPublic.tsx` | `/src/components/public/PublicBookingView.tsx` | Página pública ligera donde el cliente elige fecha en calendario visual y selecciona hora libre. |
| `MeetingDetailModal.tsx` | Modal en `CalendarView.tsx` | Edición de cita, reprogramación y botón de acceso a la sala de Google Meet con un clic. |

---

## 5. ⚖️ Qué Adaptar vs. Qué Descartar para Optimizar Clientum

- **Adaptar e Integrar:**
  - El portal público de reservas con enlace directo a WhatsApp.
  - La vinculación automática de la cita agendada a la oportunidad comercial en el Kanban.
  - La vista de calendario mensual integrada con filtros de asesores.
- **Descartar de la App Base:**
  - Integraciones pesadas con APIs propietarias de calendarios locales que requerían descargas de binarios; se resolvió con exportador universal `.ics` y Google Calendar OAuth.

---

## 6. 🔌 Endpoints API y Servicios Backend

```http
### Consultar horarios disponibles para el asesor
GET /api/public/booking/alex-morgan/slots?date=2026-09-18

### Confirmar reserva pública por parte del prospecto
POST /api/public/booking/confirm
Content-Type: application/json

{
  "advisorSlug": "alex-morgan",
  "clientName": "Martín Guzmán",
  "clientEmail": "martin@empresa.com",
  "clientPhone": "+5491144002233",
  "date": "2026-09-18",
  "time": "11:00",
  "notes": "Interés en demostración para 15 puestos comerciales"
}
```

---

## 7. 🗺️ Mapeo Estratégico con `plan_consolidado_proyecto.md`
- **Fase I y II - Calendario & Citas Comerciales:** Reducción del ciclo de venta mediante agendamiento instantáneo sin fricción.
