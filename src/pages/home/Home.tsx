import React from 'react';
import { Container } from './styles';
import { Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Appbar style={styles.appbar}>
        <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        <Appbar.Content title="Início" />
      </Appbar>
      <Text>Home</Text>
    </Container>
  );
};

export default Home;
