import React, { useState } from 'react';
import {
  Mail,
  HardDrive,
  Calendar,
  Send,
  Plus,
  RefreshCw,
  CheckCircle2,
  Folder,
  FileText,
  Clock,
  ExternalLink,
  Sparkles,
  Inbox,
  Paperclip
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

export const GoogleWorkspaceDashboardPage: React.FC = () => {
  const { showToast, triggerConfetti } = useCRM();

  const [activeTab, setActiveTab] = useState<'drive' | 'campaigns' | 'calendar'>('drive');
  const [isSyncing, setIsSyncing] = useState(false);

  const [driveFiles, setDriveFiles] = useState([
    { id: 'f-1', name: 'Presupuesto Comercial - Distribuidora Patagónica.pdf', size: '1.4 MB', updated: 'Hoy 10:20', folder: 'Presupuestos & Cotizaciones' },
    { id: 'f-2', name: 'Contrato Marco de Servicios SaaS ClientumOS.docx', size: '420 KB', updated: 'Ayer', folder: 'Legales & Contratos' },
    { id: 'f-3', name: 'Manual de Identidad y Logo Vectorial.zip', size: '8.2 MB', updated: '08 Sep', folder: 'Branding & Diseño' },
    { id: 'f-4', name: 'Planilla de Objetivos Comerciales Q3.xlsx', size: '890 KB', updated: '05 Sep', folder: 'Finanzas' },
  ]);

  const [emailTemplates, setEmailTemplates] = useState([
    { id: 'tmpl-1', name: 'Secuencia Bienvenida B2B', subject: 'Bienvenido a Clientum CRM - Próximos pasos', openRate: '68%', sentCount: 142 },
    { id: 'tmpl-2', name: 'Seguimiento Propuesta Comercial', subject: 'Revisión de propuesta y dudas técnicas', openRate: '54%', sentCount: 89 },
    { id: 'tmpl-3', name: 'Reactiva Tratos Fríos', subject: '¿Sigue vigente el proyecto de automatización?', openRate: '41%', sentCount: 210 },
  ]);

  const [calendarEvents, setCalendarEvents] = useState([
    { id: 'cal-1', title: 'Demo ClientumOS + WhatsApp CRM', client: 'Distribuidora Patagónica', time: '15:00 - 15:45', status: 'Confirmado', meetLink: 'meet.google.com/abc-wxyz-123' },
    { id: 'cal-2', title: 'Reunión de Onboarding y Cuentas', client: 'Ferretería Central S.R.L.', time: '17:00 - 17:30', status: 'Confirmado', meetLink: 'meet.google.com/def-uvwx-456' },
  ]);

  const handleSyncDrive = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Sincronización con Google Drive completada (4 carpetas actualizadas).', 'success');
      triggerConfetti();
    }, 800);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/40 text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Google Workspace
            </span>
            <span className="text-xs text-slate-500">workspace_integrations_dashboard.md</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2.5">
            <HardDrive className="w-6 h-6 text-sky-400" />
            Integraciones Google Workspace, Gmail y Drive
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Conectividad con herramientas de Google Workspace (Drive, Gmail, Calendar y SMTP) para centralizar la documentación corporativa, el envío de campañas de correo y la sincronización de agendas.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSyncDrive}
            disabled={isSyncing}
            className="px-3 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar con Drive'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'drive', label: '1. Google Drive & Document Manager', icon: HardDrive },
          { id: 'campaigns', label: '2. Campañas Email & Plantillas HTML', icon: Mail },
          { id: 'calendar', label: '3. Calendario & Google Meet', icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Drive */}
      {activeTab === 'drive' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Folder className="w-4 h-4 text-sky-400" />
              Archivos y Carpetas Sincronizadas en la Nube
            </h2>
            <button
              onClick={() => showToast('Abriendo selector de archivos para subir a Google Drive...', 'info')}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Subir a Drive
            </button>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="p-3">Nombre del Archivo</th>
                  <th className="p-3">Carpeta</th>
                  <th className="p-3">Tamaño</th>
                  <th className="p-3">Última Modificación</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {driveFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{file.name}</span>
                    </td>
                    <td className="p-3 text-slate-400">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700">
                        {file.folder}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">{file.size}</td>
                    <td className="p-3 text-slate-400">{file.updated}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => showToast(`Abriendo ${file.name} en Google Drive`, 'info')}
                        className="text-xs text-sky-400 hover:underline cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Campaigns */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              Plantillas HTML y Secuencias de Correo Comercial
            </h2>
            <button
              onClick={() => showToast('Abriendo diseñador visual de plantillas HTML...', 'info')}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Nueva Plantilla
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emailTemplates.map((tmpl) => (
              <div key={tmpl.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <div className="text-xs font-bold text-white">{tmpl.name}</div>
                <div className="text-[11px] text-slate-400 line-clamp-1 italic">"{tmpl.subject}"</div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                  <span className="text-slate-400">Aperturas: <strong className="text-emerald-400">{tmpl.openRate}</strong></span>
                  <span className="text-slate-400">Enviados: <strong className="text-white">{tmpl.sentCount}</strong></span>
                </div>
                <button
                  onClick={() => showToast(`Enviando prueba de "${tmpl.name}" vía SMTP verificado...`, 'info')}
                  className="w-full py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3 h-3 text-sky-400" />
                  Enviar Prueba SMTP
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Calendar */}
      {activeTab === 'calendar' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-400" />
            Reuniones y Demos en Google Calendar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {calendarEvents.map((evt) => (
              <div key={evt.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{evt.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {evt.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300">Cliente: {evt.client}</div>
                <div className="text-xs text-sky-400 font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {evt.time}
                </div>
                <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">{evt.meetLink}</span>
                  <button
                    onClick={() => showToast(`Abriendo enlace de Google Meet: ${evt.meetLink}`, 'info')}
                    className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-[11px] font-semibold cursor-pointer"
                  >
                    Unirse a Meet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
