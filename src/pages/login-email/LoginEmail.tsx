import React, { useState } from 'react';
import { Container, Content } from './styles';
import { Image, StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector } from '../../store/selector';
import Title from '../../components/bases/typography/Text';
import Button from '../../components/bases/button/Button';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';
import api from '../../services/api';
import Loading from '../../components/loading/Loading';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/modules/user/actions';
import * as yup from 'yup';
import { useMessage } from '../../hooks/message';
import { useAuth } from '../../hooks/auth';

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

interface Validation {
  email?: string;
  password?: string;
  [key: string]: any;
}

const LoginEmail: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({} as Validation);
  const dispatch = useDispatch();
  const message = useMessage();
  const auth = useAuth();

  function handleValidation() {
    switch (step) {
      case 'email': {
        const schema = yup.object().shape({
          email: yup.string().email('Informe um e-mail válido').required('Informe o e-mail'),
        });

        schema
          .validate({ email })
          .then(() => {
            handleNextClick();
            setValidation({});
          })
          .catch(err => {
            setValidation({
              [err.path]: err.message,
            });
          });

        break;
      }

      case 'password': {
        const schema = yup.object().shape({
          password: yup.string().required('Informe sua senha secreta'),
        });

        schema
          .validate({ password })
          .then(() => {
            handleLogin();
            setValidation({});
          })
          .catch(err => {
            setValidation({
              [err.path]: err.message,
            });
          });

        break;
      }
    }
  }

  function handleNextClick() {
    setLoading(true);

    auth
      .checkEmail(email)
      .then(response => {
        setName(response.name);
        setStep('password');
      })
      .catch(err => {
        message.handleOpen(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleLogin() {
    setLoading(true);
    auth
      .login(email, password)
      .catch(err => {
        message.handleOpen(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleBackClick() {
    setStep('email');
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }} enabled>
      {loading && <Loading />}
      <Container>
        <Content>
          <Image source={{ uri: restaurant?.image.imageUrl }} style={styles.image} />
          <Title size={24}>Login</Title>
          {step === 'email' ? (
            <EmailStep
              email={email}
              setEmail={setEmail}
              validation={validation.email}
              handleValidation={handleValidation}
            />
          ) : (
            <PasswordStep
              password={password}
              setPassword={setPassword}
              name={name}
              validation={validation.password}
              handleValidation={handleValidation}
            />
          )}
        </Content>
        <View style={styles.actions}>
          {step === 'email' ? (
            <Button color="primary" onPress={handleValidation}>
              Próximo
            </Button>
          ) : (
            <>
              <Button color="primary" onPress={handleBackClick} variant="text">
                Voltar
              </Button>
              <Button color="primary" onPress={handleValidation}>
                Entrar
              </Button>
            </>
          )}
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default LoginEmail;
