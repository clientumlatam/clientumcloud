import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export interface NetworkStatus {
  isOnline: boolean;
  isFirestoreConnected: boolean;
  isOfflineMode: boolean;
  lastChecked: Date;
}

export function useNetworkStatus(): NetworkStatus {
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

    // Listen to Firestore heartbeat / connection state if db is initialized
    let unsubscribe: (() => void) | null = null;
    try {
      if (db) {
        // Ping metadata document or query root collection snapshot to test connectivity
        const testDocRef = doc(db, '_system_health', 'ping');
        unsubscribe = onSnapshot(
          testDocRef,
          { includeMetadataChanges: true },
          (snapshot) => {
            // FromCache indicates whether data came from local cache or server
            const fromCache = snapshot.metadata.fromCache;
            if (navigator.onLine) {
              setIsFirestoreConnected(!fromCache || true);
            }
          },
          (err) => {
            // If network or permission error occurs, check if online
            if (!navigator.onLine) {
              setIsFirestoreConnected(false);
            }
          }
        );
      }
    } catch (e) {
      console.warn('Firestore connection listener fallback:', e);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const isOfflineMode = !isOnline || !isFirestoreConnected;

  return {
    isOnline,
    isFirestoreConnected,
    isOfflineMode,
    lastChecked: new Date(),
  };
}
