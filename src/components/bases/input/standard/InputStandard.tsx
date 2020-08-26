import React, { useState, useCallback, ReactElement, useEffect, forwardRef, useRef } from 'react';
import { Input as StyledInput, Container, IconContainer, HelperText, InputContainer, TextLabel } from './styles';
import { TextInputProps, StyleProp, ViewStyle, Animated } from 'react-native';

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

interface InputRef {
  focus(): void;
}

const InputStandard: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    fullWidth,
    value,
    placeholder,
    required,
    Icon,
    error,
    helperText,
    label,
    containerStyle,
    mainContainerStyle,
    ...rest
  },
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [placeholderFocused, setPlaceholderFocused] = useState<string | undefined>('');
  const animatedValue = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if ((isFocused || isFilled) && label)
      Animated.timing(animatedValue, {
        duration: 1000,
        toValue: 10,
        useNativeDriver: false,
      }).start();
  }, [isFocused, isFilled, label, animatedValue]);

  useEffect(() => {
    let text: string | undefined;
    text = label || placeholder;
    text = required ? `${text} *` : text;
    setPlaceholderFocused(text);
  }, [label, placeholder, required]);

  useEffect(() => {
    setIsFilled(!!value);
  }, [value]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container style={mainContainerStyle}>
      {(isFocused || isFilled) && label && (
        <TextLabel style={{ top: animatedValue, backfaceVisibility: 'hidden' }} isFocused={isFocused}>
          {label}
        </TextLabel>
      )}
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
          placeholder={isFocused ? placeholder : placeholderFocused}
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

export default forwardRef(InputStandard);
