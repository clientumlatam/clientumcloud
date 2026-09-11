import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types';
import { syncWorkspaceToFirestore } from '../firebase';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  systemTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'clientum_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme?: ThemeMode }> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // fallback
    }
    return defaultTheme;
  });

  const resolvedTheme: 'light' | 'dark' = theme === 'dark' ? 'dark' : 'light';
  const systemTheme: 'light' | 'dark' = 'light';

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-theme', resolvedTheme);
    root.setAttribute('data-mode', resolvedTheme);
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    root.style.colorScheme = resolvedTheme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, resolvedTheme);
    } catch {
      // storage unavailable
    }
  }, [resolvedTheme]);

  const setTheme = (newTheme: ThemeMode) => {
    const targetTheme = newTheme === 'dark' ? 'dark' : 'light';
    setThemeState(targetTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, targetTheme);
    } catch {
      // storage unavailable
    }

    // Persist to Firestore if user is authenticated
    try {
      const authUserStr = localStorage.getItem('clientum_auth_user');
      if (authUserStr) {
        const userObj = JSON.parse(authUserStr);
        if (userObj?.id) {
          syncWorkspaceToFirestore(userObj.id, { theme: targetTheme });
        }
      }
    } catch (err) {
      console.warn('Failed to sync theme preference to Firestore:', err);
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        systemTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeContext };
