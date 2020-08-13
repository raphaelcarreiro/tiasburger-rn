import styled, { css } from '../../../styled-components';

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;
