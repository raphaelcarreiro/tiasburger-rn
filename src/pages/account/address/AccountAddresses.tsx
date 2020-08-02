import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AccountAddresses: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Account addresses</Text>
    </View>
  );
};

export default AccountAddresses;
