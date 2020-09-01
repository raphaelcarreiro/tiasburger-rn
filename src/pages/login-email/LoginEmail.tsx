import React, { useState, useEffect, useCallback } from 'react';
import { Container, Content } from './styles';
import { Image, StyleSheet, View, Keyboard, ScrollView } from 'react-native';
import { useSelector } from '../../store/selector';
import Title from '../../components/bases/typography/Text';
import Button from '../../components/bases/button/Button';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';
import Loading from '../../components/loading/Loading';
import * as yup from 'yup';
import { useMessage } from '../../hooks/message';
import { useAuth } from '../../hooks/auth';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { useApp } from '../../appContext';
import { RootDrawerParamList } from '../../routes/Routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignRouteList } from '../../routes/AuthRoutes';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginBottom: 30,
  },
  actions: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
  },
  scrollViewContent: {
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 15,
    paddingLeft: 15,
  },
});

interface Validation {
  email?: string;
  password?: string;
}

type LoginEmailScreenRoute = RouteProp<SignRouteList, 'LoginEmail'>;

type LoginEmailScreenProps = CompositeNavigationProp<
  StackNavigationProp<SignRouteList, 'ForgotPassword'>,
  DrawerNavigationProp<RootDrawerParamList>
>;

type LoginEmailProps = {
  navigation: LoginEmailScreenProps;
  route: LoginEmailScreenRoute;
};

const LoginEmail: React.FC<LoginEmailProps> = ({ navigation, route }) => {
  const restaurant = useSelector(state => state.restaurant);
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({} as Validation);
  const [keyboard, setKeyboard] = useState(false);
  const message = useMessage();
  const auth = useAuth();
  const app = useApp();

  const handleNextClick = useCallback(() => {
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
  }, [auth, email, message]);

  useEffect(() => {
    if (!route.params) return;
    if (!route.params.email) return;

    setEmail(route.params.email);
    // handleNextClick();
  }, [route]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

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
        <ScrollView
          contentContainerStyle={!keyboard ? [styles.scrollViewContent, { flex: 1 }] : styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
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
            {step === 'password' && (
              <Button
                color="primary"
                variant="text"
                onPress={() => navigation.navigate('Login', { screen: 'ForgotPassword', params: { email } })}
              >
                Esqueci minha senha
              </Button>
            )}
            <Button color="primary" onPress={handleValidation} disabled={loading}>
              {step === 'email' ? 'Próximo' : 'Entrar'}
            </Button>
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

export default LoginEmail;
