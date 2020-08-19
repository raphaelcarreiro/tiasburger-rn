import React from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import Typography from '../../components/bases/typography/Text';

const Home: React.FC = () => {
  return (
    <Container>
      <AppBar title="Início" />
      <Typography>Home</Typography>
    </Container>
  );
};

export default Home;
