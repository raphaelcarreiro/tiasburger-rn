import React from 'react';
import { Button as StyledButton, ButtonText } from './styles';
import { RectButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
  children: string;
  color?: 'primary' | 'secondary';
  fullWidth?: boolean;
  variant?: 'text' | 'contained';
}

const Button: React.FC<ButtonProps> = ({ children, color, fullWidth = false, variant = 'contained', ...rest }) => {
  return (
    <StyledButton {...rest} color={color} fullWidth={fullWidth} variant={variant}>
      <ButtonText color={color} variant={variant}>
        {children}
      </ButtonText>
    </StyledButton>
  );
};

export default Button;
