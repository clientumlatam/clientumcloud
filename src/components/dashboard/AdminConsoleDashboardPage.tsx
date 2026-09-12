import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  BarChart3,
  Server,
  Key,
  Lock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Database,
  Sliders,
  Sparkles,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

export const AdminConsoleDashboardPage: React.FC = () => {
  const { showToast, triggerConfetti } = useCRM();

  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'logs' | 'config'>('stats');
  const [filterRole, setFilterRole] = useState('all');

  const [usersList, setUsersList] = useState([
    { id: 'usr-1', name: 'Alex Morgan', email: 'alex@clientum.com.ar', role: 'Super Admin', status: 'Activo', lastLogin: 'Hace 5 min' },
    { id: 'usr-2', name: 'Carlos Benítez', email: 'carlos@clientum.com.ar', role: 'Ventas Senior', status: 'Activo', lastLogin: 'Hoy 10:30' },
    { id: 'usr-3', name: 'Lucía Fernández', email: 'lucia@clientum.com.ar', role: 'Soporte Técnico', status: 'Activo', lastLogin: 'Ayer' },
    { id: 'usr-4', name: 'Martín Paez', email: 'martin@clientum.com.ar', role: 'Operador / Ventas', status: 'Inactivo', lastLogin: 'Hace 7 días' },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 'log-1', timestamp: '12 Sep 11:42:09', user: 'alex@clientum.com.ar', action: 'Actualización de certificado AFIP CRT', ip: '181.44.192.12', severity: 'warning' },
    { id: 'log-2', timestamp: '12 Sep 10:15:33', user: 'carlos@clientum.com.ar', action: 'Exportación masiva de oportunidades (CSV)', ip: '190.19.42.88', severity: 'info' },
    { id: 'log-3', timestamp: '11 Sep 18:22:01', user: 'sistema_cron', action: 'Sincronización de webhooks Mercado Pago', ip: '127.0.0.1', severity: 'success' },
    { id: 'log-4', timestamp: '11 Sep 14:05:12', user: 'desconocido', action: 'Intento fallido de login (Password mismatch)', ip: '45.12.99.102', severity: 'danger' },
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/40 text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Consola Ejecutiva
            </span>
            <span className="text-xs text-slate-500">admin_console_dashboard.md</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            Consola de Administración y Auditoría General
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Panel de supervisión ejecutiva para auditar estadísticas de la plataforma, el rendimiento de operadores, consumo de IA y la seguridad de accesos RBAC.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              showToast('Ejecutando escaneo general de integridad y tokens...', 'info');
              setTimeout(() => showToast('Escaneo finalizado: Todo el clúster en verde.', 'success'), 1200);
            }}
            className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Auditar Sistema</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'stats', label: '1. Admin Stats & Métricas', icon: BarChart3 },
          { id: 'users', label: '2. Usuarios & Roles (RBAC)', icon: Users },
          { id: 'logs', label: '3. Auditoría de Seguridad & Logs', icon: Terminal },
          { id: 'config', label: '4. Ajustes Críticos del Sistema', icon: Sliders },
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

      {/* Tab 1: Stats */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Usuarios Activos Mensuales</div>
              <div className="text-2xl font-bold text-white">18 operadores</div>
              <div className="text-[10px] text-emerald-400 font-semibold">+14% vs mes anterior</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Llamadas a Gemini 2.5 Flash</div>
              <div className="text-2xl font-bold text-white">48.290 tokens</div>
              <div className="text-[10px] text-indigo-400 font-semibold">Costo mensual: $ 4.20 USD</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Disponibilidad del Sistema</div>
              <div className="text-2xl font-bold text-emerald-400">99.98%</div>
              <div className="text-[10px] text-slate-400">Zero downtime reportado</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Volumen Transaccional</div>
              <div className="text-2xl font-bold text-white">$ 14.8M ARS</div>
              <div className="text-[10px] text-emerald-400 font-semibold">Mercado Pago + Facturas AFIP</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Users & RBAC */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              Gestión de Operadores y Asignación de Roles
            </h2>
            <button
              onClick={() => showToast('Abriendo modal para invitar nuevo operador...', 'info')}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              + Invitar Operador
            </button>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="p-3">Operador</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Rol Asignado</th>
                  <th className="p-3">Último Acceso</th>
                  <th className="p-3 text-center">Estado</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-white">{u.name}</td>
                    <td className="p-3 font-mono text-slate-400">{u.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{u.lastLogin}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          u.status === 'Activo'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-700 text-slate-400 border-slate-600'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => showToast(`Editando permisos para ${u.name}`, 'info')}
                        className="text-xs text-amber-400 hover:underline cursor-pointer"
                      >
                        Editar Permisos
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Security & Audit Logs */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Trazabilidad y Registros de Auditoría
            </h2>
            <span className="text-xs text-slate-400">Inmutabilidad garantizada por SHA-256</span>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden font-mono text-xs">
            <div className="divide-y divide-slate-800">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-[11px]">{log.timestamp}</span>
                    <span className="text-indigo-400">{log.user}</span>
                    <span className="text-slate-200">{log.action}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-[11px]">{log.ip}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        log.severity === 'danger'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : log.severity === 'warning'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      {log.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: System Config */}
      {activeTab === 'config' && (
        <div className="p-5 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            Parámetros Globales del Servidor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-2">
              <div className="text-xs font-bold text-white">Autenticación de 2 Factores (2FA) Obligatoria</div>
              <p className="text-xs text-slate-400">
                Requiere que todos los administradores y vendedores validen su sesión con una app TOTP (Google Authenticator).
              </p>
              <button
                onClick={() => showToast('Política 2FA aplicada a toda la organización.', 'success')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold cursor-pointer"
              >
                Habilitar para Todos
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-2">
              <div className="text-xs font-bold text-white">Backup Automático de Base de Datos</div>
              <p className="text-xs text-slate-400">
                Copia diaria de seguridad cifrada enviada a Cloud Storage con retención histórica de 90 días.
              </p>
              <button
                onClick={() => {
                  showToast('Backup inmediato disparado hacia Cloud Storage...', 'info');
                  triggerConfetti();
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
              >
                Ejecutar Backup Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
