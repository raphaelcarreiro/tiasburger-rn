import React from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import Text from '../../components/bases/typography/Text';
import { useMessage } from '../../hooks/message';
import Button from '../../components/bases/button/Button';

const Home: React.FC = () => {
  const message = useMessage();
  return (
    <Container>
      <AppBar title="Início" />
      <Text>Home</Text>
      <Button variant="contained" color="primary" onPress={() => message.handleOpen('Snackbar')}>
        Snackbar!
      </Button>
    </Container>
  );
};

export default Home;
