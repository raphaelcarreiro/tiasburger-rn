import React, { ReactElement } from 'react';
import { Button as StyledButton } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  disabled?: boolean;
  Icon: ReactElement;
}

const IconButton: React.FC<ButtonProps> = ({ disabled = false, Icon, ...rest }) => {
  return (
    <StyledButton {...rest} disabled={disabled}>
      {Icon}
    </StyledButton>
  );
};

export default IconButton;
