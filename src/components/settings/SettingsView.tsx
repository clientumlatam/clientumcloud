import React, { useEffect, useState } from 'react';
import {
  Database,
  Layers,
  Plus,
  Trash2,
  Check,
  Shield,
  ShieldCheck,
  Users,
  Download,
  RotateCcw,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  Sun,
  Moon,
  Palette,
  Eye,
  Sparkles,
  Monitor,
  GitBranch,
  ExternalLink,
  Code2,
  Workflow,
  Bug,
  BookOpen,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { CustomField, Language } from '../../types';
import { RolesPermissionsTab } from './RolesPermissionsTab';
import { AuditLogsTab } from './AuditLogsTab';
import { IntegrationsHubTab } from './IntegrationsHubTab';
import { ThemeModeSettings } from './ThemeModeSettings';
import { EcosystemReposHubTab } from './EcosystemReposHubTab';

export const SettingsView: React.FC = () => {
  const {
    users,
    roles,
    auditLogs,
    securityAnomalies,
    resetToDemoData,
    loadClientumLeads,
    exportOpportunitiesCSV,
    exportFullWorkspaceJSON,
    opportunities,
    companies,
    people,
    tasks,
    theme,
    setTheme,
    language,
    setLanguage,
    t,
    showToast,
  } = useCRM();

  const [activeSubTab, setActiveSubTab] = useState<'roles' | 'audit' | 'integrations' | 'appearance' | 'schema' | 'members' | 'ecosystem' | 'data'>('roles');

  useEffect(() => {
    try {
      if (sessionStorage.getItem('clientum_settings_section') === 'userApiKeys') {
        setActiveSubTab('integrations');
      }
    } catch {
      // The settings page remains usable when browser storage is disabled.
    }
  }, []);

  // Custom fields state
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: 'f-1', name: 'Contract Duration (Months)', type: 'number' },
    { id: 'f-2', name: 'Lead Acquisition Source', type: 'select', options: ['Inbound Demo', 'GitHub', 'Cold Email', 'Event'] },
    { id: 'f-3', name: 'Security Review Completed', type: 'boolean' },
    { id: 'f-4', name: 'Competitor Mentioned', type: 'text' },
  ]);

  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'select' | 'boolean'>('text');

  const handleAddCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;

    const newField: CustomField = {
      id: 'f-' + Date.now(),
      name: newFieldName,
      type: newFieldType,
      options: newFieldType === 'select' ? ['Option 1', 'Option 2'] : undefined,
    };

    setCustomFields((prev) => [...prev, newField]);
    setNewFieldName('');
    showToast(`Added custom field "${newField.name}"`, 'success');
  };

  const handleDeleteField = (id: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== id));
    showToast('Custom field removed', 'info');
  };

  const handleExportAllJSON = () => {
    const fullBackup = {
      opportunities,
      companies,
      people,
      tasks,
      customFields,
      theme,
      exportedAt: new Date().toISOString(),
      version: 'clientum-crm-v1',
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `clientum_crm_workspace_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full workspace JSON backup exported', 'success');
  };

  return (
    <div id="clientum-settings-view" className="flex-1 flex flex-col h-full bg-[#0a0c10] overflow-y-auto p-4 select-none">
      {/* Settings Header with Quick Theme Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2">
        <div>
          <h2 className="text-base font-semibold text-white">{t('settingsTitle')}</h2>
          <p className="text-xs text-slate-400">
            {t('settingsSubtitle')}
          </p>
        </div>

        {/* Quick Theme Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-950/40 px-3 py-1.5 text-xs font-semibold text-blue-300">
          {theme === 'dark' ? (
            <>
              <Moon className="h-3.5 w-3.5 text-blue-400" />
              <span>Clientum Obsidian · Modo oscuro</span>
            </>
          ) : (
            <>
              <Sun className="h-3.5 w-3.5 text-amber-400" />
              <span>Clientum Clarity · Modo claro</span>
            </>
          )}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1e2434] pb-2.5 mb-4 overflow-x-auto">
        <button
          id="tab-settings-roles"
          onClick={() => setActiveSubTab('roles')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'roles'
              ? 'bg-[#1e2434] text-white font-semibold shadow-2xs border border-[#2b354c]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span>Roles & Permisos (RBAC)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 font-mono">
            {roles.length}
          </span>
        </button>

        <button
          id="tab-settings-audit"
          onClick={() => setActiveSubTab('audit')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'audit'
              ? 'bg-[#1e2434] text-white font-semibold shadow-2xs border border-[#2b354c]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Auditoría & Logs</span>
          {securityAnomalies.filter((a) => a.status === 'active').length > 0 ? (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {securityAnomalies.filter((a) => a.status === 'active').length} Alerta
            </span>
          ) : (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
              SOC2 OK
            </span>
          )}
        </button>

        <button
          id="tab-settings-integrations"
          onClick={() => setActiveSubTab('integrations')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'integrations'
              ? 'bg-[#1e2434] text-white font-semibold shadow-2xs border border-[#2b354c]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Integraciones & API Hub</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
            GCal & Slack
          </span>
        </button>

        <button
          id="tab-settings-appearance"
          onClick={() => setActiveSubTab('appearance')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'appearance'
              ? 'bg-[#1e2434] text-white font-semibold shadow-2xs border border-[#2b354c]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          {t('appearanceTheme')}
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 font-mono">
            {language.toUpperCase()} • {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>

        <button
          id="tab-settings-schema"
          onClick={() => setActiveSubTab('schema')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'schema'
              ? 'bg-[#1e2434] text-white font-semibold shadow-2xs border border-[#2b354c]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          {t('customFieldsSchema')}
        </button>

        <button
          id="tab-settings-members"
          onClick={() => setActiveSubTab('members')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'members'
              ? 'bg-[#1e2434] text-white font-semibold shadow-2xs border border-[#2b354c]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          {t('teamMembers')} ({users.length})
        </button>

        <button
          id="tab-settings-ecosystem"
          onClick={() => setActiveSubTab('ecosystem')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'ecosystem'
              ? 'bg-[#1e2434] text-white font-semibold shadow-2xs border border-[#2b354c]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          {t('clientumRepos')}
        </button>

        <button
          id="tab-settings-data"
          onClick={() => setActiveSubTab('data')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'data'
              ? 'bg-[#1e2434] text-white font-semibold shadow-2xs border border-[#2b354c]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          {t('dataManagement')}
        </button>
      </div>

      {/* SUBTAB: ROLES & GRANULAR PERMISSIONS (RBAC) */}
      {activeSubTab === 'roles' && <RolesPermissionsTab />}

      {/* SUBTAB: AUDIT LOGS & COMPLIANCE */}
      {activeSubTab === 'audit' && <AuditLogsTab />}

      {/* SUBTAB: TWO-WAY INTEGRATIONS HUB */}
      {activeSubTab === 'integrations' && <IntegrationsHubTab />}

      {/* SUBTAB 0: APPEARANCE, THEME & LANGUAGE */}
      {activeSubTab === 'appearance' && (
        <div className="space-y-4 max-w-4xl">
          {/* Language Selector Card */}
          <div className="bg-[#12151d] border border-[#1e2330] p-5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  {t('languageSelector')} (i18n)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Selecciona tu idioma preferido / Escolha seu idioma preferido / Select your preferred language
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              {/* English */}
              <div
                id="lang-card-en"
                onClick={() => setLanguage('en')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  language === 'en'
                    ? 'border-blue-500 bg-[#161a26] shadow-md shadow-blue-500/10'
                    : 'border-[#1e2330] bg-[#0e1118] hover:border-[#2a3348]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">🇺🇸</span>
                  {language === 'en' && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white">English</div>
                <div className="text-[11px] text-slate-400">United States / Global</div>
              </div>

              {/* Spanish */}
              <div
                id="lang-card-es"
                onClick={() => setLanguage('es')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  language === 'es'
                    ? 'border-blue-500 bg-[#161a26] shadow-md shadow-blue-500/10'
                    : 'border-[#1e2330] bg-[#0e1118] hover:border-[#2a3348]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">🇪🇸</span>
                  {language === 'es' && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      <Check className="w-3 h-3" />
                      Activo
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white">Español</div>
                <div className="text-[11px] text-slate-400">España / Latinoamérica</div>
              </div>

              {/* Portuguese */}
              <div
                id="lang-card-pt"
                onClick={() => setLanguage('pt')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  language === 'pt'
                    ? 'border-blue-500 bg-[#161a26] shadow-md shadow-blue-500/10'
                    : 'border-[#1e2330] bg-[#0e1118] hover:border-[#2a3348]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">🇧🇷</span>
                  {language === 'pt' && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      <Check className="w-3 h-3" />
                      Ativo
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white">Português</div>
                <div className="text-[11px] text-slate-400">Brasil / Portugal</div>
              </div>
            </div>
          </div>

          {/* Main Theme Selection & Mode Toggle Component */}
          <ThemeModeSettings />

          {/* Accessibility & Readability Details */}
          <div className="bg-[#12151d] border border-[#1e2330] p-4 rounded-xl">
            <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              Accessibility & Display Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="p-3 rounded-lg bg-[#141822] border border-[#1e2330]">
                <div className="font-semibold text-slate-200 mb-1">Contrast Ratio</div>
                <p className="text-[11px] text-slate-400">
                  Meets WCAG 2.1 AAA contrast benchmarks with 7:1+ text-to-background ratio in light mode.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#141822] border border-[#1e2330]">
                <div className="font-semibold text-slate-200 mb-1">Crisp Borders</div>
                <p className="text-[11px] text-slate-400">
                  Clear visual delineations on Kanban cards, table headers, and form inputs for cognitive ease.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#141822] border border-[#1e2330]">
                <div className="font-semibold text-slate-200 mb-1">Local Persistence</div>
                <p className="text-[11px] text-slate-400">
                  Your theme preference is automatically remembered and restored upon every session.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 1: CUSTOM FIELDS & SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-4 max-w-3xl">
          {/* Add Field Card */}
          <div className="bg-[#12151d] border border-[#1e2330] p-4 rounded-xl">
            <h3 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-400" />
              Define New Custom Field
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Extend standard CRM objects (Deals, Accounts, Contacts) with custom properties.
            </p>

            <form onSubmit={handleAddCustomField} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                placeholder="Field name (e.g. Renewal Probability, Slack Channel)..."
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="flex-1 bg-[#181d29] text-xs text-white px-3 py-2 rounded-lg border border-[#273044] focus:outline-none focus:border-blue-500"
              />

              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value as any)}
                className="bg-[#181d29] text-xs text-white px-3 py-2 rounded-lg border border-[#273044] focus:outline-none focus:border-blue-500"
              >
                <option value="text">Text (String)</option>
                <option value="number">Number</option>
                <option value="select">Dropdown Select</option>
                <option value="boolean">Boolean Flag</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
              >
                Add Field
              </button>
            </form>
          </div>

          {/* Existing Fields List */}
          <div className="bg-[#12151d] border border-[#1e2330] rounded-xl overflow-hidden">
            <div className="p-3 bg-[#141822] border-b border-[#1e2330] text-xs font-semibold text-white">
              Active Custom Schema Properties
            </div>

            <div className="divide-y divide-[#181d28]">
              {customFields.map((field) => (
                <div
                  key={field.id}
                  className="p-3.5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <div>
                      <div className="font-semibold text-slate-100">{field.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Type: <span className="text-blue-400">{field.type}</span>
                        {field.options && ` • Options: [${field.options.join(', ')}]`}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteField(field.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete field"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MEMBERS */}
      {activeSubTab === 'members' && (
        <div className="bg-[#12151d] border border-[#1e2330] rounded-xl max-w-3xl overflow-hidden">
          <div className="p-3 bg-[#141822] border-b border-[#1e2330] flex items-center justify-between text-xs font-semibold text-white">
            <span>Workspace Team Members</span>
            <span className="text-[11px] text-slate-400 font-normal">Active Seats: 4 of 10</span>
          </div>

          <div className="divide-y divide-[#181d28]">
            {users.map((u) => (
              <div key={u.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#2b3345]"
                  />
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      {u.name}
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1f2536] text-blue-300 font-mono">
                        {u.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* SUBTAB: CLIENTUM REPOSITORIES & ECOSYSTEM MIGRATION */}
      {activeSubTab === 'ecosystem' && (
        <EcosystemReposHubTab />
      )}

      {/* SUBTAB 4: DATA MANAGEMENT */}
      {activeSubTab === 'data' && (
        <div className="bg-[#12151d] border border-[#1e2330] rounded-xl p-5 max-w-3xl space-y-5 text-xs">
          {/* Clientum B2B Leads Integration */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/40 to-indigo-950/30 border border-blue-500/20 shadow-lg shadow-blue-500/5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 mb-2">
                  Dataset de Leads 🇦🇷
                </span>
                <h3 className="font-bold text-white text-sm">Cargar Leads de Clientum B2B</h3>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                  Carga la base de datos de prospectos e industrias plásticas de Argentina (ABEPOL S.R.L., ACHA PLAST S.A., Verion ICSA, Dr. Lantos, etc.) directamente en tu pipeline activo de Clientum OS.
                </p>
              </div>
              <Database className="w-8 h-8 text-blue-400 shrink-0 opacity-80" />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-blue-500/15">
              <div className="text-[11px] text-slate-400">
                <strong className="text-white">Leads Disponibles:</strong> +3,740 empresas industriales segmentadas por provincia y email verificado.
              </div>
              <button
                onClick={loadClientumLeads}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md transition-all shrink-0 cursor-pointer text-xs"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Importar Base Clientum</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white text-xs mb-1">Backup & Migration</h3>
            <p className="text-slate-400 text-xs">
              Export your CRM state to JSON or CSV for reporting, data warehousing, or backup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportFullWorkspaceJSON}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Export Full CRM & ERP Workspace (JSON)</span>
            </button>

            <button
              onClick={exportOpportunitiesCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#181e2b] hover:bg-[#202738] text-white border border-[#2b354a] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Deals (CSV)</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#1e2330]">
            <h3 className="font-semibold text-rose-400 text-xs mb-1">Danger Zone</h3>
            <p className="text-slate-400 text-xs mb-3">
              Reset your entire workspace database back to standard sample seed data.
            </p>
            <button
              onClick={resetToDemoData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Database to Demo State</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
