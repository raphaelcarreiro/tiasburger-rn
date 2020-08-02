// styled-components.ts
import * as styledComponents from 'styled-components/native';

interface ThemeInterface extends styledComponents.DefaultTheme {
  primary: string;
  secondary: string;
  contrast: string;
}

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<ThemeInterface>;

export { css, ThemeProvider };
export default styled;
