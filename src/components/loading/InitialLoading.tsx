import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyName: {
    color: '#666',
    position: 'absolute',
    bottom: 30,
    fontSize: 20,
  },
});

const InitialLoading: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#fafafa" barStyle="dark-content" />
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#666" />
        <Text style={styles.companyName}>Delivery</Text>
      </View>
    </>
  );
};

export default InitialLoading;
