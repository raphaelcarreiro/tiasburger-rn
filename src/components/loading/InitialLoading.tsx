import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyName: {
    color: '#ccc',
    position: 'absolute',
    bottom: 30,
    fontSize: 20,
  },
});

const InitialLoading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="red" />
      <Text style={styles.companyName}>Delivery</Text>
    </View>
  );
};

export default InitialLoading;
