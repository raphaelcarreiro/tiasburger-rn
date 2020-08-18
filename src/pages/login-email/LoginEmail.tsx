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
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useApp } from '../../appContext';
import { RootDrawerParamList } from '../../routes/Routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignRouteList } from '../../routes/SignRoutes';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
  actions: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
  },
  scrollViewContent: {
    justifyContent: 'center',
  },
});

interface Validation {
  email?: string;
  password?: string;
}

type LoginEmailScreenProps = CompositeNavigationProp<
  StackNavigationProp<SignRouteList, 'ForgotPassword'>,
  DrawerNavigationProp<RootDrawerParamList>
>;

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
  const navigation = useNavigation<LoginEmailScreenProps>();
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
            <Button
              color="primary"
              variant="text"
              disableUpperCase
              onPress={() => navigation.navigate('Login', { screen: 'ForgotPassword' })}
            >
              Esqueci minha senha
            </Button>
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
