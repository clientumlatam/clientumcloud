import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CloudOff } from 'lucide-react';
import { db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export const ConnectivityIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setIsFirestoreConnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    let unsubscribe: (() => void) | null = null;
    try {
      if (db) {
        const testDocRef = doc(db, '_system_health', 'ping');
        unsubscribe = onSnapshot(
          testDocRef,
          { includeMetadataChanges: true },
          (snapshot) => {
            const fromCache = snapshot.metadata.fromCache;
            if (navigator.onLine) {
              setIsFirestoreConnected(!fromCache || true);
            }
          },
          (err) => {
            if (!navigator.onLine) {
              setIsFirestoreConnected(false);
            }
          }
        );
      }
    } catch (e) {
      console.warn('ConnectivityIndicator listener fallback:', e);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const isOffline = !isOnline || !isFirestoreConnected;

  if (!isOffline) {
    return null;
  }

  return (
    <div
      id="crm-connectivity-indicator"
      className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-800 dark:text-amber-200 text-xs font-bold animate-pulse shrink-0 shadow-2xs select-none"
      title={`Alerta de Red: ${
        !isOnline
          ? 'Navegador sin conexión a Internet.'
          : 'Conexión a Firestore interrumpida. Operando con caché local.'
      }`}
    >
      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </div>
      {!isOnline ? (
        <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
      ) : (
        <CloudOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
      )}
      <span className="hidden sm:inline">
        {!isOnline ? 'Modo Offline' : 'Firestore Desconectado'}
      </span>
      <span className="sm:hidden">Offline</span>
    </div>
  );
};
