import React from 'react';
import { StyledText } from './styles';
import { TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  bold?: boolean;
  size?: number;
  children: string | string[];
  gutterBottom?: boolean;
  variant?: 'caption' | 'default';
  color?: 'primary' | 'secondary';
}

const Typography: React.FC<TypographyProps> = ({
  children,
  bold = false,
  size = 16,
  gutterBottom,
  variant = 'default',
  color,
  style,
}) => {
  return (
    <StyledText style={style} bold={bold} size={size} variant={variant} gutterBottom={gutterBottom} color={color}>
      {children}
    </StyledText>
  );
};

export default Typography;
