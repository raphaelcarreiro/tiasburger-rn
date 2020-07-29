import React, { useState, useContext, useCallback } from 'react';
import { ThemeProvider } from '../styled-components';
import { DefaultTheme } from 'styled-components/native';

export function createTheme(primary: string, secondary: string): DefaultTheme {
  return {
    primary,
    secondary,
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
  const [theme, setTheme] = useState<DefaultTheme>(createTheme('red', 'green'));

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
