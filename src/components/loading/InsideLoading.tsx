import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { Container } from './styles';
import Text from '../../components/bases/typography/Text';

const InsideLoading: React.FC = () => {
  const theme = useTheme();
  return (
    <Container>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text variant="caption" size={12}>
        Carregando...
      </Text>
    </Container>
  );
};

export default InsideLoading;
