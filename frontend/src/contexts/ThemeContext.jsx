import { createContext, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

const translations = {
  es: {
    home: 'Inicio',
    blog: 'Blog',
    about: 'Crew',
    contact: 'Contacto',
    login: 'Ingresar',
    register: 'Registrarse',
    light: 'Claro',
    dark: 'Oscuro',
    language: 'EN',
  },
  en: {
    home: 'Home',
    blog: 'Blog',
    about: 'Crew',
    contact: 'Contact',
    login: 'Log in',
    register: 'Sign up',
    light: 'Light',
    dark: 'Dark',
    language: 'ES',
  },
};

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') !== 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'es');

  const value = useMemo(() => ({
    darkMode,
    language,
    t: translations[language],
    toggleTheme: () => {
      setDarkMode((current) => {
        const next = !current;
        localStorage.setItem('theme', next ? 'dark' : 'light');
        return next;
      });
    },
    toggleLanguage: () => {
      setLanguage((current) => {
        const next = current === 'es' ? 'en' : 'es';
        localStorage.setItem('language', next);
        return next;
      });
    },
  }), [darkMode, language]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
