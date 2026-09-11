# 6. Asistente IA Conversacional y Copilot de Ventas (Gemini Multi-Agent)
**ID de Aplicación Origen:** `e460c865-6182-4a02-91c6-0fa1c6017d1c`

## 📌 Origen y Contexto
Extraído de las aplicaciones de chat con IA general, generadores de contenido y agentes conversacionales especializados en soporte y asesoramiento comercial.

## 🚀 Capacidades a Migrar a Clientum
1. **Copilot Contextual por Registro:**
   - Un panel lateral de IA que analiza en tiempo real el estado de una Oportunidad, Empresa o Lead y sugiere argumentos de venta, objeciones frecuentes y correos de reactivación personalizados.
2. **Generación Automática de Tareas y Notas:**
   - Comandos en lenguaje natural (ej: *"Agendar reunión con Juan Pérez para el próximo martes y crear tarea de presupuesto"*).
3. **Análisis de Sentimiento y Alertas Tempranas:**
   - Escaneo de los correos y notas de voz del cliente para detectar insatisfacción o riesgo de cancelación antes de que ocurra.

## 🛠️ Stack Tecnológico Propuesto
- **Motor AI:** SDK `@google/genai` con `gemini-2.5-flash` y llamadas estructuradas (JSON response schemas).
- **Frontend:** Ventana flotante de chat deslizable con historial por sesión en memoria y base de datos.
