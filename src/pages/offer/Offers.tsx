import React from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import Typography from '../../components/bases/typography/Text';

const Offers: React.FC = () => {
  return (
    <Container>
      <AppBar title="Ofertas" />
      <Typography>Ofertas</Typography>
    </Container>
  );
};

export default Offers;
