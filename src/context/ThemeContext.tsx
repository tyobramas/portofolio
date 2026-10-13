import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'vibecoder';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get('theme');
      if (urlTheme === 'vibecoder' || urlTheme === 'dark') {
        return urlTheme;
      }
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'vibecoder') {
        return 'vibecoder';
      }
    }
    // Default to 'vibecoder' as the permanent default theme
    return 'vibecoder';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      // Update data-theme on root for global styling
      document.documentElement.setAttribute('data-theme', newTheme);
      if (newTheme === 'vibecoder') {
        document.documentElement.classList.add('theme-vibecoder');
        document.documentElement.classList.remove('theme-dark');
      } else {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-vibecoder');
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'vibecoder' : 'dark');
  };

  useEffect(() => {
    // Initial sync
    setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
