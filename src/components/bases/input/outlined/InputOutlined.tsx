import React, { useState, useCallback, ReactElement, forwardRef, useEffect } from 'react';
import { Input as StyledInput, Container, IconContainer, HelperText, InputContainer, TextLabel } from './styles';
import { TextInputProps, StyleProp, ViewStyle, TextInput } from 'react-native';

interface InputProps extends TextInputProps {
  fullWidth?: boolean;
  Icon?: ReactElement;
  error?: boolean;
  required?: boolean;
  helperText?: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
}

const InputOutlined: React.ForwardRefRenderFunction<TextInput, InputProps> = (
  {
    fullWidth,
    value,
    placeholder,
    required,
    Icon,
    error,
    helperText,
    label,
    mainContainerStyle,
    containerStyle,
    ...rest
  },
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
  }, [value]);

  return (
    <Container style={mainContainerStyle}>
      {(isFocused || isFilled) && label && <TextLabel isFocused={isFocused}>{label}</TextLabel>}
      <InputContainer
        style={containerStyle}
        fullWidth={fullWidth}
        isFocused={isFocused}
        error={error}
        helperText={!!helperText}
      >
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
