import React from 'react';
import { StyledText } from './styles';
import { TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  bold?: boolean;
  size?: number;
  gutterBottom?: boolean;
  variant?: 'caption' | 'default';
  color?: 'primary' | 'secondary' | 'contrast' | 'error';
  align?: 'right' | 'left' | 'center';
  italic?: boolean;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  bold = false,
  size = 16,
  gutterBottom,
  variant = 'default',
  color,
  style,
  align,
  italic,
  ...rest
}) => {
  return (
    <StyledText
      align={align}
      style={style}
      bold={bold}
      italic={italic}
      size={size}
      variant={variant}
      gutterBottom={gutterBottom}
      color={color}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

export default Typography;
