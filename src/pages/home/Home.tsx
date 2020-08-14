import React from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import Text from '../../components/bases/typography/Text';

const Home: React.FC = () => {
  return (
    <Container>
      <AppBar title="Início" />
      <Text>Home</Text>
    </Container>
  );
};

export default Home;
