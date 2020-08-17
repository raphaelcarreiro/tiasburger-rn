import React, { useState, useContext, useCallback } from 'react';
import { ThemeProvider } from '../styled-components';
import { DefaultTheme } from 'styled-components/native';
import Color from 'color';

export function createTheme(primary: string, secondary: string): DefaultTheme {
  const color = Color(primary);

  return {
    primary,
    secondary,
    contrast: color.isDark() ? '#fff' : '#000',
    error: '#dc3545',
  };
}

interface ThemeContextData {
  handleSetTheme(primary: string, secondary: string): void;
}

const ThemeContext = React.createContext({} as ThemeContextData);

export function useThemeContext(): ThemeContextData {
  const context = useContext(ThemeContext);
  return context;
}

const Theme: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(createTheme('#f44336', '#4b4b4d'));

  const handleSetTheme = useCallback((primary, secondary) => {
    setTheme(createTheme(primary, secondary));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ handleSetTheme }}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default Theme;
