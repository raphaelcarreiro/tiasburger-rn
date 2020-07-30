import React from 'react';
import { StyledText } from './styles';

interface TypographyProps {
  bold?: boolean;
  size?: number;
  children: string | string[];
  gutterBottom?: boolean;
}

const Typography: React.FC<TypographyProps> = ({ children, bold = false, size = 14, gutterBottom }) => {
  return (
    <StyledText bold={bold} size={size} gutterBottom>
      {children}
    </StyledText>
  );
};

export default Typography;
