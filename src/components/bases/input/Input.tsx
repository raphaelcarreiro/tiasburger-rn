import React, { useState, useCallback } from 'react';
import { Input as StyledInput, Container } from './styles';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  fullWidth: boolean;
}

const TextInput: React.FC<InputProps> = ({ fullWidth, value, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, []);

  return (
    <Container fullWidth={fullWidth} isFocused={isFocused}>
      <StyledInput {...rest} onFocus={handleInputFocus} onBlur={handleInputBlur} />
    </Container>
  );
};

export default TextInput;
