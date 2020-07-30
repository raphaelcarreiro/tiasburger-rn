import React from 'react';
import { Container } from './styles';
import Text from '../../../components/bases/typography/Text';
import Button from '../../../components/bases/button/Button';

const RegisterSucess: React.FC = () => {
  return (
    <Container>
      <Text size={20}>Pronto! Agora você pode matar sua fome</Text>
      <Button color="primary" variant="text">
        Cardápio
      </Button>
    </Container>
  );
};

export default RegisterSucess;
