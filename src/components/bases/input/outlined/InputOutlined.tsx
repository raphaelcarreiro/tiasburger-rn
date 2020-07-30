import React, { useState, useCallback, ReactElement } from 'react';
import { Input as StyledInput, Container, IconContainer, HelperText, InputContainer } from './styles';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  fullWidth?: boolean;
  Icon?: ReactElement;
  error?: boolean;
  required?: boolean;
  helperText?: string;
}

const InputOutlined: React.FC<InputProps> = ({
  fullWidth,
  value,
  placeholder,
  required,
  Icon,
  error,
  helperText,
  ...rest
}) => {
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
    <Container>
      <InputContainer fullWidth={fullWidth} isFocused={isFocused} error={error} helperText={!!helperText}>
        <StyledInput
          value={value}
          placeholder={required ? `${placeholder} *` : placeholder}
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {Icon && <IconContainer>{Icon}</IconContainer>}
      </InputContainer>
      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </Container>
  );
};

export default InputOutlined;
