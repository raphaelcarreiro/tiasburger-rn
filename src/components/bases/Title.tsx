import React, { ReactNode } from 'react';
import { Text } from './styles';

interface TitleProps {
  bold?: boolean;
  size?: number;
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children, bold = false, size = 14 }) => {
  return (
    <Text bold={bold} size={size}>
      {children}
    </Text>
  );
};

export default Title;
