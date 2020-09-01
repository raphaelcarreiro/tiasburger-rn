import React, { ReactElement, forwardRef } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import TextInputMask, { TextInputMaskProps } from 'react-native-text-input-mask';
import StandardMaskedInput from './masked/StandardMaskedInput';

interface InputProps extends TextInputMaskProps {
  fullWidth?: boolean;
  Icon?: ReactElement;
  error?: boolean;
  required?: boolean;
  helperText?: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
}

const MaskedInput: React.ForwardRefRenderFunction<TextInputMask, InputProps> = ({ ...rest }, ref) => {
  return (
    <>
      <StandardMaskedInput {...rest} ref={ref} />
    </>
  );
};

export default forwardRef(MaskedInput);
