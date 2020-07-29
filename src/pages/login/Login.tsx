import React from 'react';
import { Container } from './styles';
import { Image, StyleSheet, Text } from 'react-native';
import { useSelector } from '../../store/selector';
import Title from '../../components/bases/Title';
import Button from '../../components/bases/button/Button';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
});

const Login: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);
  return (
    <Container>
      {restaurant && (
        <>
          <Image source={{ uri: restaurant.image.imageUrl }} style={styles.image} />
          <Title size={24}>
            <Text>Como deseja continuar?</Text>
          </Title>
          <Button color="primary">
            <Text>Entrar com e-mail ou telefone</Text>
          </Button>
        </>
      )}
    </Container>
  );
};

export default Login;
