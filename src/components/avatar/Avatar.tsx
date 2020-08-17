import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    overflow: 'hidden',
    borderWidth: 2,
  },
});

const Avatar: React.FC = ({ children }) => {
  const theme = useTheme();

  return <View style={[styles.container, { borderColor: theme.primary }]}>{children}</View>;
};

export default Avatar;
