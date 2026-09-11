import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CRMProvider, useCRM } from './context/CRMContext';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { PublicSite } from './components/public/PublicSite';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { isPrivateAppPath } from './lib/navigation';
import { subscribeToAuthState, syncUserProfileToFirestore } from './firebase';

const PrivateEnvironment = React.lazy(() => import('./components/app/PrivateEnvironment').then((module) => ({
  default: module.PrivateEnvironment,
})));

const FirebaseAuthBridge: React.FC = () => {
  const {
    syncClerkAuth,
    isAuthModalOpen,
    setIsAuthModalOpen,
    enterApp,
  } = useCRM();
  const lastUserId = React.useRef<string | null | undefined>(undefined);

  React.useEffect(() => {
    const unsubscribe = subscribeToAuthState((fbUser) => {
      const userId = fbUser?.uid || null;
      const authStateChanged = lastUserId.current !== userId;
      const previousUserId = lastUserId.current;
      if (!authStateChanged && lastUserId.current !== undefined) return;
      lastUserId.current = userId;

      try {
        if (fbUser) {
          // Immediately sync user profile into Firestore collection 'users'
          syncUserProfileToFirestore({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName,
            photoURL: fbUser.photoURL,
            providerId: fbUser.providerData?.[0]?.providerId || 'google.com',
          });
        }

        syncClerkAuth(fbUser ? {
          id: fbUser.uid,
          email: fbUser.email || '',
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Usuario Clientum',
          avatar: fbUser.photoURL || null,
        } : null);

        if (fbUser && isAuthModalOpen && previousUserId !== fbUser.uid) {
          setIsAuthModalOpen(false);
          enterApp(true);
        }
      } catch (error) {
        console.error('Firebase auth synchronization failed:', error);
        syncClerkAuth(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [enterApp, isAuthModalOpen, setIsAuthModalOpen, syncClerkAuth]);

  return null;
};

const AppContent: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const { isPublicSiteVisible, isAuthenticated, isAuthReady, openPublicSite, enterApp } = useCRM();
  const [pathname, setPathname] = React.useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  );
  const isPrivateRoute = isPrivateAppPath(pathname);

  // Keep browser navigation and the context's environment state in sync.
  React.useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    if (!isAuthReady) return;

    if (isPrivateRoute && isAuthenticated) {
      if (isPublicSiteVisible) enterApp();
      return;
    }

    if (isPrivateRoute && !isAuthenticated) {
      window.history.replaceState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      openPublicSite();
      return;
    }

    if (!isPrivateRoute && !isPublicSiteVisible) openPublicSite();
  }, [enterApp, isAuthReady, isAuthenticated, isPrivateRoute, isPublicSiteVisible, openPublicSite]);

  const publicEnvironment = (
    <div data-theme={resolvedTheme} className="min-h-screen w-screen overflow-x-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <PublicSite />
      <AuthModal />
      <ToastContainer />
    </div>
  );

  const privateEnvironment = (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-[#0a0c10] text-sm text-slate-400">
          Cargando Clientum CRM…
        </div>
      }
    >
      <PrivateEnvironment />
    </React.Suspense>
  );

  if (!isAuthReady && isPrivateRoute) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#07090e] text-sm text-slate-300">
        Verificando tu sesión segura con Firebase…
      </div>
    );
  }

  return (
    <ProtectedRoute
      isAuthenticated={isPrivateRoute && isAuthenticated}
      fallback={publicEnvironment}
    >
      {privateEnvironment}
    </ProtectedRoute>
  );
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <CRMProvider>
        <FirebaseAuthBridge />
        <AppContent />
      </CRMProvider>
    </ThemeProvider>
  );
}
