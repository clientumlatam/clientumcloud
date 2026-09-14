import React, { useState } from 'react';
import { Server, Copy, Check, Clock } from 'lucide-react';

export interface VersionInfoProps {
  version?: string;
  buildTimestamp?: string;
  className?: string;
}

export const VersionInfo: React.FC<VersionInfoProps> = ({
  version = 'v6.0-live',
  buildTimestamp = (import.meta.env.VITE_BUILD_TIME as string) || new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAuditInfo = () => {
    const auditData = {
      app: 'ClientumCRM (ClientumOS)',
      version,
      buildTimestamp,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
      environment: 'Production Cloud Run / Vercel Edge',
      timestamp: new Date().toISOString(),
    };

    navigator.clipboard.writeText(JSON.stringify(auditData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="clientum-version-info-footer"
      className={`text-[11px] text-slate-400 dark:text-slate-500 font-mono flex items-center justify-between px-3 py-1.5 bg-slate-100/60 dark:bg-slate-900/40 rounded-md border border-slate-200/60 dark:border-slate-800/60 select-none ${className}`}
      title={`ClientumCRM Auditoría de Despliegue | Versión: ${version} | Compilación: ${buildTimestamp}`}
    >
      <div className="flex items-center gap-1.5 truncate">
        <Server className="w-3 h-3 text-blue-500 shrink-0" />
        <span className="font-bold text-slate-700 dark:text-slate-300">{version}</span>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <span className="truncate hidden sm:inline text-slate-500">{buildTimestamp}</span>
      </div>

      <button
        onClick={handleCopyAuditInfo}
        className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shrink-0 ml-2"
        title="Copiar datos de auditoría de versión"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copiado</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span>Auditar</span>
          </>
        )}
      </button>
    </div>
  );
};
