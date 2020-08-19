// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    contrast: string;
    secondaryContrast: string;
    error: string;
    primaryDark: string;
    primaryLight: string;
  }
}
