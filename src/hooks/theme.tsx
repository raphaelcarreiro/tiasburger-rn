import React, { useState, useContext, useEffect } from 'react';
import { Theme, createTheme } from '../../theme';

interface ThemeProviderContextData {
  theme: Theme;
}

interface ThemeProviderProps {
  theme?: Theme;
}

const ThemeProviderContext = React.createContext({} as ThemeProviderContextData);

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  return context;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  const [defaultTheme, setDefaultTheme] = useState<Theme>(createTheme());

  useEffect(() => {
    if (theme) setDefaultTheme(theme);
  }, [theme]);

  return <ThemeProviderContext.Provider value={{ theme: defaultTheme }}>{children}</ThemeProviderContext.Provider>;
};

export default ThemeProvider;
