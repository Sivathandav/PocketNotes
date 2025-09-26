import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { STORAGE_KEYS, THEMES } from '../utils/constants';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => storage.get(STORAGE_KEYS.THEME) || false);

  useEffect(() => {
    storage.set(STORAGE_KEYS.THEME, isDark);
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);