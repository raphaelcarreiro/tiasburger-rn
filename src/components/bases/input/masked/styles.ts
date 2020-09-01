// import styled, { css } from 'styled-components/native';
import styled, { css } from 'styled-components/native';
import { Animated } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

interface InputProps {
  fullWidth?: boolean;
  isFocused?: boolean;
  error?: boolean;
  helperText?: boolean;
}

export const Container = styled.View`
  margin-top: 8px;
  margin-bottom: 8px;
  position: relative;
`;

export const Input = styled(TextInputMask)`
  padding: 0px;
  font-size: 16px;
  font-family: 'sans-serif-light';
  flex: 1;
`;

export const InputContainer = styled.View<InputProps>`
  border-color: #0000003b;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: flex-end;
  height: 60px;

  ${props =>
    props.fullWidth &&
    css`
      min-width: 100%;
    `}

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
  padding-left: 0;
`;

export const HelperText = styled.Text<InputProps>`
  color: #ccc;
  font-size: 12px;
  position: absolute;
  bottom: -16px;

  ${props =>
    props.error &&
    css`
      color: red;
    `}
`;

export const TextLabel = styled(Animated.Text)<InputProps>`
  position: absolute;
  font-family: 'sans-serif-light';

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      color: ${theme.primary};
    `}
`;
