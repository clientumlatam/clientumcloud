import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ActiveTab } from '../../types';

export interface SidebarNavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  configurable?: boolean;
  subItems?: SidebarNavItem[];
  defaultExpanded?: boolean;
}

export interface SidebarItemProps {
  item: SidebarNavItem;
  isActive: boolean;
  isExpanded: boolean;
  isCollapsed?: boolean;
  activeTab: ActiveTab;
  onNavClick: (id: ActiveTab) => void;
  onToggleSubmenu: (id: string, e: React.MouseEvent) => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = React.memo(({
  item,
  isActive,
  isExpanded,
  isCollapsed = false,
  activeTab,
  onNavClick,
  onToggleSubmenu,
}) => {
  const hasSub = item.subItems && item.subItems.length > 0;
  const IconComponent = item.icon;

  return (
    <div className="space-y-0.5">
      <div className={`group relative flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
        <button
          onClick={() => onNavClick(item.id)}
          aria-current={isActive ? 'page' : undefined}
          title={isCollapsed ? item.label : undefined}
          className={`flex flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${ isActive ? 'bg-blue-600 text-[var(--text-primary,#0f172a)] dark:text-white shadow-xs font-bold' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] dark:text-[var(--text-primary,#0f172a)] dark:text-slate-200 dark:hover:bg-[var(--bg-card-hover,#f1f5f9)] dark:hover:bg-[#0e1626] dark:hover:text-white' } ${isCollapsed ? 'justify-center w-10 flex-none px-0' : ''}`}
        >
          <IconComponent
            className={`h-4 w-4 shrink-0 ${ isActive ? 'text-white' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)] dark:text-[var(--text-muted,#64748b)] dark:text-slate-400 dark:group-hover:text-white' }`}
          />
          {!isCollapsed && <span className="truncate">{item.label}</span>}

          {!isCollapsed && item.badge && (
            <span
              className={`ml-auto rounded px-1.5 py-0.2 text-[10px] font-bold ${ item.badgeColor || (isActive ? 'bg-[var(--bg-card)]/20 text-white' : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] dark:bg-[#111a2d] dark:text-[var(--text-primary,#0f172a)] dark:text-slate-200') }`}
            >
              {item.badge}
            </span>
          )}
        </button>

        {hasSub && !isCollapsed && (
          <button
            onClick={(e) => onToggleSubmenu(item.id, e)}
            aria-label={`Expandir subopciones de ${item.label}`}
            className={`flex h-8 w-6 items-center justify-center rounded-r-lg transition-colors ${ isActive ? 'text-white/80 hover:text-white' : 'text-[var(--text-muted,#64748b)] dark:text-slate-400 hover:text-[var(--text-secondary)] dark:hover:text-[var(--text-primary,#0f172a)] dark:hover:text-slate-200' }`}
          >
            <ChevronRight
              className={`h-3.5 w-3.5 transition-transform ${ isExpanded ? 'rotate-90' : '' }`}
            />
          </button>
        )}
      </div>

      {/* Subitems anidados */}
      {hasSub && isExpanded && !isCollapsed && (
        <div className="ml-5 space-y-0.5 border-l-2 pl-2 border-[var(--border-subtle)] dark:border-[#1c2d47]">
          {item.subItems!.map((sub) => {
            const subActive = activeTab === sub.id;
            const SubIcon = sub.icon;
            return (
              <button
                key={sub.id}
                onClick={() => onNavClick(sub.id)}
                aria-current={subActive ? 'page' : undefined}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${ subActive ? 'bg-blue-100 text-blue-900 font-bold dark:bg-blue-950/60 dark:text-blue-300' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] dark:text-[var(--text-secondary,#475569)] dark:text-slate-300 dark:hover:bg-[var(--bg-card-hover,#f1f5f9)] dark:hover:bg-[#0e1626] dark:hover:text-white' }`}
              >
                <SubIcon className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted,#64748b)] dark:text-slate-400" />
                <span className="truncate">{sub.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

SidebarItem.displayName = 'SidebarItem';
