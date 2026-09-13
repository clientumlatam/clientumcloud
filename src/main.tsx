import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeAnalytics } from './lib/analytics';

initializeAnalytics();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js?v=5').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      registration.update();

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('Nuevo Service Worker v5 instalado. Desregistrando/actualizando versión anterior...');
                installingWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            }
          };
        }
      };
    }).catch((err) => {
      console.log('ServiceWorker registration failed: ', err);
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
