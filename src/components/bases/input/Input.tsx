import React, { ReactElement, forwardRef } from 'react';
import { TextInputProps, ViewStyle, StyleProp, TextInput as NativeTextInput } from 'react-native';
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

const TextInput: React.ForwardRefRenderFunction<NativeTextInput, InputProps> = (
  { variant = 'outlined', ...rest },
  ref,
) => {
  return (
    <>
      {variant === 'outlined' ? (
        <Outlined {...rest} ref={ref} />
      ) : (
        variant === 'standard' && <Standard {...rest} ref={ref} />
      )}
    </>
  );
};

export default forwardRef(TextInput);
