import styled, { css } from '../../../styled-components';

interface InputProps {
  fullWidth?: boolean;
  isFocused: boolean;
}

export const Input = styled.TextInput`
  flex: 1;
  padding: 18.5px 14px;
  font-size: 16px;
`;

export const Container = styled.View<InputProps>`
  min-width: ${props => (props.fullWidth ? '100%' : '100px')};
  border-color: ${({ theme, isFocused }) => (isFocused ? theme.primary : '#0000003b')};
  border-width: 1px;
  border-radius: 4px;
  margin-top: 16px;
  margin-bottom: 8px;
  flex-direction: row;

  ${props =>
    props.isFocused &&
    css`
      border-width: 2px;
    `}
`;
