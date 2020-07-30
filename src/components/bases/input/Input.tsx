import React, { ReactElement } from 'react';
import { TextInputProps } from 'react-native';
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
}

const TextInput: React.FC<InputProps> = ({ variant = 'outlined', ...rest }) => {
  return <>{variant === 'outlined' ? <Outlined {...rest} /> : <Standard {...rest} />}</>;
};

export default TextInput;
