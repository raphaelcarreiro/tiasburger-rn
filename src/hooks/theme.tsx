import React, { useContext } from 'react';

export interface ThemeData {
  primary: string;
  secondary: string;
  [key: string]: string;
}

interface ThemeProviderContextData {
  theme: ThemeData;
}

interface ThemeProviderProps {
  theme: ThemeData;
}

const ThemeProviderContext = React.createContext<ThemeProviderContextData>({} as ThemeProviderContextData);

export function useTheme(): ThemeProviderContextData {
  const context = useContext(ThemeProviderContext);
  return context;
}

export function createTheme(primary = '#fff', secondary = '#333'): ThemeData {
  return {
    primary,
    secondary,
  };
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  return <ThemeProviderContext.Provider value={{ theme }}>{children}</ThemeProviderContext.Provider>;
};

export default ThemeProvider;
