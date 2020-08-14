import React, { useState } from 'react';
import { Container, Content } from './styles';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from '../../store/selector';
import Title from '../../components/bases/typography/Text';
import Button from '../../components/bases/button/Button';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';
import Loading from '../../components/loading/Loading';
import * as yup from 'yup';
import { useMessage } from '../../hooks/message';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useApp } from '../../App';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
  actions: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
});

interface Validation {
  email?: string;
  password?: string;
}

const LoginEmail: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({} as Validation);
  const message = useMessage();
  const auth = useAuth();
  const navigation = useNavigation();
  const app = useApp();

  function handleValidation() {
    setValidation({});
    switch (step) {
      case 'email': {
        const schema = yup.object().shape({
          email: yup.string().required('Informe o e-mail ou telefone'),
        });

        schema
          .validate({ email })
          .then(() => {
            handleNextClick();
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
      .then(() => {
        if (app.redirect) navigation.navigate(app.redirect);
        else navigation.navigate('Home');
      })
      .catch(err => {
        setLoading(false);
        message.handleOpen(err.message);
      });
  }

  return (
    <>
      <Container>
        {loading && <Loading />}
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
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
            <Button color="primary" onPress={handleValidation}>
              {step === 'email' ? 'Próximo' : 'Entrar'}
            </Button>
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

export default LoginEmail;
