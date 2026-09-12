import React, { useState } from 'react';
import {
  Boxes,
  TrendingDown,
  FileSpreadsheet,
  AlertTriangle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  Warehouse
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

export const ErpAvanzadoDashboardPage: React.FC = () => {
  const { showToast, triggerConfetti } = useCRM();

  const [activeTab, setActiveTab] = useState<'inventory' | 'expenses' | 'invoices'>('inventory');

  const [stockItems, setStockItems] = useState([
    { id: 'SKU-001', name: 'Software CRM Plan Pro (Licencia Anual)', warehouse: 'Casa Central', stock: 450, minStock: 50, priceMinorista: 180000, priceMayorista: 140000, status: 'Óptimo' },
    { id: 'SKU-002', name: 'Módulo WhatsApp API Oficial Meta', warehouse: 'Nube Cloud', stock: 85, minStock: 20, priceMinorista: 45000, priceMayorista: 38000, status: 'Óptimo' },
    { id: 'SKU-003', name: 'Hardware Mini PC POS para Sucursales', warehouse: 'Depósito Sur', stock: 4, minStock: 10, priceMinorista: 420000, priceMayorista: 350000, status: 'Crítico' },
    { id: 'SKU-004', name: 'Pack 10.000 Mensajes WhatsApp HSM', warehouse: 'Nube Cloud', stock: 230, minStock: 50, priceMinorista: 55000, priceMayorista: 42000, status: 'Óptimo' },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 'EXP-101', date: '11 Sep 2026', provider: 'Google Cloud Platform', category: 'Infraestructura Cloud', amount: 145000, status: 'Pagado' },
    { id: 'EXP-102', date: '09 Sep 2026', provider: 'Meta Platforms Ireland', category: 'Meta Cloud API WhatsApp', amount: 82000, status: 'Pagado' },
    { id: 'EXP-103', date: '05 Sep 2026', provider: 'Telecom Argentina', category: 'Conectividad & Fibra', amount: 48000, status: 'Pendiente' },
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'FC-A-0001-00000492', client: 'Distribuidora Patagónica S.A.', cuit: '30-71482910-8', amount: 360000, cae: '74829104829102', status: 'Autorizado AFIP' },
    { id: 'FC-B-0001-00000493', client: 'Estudio Jurídico Albarracín', cuit: '20-33948201-4', amount: 180000, cae: '74829104829103', status: 'Autorizado AFIP' },
    { id: 'FC-A-0001-00000494', client: 'Ferretería Central S.R.L.', cuit: '30-68291049-2', amount: 95000, cae: '74829104829104', status: 'Autorizado AFIP' },
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/40 text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Gestión Financiera & Logística
            </span>
            <span className="text-xs text-slate-500">erp_avanzado_dashboard.md</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Boxes className="w-6 h-6 text-amber-400" />
            Módulos ERP Avanzados: Inventario, Gastos y Facturación
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Subsistema ERP financiero y logístico dentro del dashboard para el control exhaustivo de inventarios multialmacén, registro de gastos operativos y auditoría detallada del historial de facturación electrónica.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              showToast('Exportando balance general y stock a CSV / Excel...', 'info');
              setTimeout(() => {
                showToast('Archivo ERP consolidado descargado exitosamente.', 'success');
                triggerConfetti();
              }, 900);
            }}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Balance</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'inventory', label: '1. Inventario Multialmacén & SKUs', icon: Warehouse },
          { id: 'expenses', label: '2. Control de Gastos (Expense Tracker)', icon: TrendingDown },
          { id: 'invoices', label: '3. Historial de Facturación AFIP', icon: FileSpreadsheet },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Inventory */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-amber-400" />
              Niveles de Stock y Precios Diferenciados
            </h2>
            <button
              onClick={() => showToast('Abriendo formulario de nuevo artículo SKU...', 'info')}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              + Nuevo SKU
            </button>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Artículo</th>
                  <th className="p-3">Almacén</th>
                  <th className="p-3 text-right">Precio Mayorista</th>
                  <th className="p-3 text-right">Precio Minorista</th>
                  <th className="p-3 text-right">Stock</th>
                  <th className="p-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {stockItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono text-slate-400">{item.id}</td>
                    <td className="p-3 font-semibold text-white">{item.name}</td>
                    <td className="p-3 text-slate-400">{item.warehouse}</td>
                    <td className="p-3 text-right font-mono text-slate-300">$ {item.priceMayorista.toLocaleString('es-AR')}</td>
                    <td className="p-3 text-right font-mono font-bold text-white">$ {item.priceMinorista.toLocaleString('es-AR')}</td>
                    <td className="p-3 text-right font-mono font-bold">
                      <span className={item.stock <= item.minStock ? 'text-rose-400' : 'text-emerald-400'}>
                        {item.stock} u.
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          item.status === 'Crítico'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Expenses */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              Gastos Operativos y Proveedores
            </h2>
            <button
              onClick={() => showToast('Abriendo registro de nuevo egreso / factura de compra...', 'info')}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              + Registrar Gasto
            </button>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="p-3">Comprobante</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Proveedor</th>
                  <th className="p-3">Categoría de Costo</th>
                  <th className="p-3 text-right">Monto</th>
                  <th className="p-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono text-slate-400">{exp.id}</td>
                    <td className="p-3 text-slate-400">{exp.date}</td>
                    <td className="p-3 font-semibold text-white">{exp.provider}</td>
                    <td className="p-3 text-slate-300">{exp.category}</td>
                    <td className="p-3 text-right font-mono font-bold text-rose-400">
                      - $ {exp.amount.toLocaleString('es-AR')}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          exp.status === 'Pagado'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {exp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Invoices */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              Auditoría y Libro IVA Ventas (AFIP)
            </h2>
            <span className="text-xs text-slate-400">Total Facturado este mes: $ 635.000 ARS</span>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="p-3">Factura N°</th>
                  <th className="p-3">Razón Social</th>
                  <th className="p-3">CUIT</th>
                  <th className="p-3 font-mono">CAE Asignado</th>
                  <th className="p-3 text-right">Total Facturado</th>
                  <th className="p-3 text-center">Estado Fiscal</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono font-bold text-white">{inv.id}</td>
                    <td className="p-3 font-semibold text-white">{inv.client}</td>
                    <td className="p-3 font-mono text-slate-400">{inv.cuit}</td>
                    <td className="p-3 font-mono text-indigo-300 text-[11px]">{inv.cae}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-400">
                      $ {inv.amount.toLocaleString('es-AR')}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => showToast(`Descargando comprobante fiscal ${inv.id} en PDF oficial...`, 'success')}
                        className="text-xs text-blue-400 hover:underline cursor-pointer"
                      >
                        PDF / CAE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
