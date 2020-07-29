import React from 'react';
import { Button as StyledButton } from './styles';
import { useTheme } from '../../../hooks/theme';

interface ButtonProps {
  color?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, color }) => {
  const { theme } = useTheme();
  return (
    <StyledButton backgroundColor={color} theme={theme}>
      {children}
    </StyledButton>
  );
};

export default Button;
