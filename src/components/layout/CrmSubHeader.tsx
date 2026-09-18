import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Bot,
  FileCheck,
  Globe,
  Compass,
  Boxes,
  Settings,
  Sparkles,
  Users2,
  Calendar,
  BarChart3,
  HardDrive,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { ActiveTab } from '../../types';

interface SubHeaderItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const CrmSubHeader: React.FC = () => {
  const { activeTab, setActiveTab } = useCRM();

  const subHeaderNavItems: SubHeaderItem[] = [
    { id: 'dashboard', label: 'Resumen Ejecutivo', icon: LayoutDashboard },
    { id: 'opportunities', label: 'Pipeline Deals', icon: Briefcase, badge: 'Kanban' },
    { id: 'whatsapp', label: 'WhatsApp WACE', icon: MessageSquare, badge: 'IA Live' },
    { id: 'agenteOS', label: 'Agentes IA (14 Roles)', icon: Bot, badge: 'AgenteOS' },
    { id: 'propuestas', label: 'Editor Brochure & PDF', icon: FileCheck },
    { id: 'industryLanding', label: 'Web Public & Captura', icon: Globe },
    { id: 'operations', label: 'Showman & Logística', icon: Compass },
    { id: 'ecosystemHub', label: 'Hub Ecosistema (14 Repos)', icon: Boxes, badge: '14 Repos' },
    { id: 'analytics', label: 'Clientum BI', icon: BarChart3 },
    { id: 'settings', label: 'Ajustes & API', icon: Settings },
  ];

  return (
    <div
      id="crm-sub-header-navigation"
      className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-200 h-10 px-3 flex items-center justify-between gap-2 overflow-x-auto shrink-0 select-none no-scrollbar z-20 shadow-xs"
    >
      <div className="flex items-center gap-1.5 min-w-max">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 border-r border-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
          <span>Atajos Rápidos:</span>
        </span>

        {subHeaderNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs font-bold ring-1 ring-blue-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/60'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
