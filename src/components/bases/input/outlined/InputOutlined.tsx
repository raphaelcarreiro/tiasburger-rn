import React, { useState, useCallback, ReactElement, forwardRef, useEffect } from 'react';
import { Input as StyledInput, Container, IconContainer, HelperText, InputContainer, TextLabel } from './styles';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  fullWidth?: boolean;
  Icon?: ReactElement;
  error?: boolean;
  required?: boolean;
  helperText?: string;
  label?: string;
}

interface InputRef {
  focus(): void;
}

const InputOutlined: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { fullWidth, value, placeholder, required, Icon, error, helperText, label, ...rest },
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled(!!value);
  }, [value]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, []);

  return (
    <Container>
      {(isFocused || isFilled) && label && (
        <TextLabel isFocused={isFocused} isFilled={isFilled}>
          {label}
        </TextLabel>
      )}
      <InputContainer fullWidth={fullWidth} isFocused={isFocused} error={error} helperText={!!helperText}>
        <StyledInput
          ref={ref}
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

export default forwardRef(InputOutlined);
