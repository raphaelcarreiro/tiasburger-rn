import React, { ReactElement, forwardRef } from 'react';
import { TextInputProps, ViewStyle, StyleProp } from 'react-native';
import Outlined from './outlined/InputOutlined';
import Standard from './standard/InputStandard';

interface InputProps extends TextInputProps {
  fullWidth?: boolean;
  Icon?: ReactElement;
  error?: boolean;
  required?: boolean;
  helperText?: string;
  variant?: 'standard' | 'outlined';
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
}

interface InputRef {
  focus(): void;
}

const TextInput: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ variant = 'outlined', ...rest }, ref) => {
  return <>{variant === 'outlined' ? <Outlined {...rest} ref={ref} /> : <Standard {...rest} ref={ref} />}</>;
};

export default forwardRef(TextInput);
