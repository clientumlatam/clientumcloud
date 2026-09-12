import React, { useEffect, useState, useCallback } from 'react';
import { Sun, Moon, Sparkles, Check, Eye, Monitor, ShieldCheck, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeMode } from '../../types';
import { ThemeSettingsModal } from './ThemeSettingsModal';

export interface ThemeModeSettingsProps {
  storageKey?: string;
  className?: string;
  onThemeChange?: (theme: ThemeMode) => void;
  showPreviews?: boolean;
}

const DEFAULT_STORAGE_KEY = 'clientum_theme';

export const ThemeModeSettings: React.FC<ThemeModeSettingsProps> = ({
  storageKey = DEFAULT_STORAGE_KEY,
  className = '',
  onThemeChange,
  showPreviews = true,
}) => {
  const { theme, resolvedTheme, systemTheme, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applyTheme = useCallback(
    (newTheme: ThemeMode) => {
      setTheme(newTheme);
      if (onThemeChange) {
        onThemeChange(newTheme);
      }
    },
    [setTheme, onThemeChange]
  );

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <div
        id="theme-mode-settings-card"
        className={`bg-[#12151d] border border-[#1e2330] p-5 sm:p-6 rounded-2xl shadow-sm space-y-6 ${className}`}
      >
        {/* Header with Title and Quick Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                {theme === 'system' ? (
                  <Monitor className="w-4 h-4 text-blue-400" />
                ) : isDark ? (
                  <Moon className="w-4 h-4 text-blue-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <h3 className="text-sm font-semibold text-white">
                Tema Visual & Modo de Pantalla
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Alterna entre modo claro, oscuro y sincronización con el sistema. La preferencia se persiste en <code className="text-blue-400 font-mono text-[11px]">localStorage</code> y aplica el atributo <code className="text-blue-400 font-mono text-[11px]">data-theme="{resolvedTheme}"</code> en el elemento raíz del documento.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              id="theme-open-modal-preview-btn"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista Previa en Vivo</span>
            </button>
          </div>
        </div>

        {/* 3-Mode Selection Cards */}
        {showPreviews && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Light Mode Card */}
            <div
              id="theme-option-light"
              onClick={() => applyTheme('light')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                theme === 'light'
                  ? 'border-blue-500 bg-[#f8fafc] text-slate-900 shadow-md shadow-blue-500/10 ring-1 ring-blue-500/30'
                  : 'border-[#1e2330] bg-[#0e1118] text-slate-300 hover:border-[#2a3348]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-amber-500 shadow-2xs">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Modo Claro
                    </h4>
                    <span className={`text-[11px] font-mono ${theme === 'light' ? 'text-blue-900' : 'text-slate-400'}`}>
                      Clientum Clarity (WCAG AAA)
                    </span>
                  </div>
                </div>

                {theme === 'light' && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300">
                    <Check className="w-3 h-3" />
                    Activo
                  </span>
                )}
              </div>

              {/* Simulated Workspace Preview */}
              <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-2 mb-3 shadow-2xs">
                <div className="flex items-center justify-between text-[10px] text-slate-700 pb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-700" />
                    <span className="text-slate-900 font-bold">Acme Latam Corp</span>
                  </div>
                  <span className="text-emerald-700 font-mono font-bold">$120,000</span>
                </div>
                <div className="flex items-center gap-2 text-[9px]">
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-mono font-semibold border border-blue-200">
                    Negociación
                  </span>
                  <span className="text-slate-500 font-medium">Cierre: 15 Dic</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className={`flex items-center gap-1.5 ${theme === 'light' ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Fondo #f8fafc / Texto #0f172a
                </span>
                <span className="font-mono text-[10px] text-slate-500">data-theme="light"</span>
              </div>
            </div>

            {/* Dark Mode Card */}
            <div
              id="theme-option-dark"
              onClick={() => applyTheme('dark')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                theme === 'dark'
                  ? 'border-blue-500 bg-[#09132b] text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-500/30'
                  : 'border-[#1e2330] bg-[#0e1118] text-slate-300 hover:border-[#2a3348]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#040c1a] border border-[#131b2e] flex items-center justify-center text-blue-400 shadow-2xs">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Modo Oscuro
                    </h4>
                    <span className="text-[11px] text-blue-300 font-mono">
                      Clientum Midnight Obsidian
                    </span>
                  </div>
                </div>

                {theme === 'dark' && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-700">
                    <Check className="w-3 h-3" />
                    Activo
                  </span>
                )}
              </div>

              {/* Simulated Workspace Preview */}
              <div className="rounded-lg bg-[#040c1a] p-3 border border-[#131b2e] space-y-2 mb-3 shadow-2xs">
                <div className="flex items-center justify-between text-[10px] text-slate-300 pb-1.5 border-b border-[#131b2e]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-white font-bold">Acme Latam Corp</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold">$120,000</span>
                </div>
                <div className="flex items-center gap-2 text-[9px]">
                  <span className="px-1.5 py-0.5 rounded bg-blue-900/50 text-blue-300 font-mono font-semibold border border-blue-800">
                    Negociación
                  </span>
                  <span className="text-slate-400 font-medium">Cierre: 15 Dic</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Fondo #040c1a / Texto #f8fafc
                </span>
                <span className="font-mono text-[10px] text-slate-400">data-theme="dark"</span>
              </div>
            </div>

            {/* System Auto Mode Card */}
            <div
              id="theme-option-system"
              onClick={() => applyTheme('system')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                theme === 'system'
                  ? 'border-blue-500 bg-[#09132b] text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-500/30'
                  : 'border-[#1e2330] bg-[#0e1118] text-slate-300 hover:border-[#2a3348]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800 flex items-center justify-center text-indigo-400 shadow-2xs">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Automático (Sistema OS)
                    </h4>
                    <span className="text-[11px] text-indigo-300 font-mono">
                      Detectado: {systemTheme === 'dark' ? 'Oscuro' : 'Claro'}
                    </span>
                  </div>
                </div>

                {theme === 'system' && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-700">
                    <Check className="w-3 h-3" />
                    Activo
                  </span>
                )}
              </div>

              {/* Simulated Workspace Preview */}
              <div className="rounded-lg bg-[#0a1120] p-3 border border-[#1b2742] space-y-2 mb-3 shadow-2xs">
                <div className="flex items-center justify-between text-[10px] text-slate-300 pb-1.5 border-b border-[#1b2742]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-white font-bold">Auto-Sync Activo</span>
                  </div>
                  <span className="text-indigo-400 font-mono font-bold">prefers-color-scheme</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Sigue las preferencias de pantalla y horario de tu sistema operativo automáticamente.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  Resuelto: {resolvedTheme}
                </span>
                <span className="font-mono text-[10px] text-slate-400">data-theme="{resolvedTheme}"</span>
              </div>
            </div>
          </div>
        )}

        {/* Technical Persistence & Diagnostics Bar */}
        <div className="p-3.5 rounded-xl bg-[#0e1118] border border-[#1e2330] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Persistencia activa: <strong className="text-slate-200">localStorage.getItem('{storageKey}') = "{theme}"</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-[#161a26] border border-[#2b354c] text-blue-400">
              root.dataset.theme = "{resolvedTheme}"
            </span>
          </div>
        </div>
      </div>

      {/* Theme Settings Live Preview Modal */}
      <ThemeSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ThemeModeSettings;

