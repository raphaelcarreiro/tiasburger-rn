import styled, { css } from '../../../styled-components';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  color?: 'primary' | 'secondary';
  fullWidth?: boolean;
  variant?: string;
  disabled?: boolean;
}

export const Button = styled(RectButton)<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${props => (props.fullWidth ? '100%' : '100px')};
  text-transform: uppercase;
  border-radius: 4px;
  background-color: ${({ color, theme }) => (color ? theme[color] : '#eee')};
  height: 42px;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}

  ${({ color, theme }) =>
    color &&
    css`
      background-color: ${theme[color]};
    `}

  ${({ variant }) =>
    variant === 'text' &&
    css`
      background-color: transparent;
    `};
`;

export const ButtonText = styled.Text<ButtonProps>`
  color: ${props => props.theme.contrast};
  text-transform: uppercase;
  font-size: 14px;

  ${props =>
    props.variant === 'text' &&
    css`
      color: #222;
    `}

  ${({ theme, color, variant }) =>
    color &&
    variant === 'text' &&
    css`
      color: ${theme[color]};
    `}
`;
