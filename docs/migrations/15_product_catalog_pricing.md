# 15. Catálogo de Productos, Inventario y Lista de Precios Multi-Tarifa

## 📌 Origen y Contexto
Extraído de las aplicaciones de gestión de inventario, catálogo comercial de productos/servicios y listas de precios segmentadas por canal o tipo de cliente (Mayorista / Minorista / Corporativo).

## 🚀 Capacidades a Migrar a Clientum
1. **Catálogo Unificado de Productos y Servicios:**
   - Base de datos con código SKU, nombre, descripción comercial, imagen, unidad de medida (hora, mes, unidad) y costo base.
2. **Listas de Precios Segmentadas:**
   - Posibilidad de definir múltiples listas (ej: *Lista Estándar*, *Lista Distribuidores 20% OFF*, *Clientes VIP*).
   - Al cotizar una Oportunidad, seleccionar la lista correspondiente para precargar los precios y descuentos autorizados de forma inmediata.
3. **Control de Disponibilidad y Stock Mínimo:**
   - Indicador de stock en tiempo real al armar presupuestos, evitando cotizar productos físicos sin disponibilidad inmediata en depósito.

## 🛠️ Stack Tecnológico Propuesto
- **Colección:** `products` y `price_lists` vinculadas en la creación de líneas de cotización (`QuoteItems`).
- **Buscador:** Autocompletado rápido con cálculo instantáneo de márgenes de ganancia por ítem.
