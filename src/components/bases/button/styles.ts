import styled, { css } from '../../../styled-components';

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'error';
  fullWidth?: boolean;
  variant?: string;
  disabled?: boolean;
  disablePadding?: boolean;
  fontSize?: number;
  disableUpperCase?: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ color, theme }) => (color ? theme[color] : '#eee')};
  height: 42px;
  padding: 0 15px;

  ${props =>
    props.disablePadding &&
    css`
      padding: 0;
    `}

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
    props.disableUpperCase &&
    css`
      text-transform: none;
    `}

  ${props =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize}px;
    `}

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
