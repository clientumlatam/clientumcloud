# 14. Mesa de Ayuda, Tickets de Soporte Post-Venta & SLAs (Customer Success)

## 📌 Origen y Contexto
Extraído de las aplicaciones de Helpdesk, gestión de tickets de clientes, soporte técnico y seguimiento de satisfacción post-venta (NPS / CSAT).

## 🚀 Capacidades a Migrar a Clientum
1. **Canalización de Incidencias en Tickets Formales:**
   - Creación de tickets vinculados a la Empresa o Contacto (`Soporte Técnico`, `Facturación`, `Garantía`, `Reclamo`).
   - Estados: `Abierto`, `En Análisis`, `Esperando al Cliente`, `Resuelto`.
2. **Temporizadores de Acuerdos de Nivel de Servicio (SLA):**
   - Cuenta regresiva visual para asegurar que ningún reclamo urgente supere las 2 horas sin primera respuesta o las 24 horas sin resolución.
3. **Encuestas Automáticas de Satisfacción (CSAT):**
   - Al cerrar un ticket o finalizar un proyecto, disparo automático de encuesta de 1 a 5 estrellas con registro directo en el perfil del cliente.

## 🛠️ Stack Tecnológico Propuesto
- **Frontend:** Vista de bandeja de soporte tipo Kanban o lista filtrable por severidad (Crítica, Alta, Media, Baja).
- **Notificaciones:** Alertas sonoras y visuales cuando un ticket ingresa o está próximo a violar el SLA pactado.
