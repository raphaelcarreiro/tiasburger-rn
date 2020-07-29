import styled from 'styled-components/native';
import { ThemeData } from '../../../hooks/theme';

interface ButtonProps {
  theme: ThemeData;
  backgroundColor: string | undefined;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 60px;
  background-color: ${({ backgroundColor, theme }) => (backgroundColor ? theme[backgroundColor] : '#eee')};
`;
