import React from 'react';
import { Container } from './styles';
import { Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const Offers: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        <Appbar.Content title="Ofertas" />
      </Appbar.Header>
      <Text>Offers</Text>
    </Container>
  );
};

export default Offers;
