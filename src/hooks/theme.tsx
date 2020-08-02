import React, { useState, useContext, useCallback } from 'react';
import { ThemeProvider } from '../styled-components';
import { DefaultTheme } from 'styled-components/native';
import { ThemeProvider as PaperThemeProvider, DefaultTheme as DefaultPaperTheme } from 'react-native-paper';
import { Theme as PaperThemeData } from 'react-native-paper/src/types';
import Color from 'color';

export function createTheme(primary: string, secondary: string): DefaultTheme {
  const color = Color(primary);

  return {
    primary,
    secondary,
    contrast: color.isDark() ? '#fff' : '#000',
  };
}

export function createPaperTheme(primary: string, secondary: string): PaperThemeData {
  const color = Color(primary);

  return {
    ...DefaultPaperTheme,
    colors: {
      ...DefaultPaperTheme.colors,
      primary: primary,
      accent: secondary,
      text: color.isDark() ? '#fff' : '#000',
    },
  };
}

interface ThemeContextData {
  handleSetTheme(primary: string, secondary: string): void;
  handleSetPaperTheme(primary: string, secondary: string): void;
}

const ThemeContext = React.createContext({} as ThemeContextData);

export function useThemeContext(): ThemeContextData {
  const context = useContext(ThemeContext);
  return context;
}

const Theme: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(createTheme('#f44336', '#4b4b4d'));
  const [paperTheme, setPaperTheme] = useState<PaperThemeData>(createPaperTheme('#f44336', '#4b4b4d'));

  const handleSetTheme = useCallback((primary, secondary) => {
    setTheme(createTheme(primary, secondary));
  }, []);

  const handleSetPaperTheme = useCallback((primary, secondary) => {
    setPaperTheme(createPaperTheme(primary, secondary));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PaperThemeProvider theme={paperTheme}>
        <ThemeContext.Provider value={{ handleSetTheme, handleSetPaperTheme }}>{children}</ThemeContext.Provider>
      </PaperThemeProvider>
    </ThemeProvider>
  );
};

export default Theme;
