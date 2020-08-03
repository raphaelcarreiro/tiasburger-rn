import React from 'react';
import { Appbar } from 'react-native-paper';
import { Alert } from 'react-native';

const HomeActions: React.FC = () => {
  return (
    <Appbar.Header>
      <Appbar.Action icon="check" onPress={() => Alert.alert('Test', 'test')} />
      <Appbar.Action icon="check" onPress={() => Alert.alert('Test', 'test')} />
    </Appbar.Header>
  );
};

export default HomeActions;
