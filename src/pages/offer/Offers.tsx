import React from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import Typography from '../../components/bases/typography/Text';
import PaymentTab from '../checkout/steps/payment/PaymentTab';

const Offers: React.FC = () => {
  return (
    <>
      <AppBar title="Ofertas" />
      <PaymentTab online={true} offline={true} />
      <Container>
        <Typography>Ofertas</Typography>
      </Container>
    </>
  );
};

export default Offers;
