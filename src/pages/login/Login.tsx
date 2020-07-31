import React from 'react';
import { Container } from './styles';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
import { useSelector } from '../../store/selector';
import Title from '../../components/bases/typography/Text';
import Button from '../../components/bases/button/Button';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
  },
  sigInActions: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  signUp: {
    marginTop: 20,
  },
  goBack: {
    marginTop: 20,
  },
});

const Login: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
      <Container>
        {restaurant && (
          <>
            <Image source={{ uri: restaurant.image.imageUrl }} style={styles.image} />
            <View style={styles.title}>
              <Title size={24}>Como deseja continuar?</Title>
            </View>
            <View style={styles.sigInActions}>
              <Button color="primary" fullWidth onPress={() => navigation.navigate('Login', { screen: 'LoginEmail' })}>
                Entrar com e-mail ou telefone
              </Button>
            </View>
            <View style={styles.signUp}>
              <Button color="primary" fullWidth onPress={() => navigation.navigate('Login', { screen: 'Register' })}>
                Criar conta
              </Button>
            </View>
            <View style={styles.goBack}>
              <Button variant="text" fullWidth color="primary" onPress={() => navigation.goBack()}>
                Voltar
              </Button>
            </View>
          </>
        )}
      </Container>
    </ScrollView>
  );
};

export default Login;
