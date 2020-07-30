// import styled, { css } from 'styled-components/native';
import styled, { css } from '../../../../styled-components';

interface InputProps {
  fullWidth?: boolean;
  isFocused?: boolean;
  error?: boolean;
  helperText?: boolean;
}

export const Container = styled.View`
  margin-top: 8px;
  margin-bottom: 8px;
  justify-content: flex-start;
  position: relative;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 0px;
  font-size: 16px;
  font-family: 'sans-serif-light';
`;

export const InputContainer = styled.View<InputProps>`
  min-width: ${props => (props.fullWidth ? '100%' : '100px')};
  border-color: #0000003b;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: flex-end;
  height: 60px;

  ${props =>
    props.helperText &&
    css`
      margin-bottom: 3px;
    `}

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-color: ${theme.primary};
      border-bottom-width: 2px;
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
  top: 0px;
  font-family: 'sans-serif-light';
  color: ${props => props.theme.primary};

  ${({ isFocused }) =>
    isFocused &&
    css`
      top: -24px !important;
    `}
`;
