import React from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import Text from '../../components/bases/typography/Text';
import AppBarAction from '../../components/appbar/AppBarAction';

const Home: React.FC = () => {
  return (
    <Container>
      <AppBar
        title="Início"
        actions={
          <>
            <AppBarAction iconName="check" />
          </>
        }
      />
      <Text>Home</Text>
    </Container>
  );
};

export default Home;
