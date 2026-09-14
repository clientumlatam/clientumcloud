import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Sparkles,
  Download,
  RotateCcw,
  X,
  Globe,
  Menu,
  ExternalLink,
  Settings2,
  MoreHorizontal,
  Mic,
  Zap,
  Trophy,
  Command,
  Sun,
  Moon,
  User as UserIcon,
  ChevronDown,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { Language } from '../../types';
import { ClientumLogo } from '../common/ClientumLogo';
import { ConnectivityIndicator } from '../common/ConnectivityIndicator';
import { FollowupRemindersDropdown } from '../common/FollowupRemindersDropdown';
import { ThemeSwitcher } from './ThemeSwitcher';

interface CrmTopHeaderProps {
  onOpenConfig: () => void;
  onOpenVoiceNote: () => void;
  onOpenAutomations: () => void;
  onOpenLeaderboard: () => void;
  hasModuleCredentials?: boolean;
}

export const CrmTopHeader: React.FC<CrmTopHeaderProps> = ({
  onOpenConfig,
  onOpenVoiceNote,
  onOpenAutomations,
  onOpenLeaderboard,
  hasModuleCredentials,
}) => {
  const {
    toggleMobileSidebar,
    activeTab,
    openNewRecordModal,
    openAICopilot,
    currentUser,
    theme,
    setTheme,
    language,
    setLanguage,
    resetToDemoData,
    exitToPublicSite,
    setIsCommandPaletteOpen,
    opportunities,
    tasks,
  } = useCRM();

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRemindersOpen, setIsRemindersOpen] = useState(false);

  // Total alert notifications for reminders
  const totalAlertsCount = React.useMemo(() => {
    const now = Date.now();
    const fiveDaysMs = 5 * 24 * 60 * 60 * 1000;
    const rotting = opportunities.filter((o) => {
      if (o.stage === 'won' || o.stage === 'lost') return false;
      const last = new Date(o.updatedAt || o.createdAt).getTime();
      return now - last >= fiveDaysMs;
    }).length;

    const todayStr = new Date().toISOString().split('T')[0];
    const pendingTasks = tasks.filter(
      (t) => t.status !== 'Completed' && t.dueDate <= todayStr
    ).length;

    return rotting + pendingTasks;
  }, [opportunities, tasks]);

  return (
    <header
      id="crm-top-header"
      className="crm-top-header bg-[var(--clientum-navy,#022046)] border-b border-[#002B5C] text-slate-100 h-14 px-4 flex items-center justify-between gap-4 shrink-0 z-20 select-none shadow-md font-['Inter',sans-serif]"
    >
      {/* Left: Mobile Toggle & App Branding */}
      <div className="flex items-center gap-3 min-w-0 shrink-0">
        <button
          onClick={toggleMobileSidebar}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 md:hidden transition-colors cursor-pointer"
          title="Abrir Menú Lateral"
        >
          <Menu className="w-4 h-4 text-slate-200" />
        </button>

        {/* App Branding */}
        <div
          id="crm-header-branding"
          onClick={exitToPublicSite}
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0 pr-3 border-r border-slate-800"
          title="Clientum CRM - Ir al sitio público"
        >
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--clientum-action,#0056B3)] via-[var(--clientum-blue,#002B5C)] to-[var(--clientum-navy,#022046)] border border-blue-400/30 p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <ClientumLogo className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-sm font-extrabold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                Clientum
              </span>
              <span className="text-sm font-extrabold text-blue-300 tracking-tight">
                CRM
              </span>
            </div>
            <span className="text-[9px] font-semibold text-slate-300 uppercase tracking-widest hidden sm:inline">
              Suite Comercial
            </span>
          </div>
        </div>

        {/* Connectivity Indicator Component */}
        <ConnectivityIndicator />
      </div>

      {/* Center: Command Palette / Search Trigger */}
      <div className="flex-1 max-w-sm hidden md:flex items-center justify-center">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs transition-all cursor-pointer shadow-inner group"
          title="Abrir Command Palette (Ctrl+K) para buscar contactos o crear negocios"
        >
          <div className="flex items-center gap-2">
            <Command className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-slate-400 group-hover:text-slate-200">Buscar contactos, empresas o comandos...</span>
          </div>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700 font-semibold shadow-2xs">
            {typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl+K'}
          </kbd>
        </button>
      </div>

      {/* Right Controls: User Profile, Actions & Utilities */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Module Credentials Action */}
        {hasModuleCredentials && (
          <button
            type="button"
            onClick={onOpenConfig}
            className="hidden lg:flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-900/60 cursor-pointer"
            title="Configurar credenciales de este módulo"
          >
            <Settings2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>Configurar API</span>
          </button>
        )}

        {/* AI Copilot Button */}
        <button
          id="crm-header-copilot-btn"
          onClick={openAICopilot}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition-all cursor-pointer group"
          title="Abrir Asistente AI Copilot"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Copilot</span>
        </button>

        {/* AI Voice Note Recorder */}
        <button
          onClick={onOpenVoiceNote}
          className="p-1.5 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-700/40 text-xs transition-all cursor-pointer"
          title="Grabar nota de voz o llamada con IA"
        >
          <Mic className="w-3.5 h-3.5 text-indigo-400" />
        </button>

        {/* Active Automations Engine */}
        <button
          onClick={onOpenAutomations}
          className="p-1.5 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 border border-amber-700/40 text-xs transition-all cursor-pointer"
          title="Workflows y Automatizaciones en vivo"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        </button>

        {/* Leaderboard */}
        <button
          onClick={onOpenLeaderboard}
          className="p-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/40 text-xs transition-all cursor-pointer"
          title="Metas y ranking del equipo"
        >
          <Trophy className="w-3.5 h-3.5 text-emerald-400" />
        </button>

        {/* Followup Reminders Bell */}
        <div className="relative">
          <button
            onClick={() => setIsRemindersOpen((prev) => !prev)}
            className={`relative p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
              totalAlertsCount > 0
                ? 'bg-rose-950/50 border-rose-700/50 text-rose-300 hover:bg-rose-900/60'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Notificaciones y seguimiento"
          >
            <Bell className="w-3.5 h-3.5" />
            {totalAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-extrabold flex items-center justify-center ring-2 ring-slate-900">
                {totalAlertsCount > 9 ? '9+' : totalAlertsCount}
              </span>
            )}
          </button>

          <FollowupRemindersDropdown
            isOpen={isRemindersOpen}
            onClose={() => setIsRemindersOpen(false)}
          />
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher showLabel={false} />

        {/* User Profile Pill & Dropdown */}
        <div className="relative ml-1">
          <button
            id="crm-user-profile-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pr-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            title={`Usuario: ${currentUser?.name || 'Ejecutivo Comercial'}`}
          >
            <div className="relative w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center overflow-hidden border border-blue-400/40 shrink-0">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{(currentUser?.name || 'C').charAt(0)}</span>
              )}
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-slate-900" />
            </div>

            <div className="hidden xl:flex flex-col text-left leading-none">
              <span className="text-xs font-extrabold text-white truncate max-w-[100px]">
                {currentUser?.name || 'Juan Pérez'}
              </span>
              <span className="text-[9px] font-semibold text-slate-400 truncate">
                {currentUser?.role || 'Director Comercial'}
              </span>
            </div>

            <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:block" />
          </button>

          {/* User Profile Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 z-40 w-64 rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-2xl text-slate-200">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center border border-blue-400/30 shrink-0">
                    {currentUser?.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span>{(currentUser?.name || 'C').charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-extrabold text-xs text-white truncate">{currentUser?.name || 'Juan Pérez'}</div>
                    <div className="text-[10px] text-slate-400 truncate">{currentUser?.email || 'juan.perez@empresa.com'}</div>
                    <span className="inline-block mt-1 px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold uppercase">
                      {currentUser?.role || 'Director Comercial'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-0.5 text-xs font-medium">
                <button
                  onClick={() => { exitToPublicSite(); setIsProfileOpen(false); }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Sitio Web Público</span>
                  <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                </button>

                <div className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300">
                  <span className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Idioma</span>
                  </span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-slate-800 text-xs text-white px-2 py-0.5 rounded border border-slate-700 font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                  </select>
                </div>

                <button
                  onClick={() => { resetToDemoData(); setIsProfileOpen(false); }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-left border-t border-slate-800 mt-1 pt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Restablecer Datos de Demo</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Primary "+ Nuevo" Action Button */}
        <button
          id="crm-header-primary-add-btn"
          onClick={() => {
            if (activeTab === 'companies') openNewRecordModal('company');
            else if (activeTab === 'people') openNewRecordModal('person');
            else if (activeTab === 'tasks') openNewRecordModal('task');
            else openNewRecordModal('opportunity');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>
            {activeTab === 'companies'
              ? 'Nueva Empresa'
              : activeTab === 'people'
              ? 'Nuevo Contacto'
              : activeTab === 'tasks'
              ? 'Nueva Tarea'
              : 'Nuevo Negocio'}
          </span>
        </button>

      </div>
    </header>
  );
};
