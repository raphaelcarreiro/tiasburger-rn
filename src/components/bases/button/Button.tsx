import React from 'react';
import { Button as StyledButton, ButtonText } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  color?: 'primary' | 'secondary' | 'error';
  fullWidth?: boolean;
  variant?: 'text' | 'contained';
  disabled?: boolean;
  disablePadding?: boolean;
  fontSize?: number;
  disableUpperCase?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  fullWidth = false,
  variant = 'contained',
  disabled = false,
  disablePadding = false,
  fontSize,
  disableUpperCase,
  ...rest
}) => {
  return (
    <StyledButton
      {...rest}
      disablePadding={disablePadding}
      color={color}
      fullWidth={fullWidth}
      variant={variant}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <ButtonText fontSize={fontSize} disableUpperCase={disableUpperCase} color={color} variant={variant}>
        {children}
      </ButtonText>
    </StyledButton>
  );
};

export default Button;
