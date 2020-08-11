import React from 'react';
import { StyledText } from './styles';
import { TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  bold?: boolean;
  size?: number;
  gutterBottom?: boolean;
  variant?: 'caption' | 'default';
  color?: 'primary' | 'secondary' | 'contrast';
  align?: 'right' | 'left' | 'center';
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
}) => {
  return (
    <StyledText
      align={align}
      style={style}
      bold={bold}
      size={size}
      variant={variant}
      gutterBottom={gutterBottom}
      color={color}
    >
      {children}
    </StyledText>
  );
};

export default Typography;
