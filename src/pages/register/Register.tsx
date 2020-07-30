import React, { useState, useReducer } from 'react';
import { Container } from './styles';
import { useSelector } from '../../store/selector';
import { Image, StyleSheet, ScrollView, View } from 'react-native';
import Text from '../../components/bases/typography/Text';
import Button from '../../components/bases/button/Button';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/modules/user/actions';
import api from '../../services/api';
import Loading from '../../components/loading/Loading';
import userReducer, { INITIAL_STATE as userInitialState } from '../../context-api/user/reducer';
import { userChange } from '../../context-api/user/actions';
import RegisterForm from './RegisterForm';
import { useMessage } from '../../hooks/message';
import { useNavigation } from '@react-navigation/native';
import RegisterSucess from './success/RegisterSuccess';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  actions: {
    marginTop: 40,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});

export interface UserValidation {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  [key: string]: any;
}

const Register: React.FC = () => {
  const [validation, setValidation] = useState({} as UserValidation);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [user, contextDispatch] = useReducer(userReducer, userInitialState);
  const restaurant = useSelector(state => state.restaurant);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { handleOpen } = useMessage();

  function handleChange(index: string, value: string): void {
    contextDispatch(userChange(index, value));
  }

  function handleSubmit() {
    setValidation({});

    const schema = yup.object().shape({
      passwordConfirm: yup
        .string()
        .min(4, 'A senha deve ter no mínimo 4 caracteres')
        .oneOf([yup.ref('password'), undefined], 'As senhas devem ser iguais')
        .required('A confirmação da senha é obrigatória'),
      password: yup.string().min(4, 'A senha deve ter no mínimo 4 caracteres').required('Senha é obrigatória'),
      email: yup
        .string()
        .transform(value => {
          return value.replace(' ', '');
        })
        .email('Você deve informar um email válido')
        .required('O e-mail é obrigatório'),
      phone: yup
        .string()
        .transform(value => {
          return value ? value.replace(/\D/g, '') : '';
        })
        .min(10, 'Telefone inválido')
        .required('O telefone é obrigatório'),
      name: yup.string().required('O nome é obrigatório'),
    });

    schema
      .validate(user)
      .then(() => {
        setLoading(true);

        console.log(user);

        api
          .post('/users', user)
          .then(response => {
            setLoading(false);
            // localStorage.setItem(process.env.TOKEN_NAME, response.data.token);
            dispatch(setUser(response.data.user));
            setCreated(true);
          })
          .catch(err => {
            setLoading(false);
            if (err.response) {
              handleOpen(err.response.data.error);
              if (err.response.data.code === 'duplicated-phone') navigation.navigate('Login');
              // router.push(`/login/email?phone=${user.phone.replace(/\D/g, '')}`);
              if (err.response.data.code === 'duplicated-email') navigation.navigate('Login');
              // router.push(`/login/email?email=${user.email}`);
            }
          });
      })
      .catch(err => {
        setValidation({
          [err.path]: err.message,
        });
      });
  }

  return (
    <ScrollView>
      {loading && <Loading />}
      {restaurant && (
        <Container>
          <Image source={{ uri: restaurant.image.imageUrl }} style={styles.image} />
          <Text size={22} bold gutterBottom>
            Criar conta
          </Text>
          <Text>É rapidinho, complete os 5 campos abaixo</Text>
          {!created ? (
            <RegisterForm user={user} handleChange={handleChange} validation={validation} />
          ) : (
            <RegisterSucess />
          )}
          <View style={styles.actions}>
            <Button variant="text" onPress={() => navigation.navigate('Login')}>
              Voltar
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Pronto!
            </Button>
          </View>
        </Container>
      )}
    </ScrollView>
  );
};

export default Register;
