import React from 'react';
import { Text } from './styles';

interface TitleProps {
  bold?: boolean;
  size?: number;
  children: string | string[];
}

const Title: React.FC<TitleProps> = ({ children, bold = false, size = 14 }) => {
  return (
    <Text bold={bold} size={size}>
      {children}
    </Text>
  );
};

export default Title;
