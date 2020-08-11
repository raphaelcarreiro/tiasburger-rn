import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import Text from '../../components/bases/typography/Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const InsideLoading: React.FC = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text variant="caption" size={12}>
        Carregando...
      </Text>
    </View>
  );
};

export default InsideLoading;
