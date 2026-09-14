import React from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export const OfflinePulsingIndicator: React.FC = () => {
  const { isOnline, isFirestoreConnected, isOfflineMode } = useNetworkStatus();

  if (!isOfflineMode) {
    return null;
  }

  return (
    <div
      id="crm-offline-pulsing-indicator"
      className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-800 dark:text-amber-200 text-xs font-bold animate-pulse shrink-0 shadow-2xs select-none"
      title={`Alerta de Conectividad: ${
        !isOnline
          ? 'Sin conexión a Internet (Navigator Offline).'
          : 'Conexión a Firestore interrumpida. Operando con caché local.'
      }`}
    >
      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </div>
      <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
      <span className="hidden sm:inline">
        {!isOnline ? 'Modo Offline' : 'Firestore Desconectado'}
      </span>
      <span className="sm:hidden">Offline</span>
    </div>
  );
};
