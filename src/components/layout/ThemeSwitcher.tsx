import React, { useState, useRef, useEffect } from 'react';
import {
  Sun,
  Moon,
  Monitor,
  Check,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeMode } from '../../types';
import { ThemeSettingsModal } from '../settings/ThemeSettingsModal';

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, resolvedTheme, systemTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (mode: ThemeMode) => {
    setTheme(mode);
    setIsOpen(false);
  };

  const getActiveIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
    }
    if (resolvedTheme === 'dark') {
      return <Moon className="w-3.5 h-3.5 text-blue-400" />;
    }
    return <Sun className="w-3.5 h-3.5 text-amber-500" />;
  };

  const getLabel = () => {
    if (theme === 'system') {
      return `Auto (${systemTheme === 'dark' ? 'Oscuro' : 'Claro'})`;
    }
    return theme === 'dark' ? 'Oscuro' : 'Claro';
  };

  return (
    <>
      <div id="crm-theme-switcher-container" ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
        {/* Trigger Button */}
        <button
          id="crm-theme-switcher-btn"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-xs ${
            isOpen
              ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/60 dark:border-blue-700 dark:text-blue-300'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-800'
          }`}
          title={`Tema actual: ${getLabel()} (Haz clic para cambiar o ver vista previa)`}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {getActiveIcon()}
          {showLabel && (
            <span className="hidden sm:inline text-[11px]">{getLabel()}</span>
          )}
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            id="crm-theme-switcher-dropdown"
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 dark:border-[#1a2642] bg-white dark:bg-[#0c1222] p-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100 text-slate-800 dark:text-slate-100"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400 border-b border-slate-100 dark:border-[#1a2642] mb-1 flex items-center justify-between">
              <span>Modo de Pantalla</span>
              <span className="font-mono text-[9px] text-blue-600 dark:text-blue-400">Clientum</span>
            </div>

            {/* Option: Light */}
            <button
              id="theme-option-dropdown-light"
              type="button"
              onClick={() => handleSelect('light')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                theme === 'light'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
              role="menuitem"
            >
              <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Sun className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="text-xs">Modo Claro</div>
                <div className="text-[10px] text-slate-400 font-normal">Clientum Clarity</div>
              </div>
              {theme === 'light' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ml-auto shrink-0" />}
            </button>

            {/* Option: Dark */}
            <button
              id="theme-option-dropdown-dark"
              type="button"
              onClick={() => handleSelect('dark')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
              role="menuitem"
            >
              <div className="w-6 h-6 rounded-md bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-400 shrink-0">
                <Moon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="text-xs">Modo Oscuro</div>
                <div className="text-[10px] text-slate-400 font-normal">Midnight Obsidian</div>
              </div>
              {theme === 'dark' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ml-auto shrink-0" />}
            </button>

            {/* Option: System (OS) */}
            <button
              id="theme-option-dropdown-system"
              type="button"
              onClick={() => handleSelect('system')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                theme === 'system'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
              role="menuitem"
            >
              <div className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                <Monitor className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="text-xs">Automático (Sistema)</div>
                <div className="text-[10px] text-slate-400 font-normal">
                  OS: <span className="capitalize font-semibold">{systemTheme === 'dark' ? 'Oscuro' : 'Claro'}</span>
                </div>
              </div>
              {theme === 'system' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ml-auto shrink-0" />}
            </button>

            {/* Divider and Theme Preview Modal launcher */}
            <div className="border-t border-slate-100 dark:border-[#1a2642] my-1 pt-1">
              <button
                id="theme-option-open-preview-modal"
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                role="menuitem"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Vista Previa & Ajustes...</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Live Preview & Theme Settings Modal */}
      <ThemeSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
