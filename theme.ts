export interface Theme {
  primary: string;
  secondary: string;
}

export function createTheme(): Theme {
  return {
    primary: '#000',
    secondary: '#fff',
  };
}
