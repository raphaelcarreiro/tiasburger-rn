import React from 'react';
import { Container } from './styles';
import Text from '../../../components/bases/typography/Text';
import Button from '../../../components/bases/button/Button';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const classes = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});

const RegisterSucess: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text size={20}>Pronto! Agora você pode matar sua fome!</Text>
      <Button color="primary" variant="text" style={classes.button} onPress={() => navigation.navigate('Login')}>
        Cardápio
      </Button>
    </Container>
  );
};

export default RegisterSucess;
