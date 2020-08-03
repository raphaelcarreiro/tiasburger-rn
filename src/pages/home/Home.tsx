import React from 'react';
import { Container } from './styles';
import { Text } from 'react-native';
import AppBar from '../../components/appbar/Appbar';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <AppBar title="Início" />
      <Text>Home</Text>
    </Container>
  );
};

export default Home;
