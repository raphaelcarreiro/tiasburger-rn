import React, { useState } from 'react';
import { Container, Content } from './styles';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from '../../store/selector';
import Title from '../../components/bases/title/Title';
import Button from '../../components/bases/button/Button';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';
import api from '../../services/api';
import Loading from '../../components/loading/Loading';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/modules/user/actions';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

const LoginEmail: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleNextClick() {
    setLoading(true);

    api
      .get(`/user/show/${email}`)
      .then(response => {
        setName(response.data.name);
        setStep('password');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            console.log('email não encontrado');
          }
        } else console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleLogin() {
    setLoading(true);
    api
      .post('/login', { email, password })
      .then(response => {
        dispatch(setUser(response.data.user));
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            console.log('Usuário ou senha inválidos');
          }
        } else console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleBackClick() {
    setStep('email');
  }

  return (
    <>
      {loading && <Loading />}
      <Container>
        <Content>
          <Image source={{ uri: restaurant?.image.imageUrl }} style={styles.image} />
          <Title size={24}>Login</Title>
          {step === 'email' ? (
            <EmailStep email={email} setEmail={setEmail} />
          ) : (
            <PasswordStep password={password} setPassword={setPassword} name={name} />
          )}
        </Content>
        <View style={styles.actions}>
          {step === 'email' ? (
            <Button color="primary" onPress={handleNextClick}>
              Próximo
            </Button>
          ) : (
            <>
              <Button color="primary" onPress={handleBackClick} variant="text">
                Voltar
              </Button>
              <Button color="primary" onPress={handleLogin}>
                Entrar
              </Button>
            </>
          )}
        </View>
      </Container>
    </>
  );
};

export default LoginEmail;
