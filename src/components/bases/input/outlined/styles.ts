import styled, { css } from 'styled-components/native';

interface InputProps {
  fullWidth?: boolean;
  isFocused?: boolean;
  error?: boolean;
  helperText?: boolean;
}

export const Container = styled.View`
  margin-top: 16px;
  margin-bottom: 8px;
  justify-content: flex-start;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 18.5px 14px;
  font-size: 16px;
  font-family: 'sans-serif-light';
`;

export const InputContainer = styled.View<InputProps>`
  min-width: ${props => (props.fullWidth ? '100%' : '100px')};
  border-color: #0000003b;
  border-width: 1px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.helperText &&
    css`
      margin-bottom: 3px;
    `}

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-color: ${theme.primary};
      border-width: 2px;
    `}

  ${props =>
    props.error &&
    css`
      border-color: red;
    `}
`;

export const IconContainer = styled.View`
  padding: 0 15px;
`;

export const HelperText = styled.Text<InputProps>`
  color: #ccc;
  font-size: 12px;

  ${props =>
    props.error &&
    css`
      color: red;
    `}
`;

export const TextLabel = styled.Text<InputProps>`
  position: absolute;
  font-size: 12px;
  top: -8px;
  left: 10px;
  font-family: 'sans-serif-light';
  color: #222;
  background-color: #fafafa;
  z-index: 10;
  padding: 0 5px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      color: ${theme.primary};
    `}
`;
