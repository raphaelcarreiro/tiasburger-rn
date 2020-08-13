import React, { useReducer, useEffect, useState } from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import AccountTab from './AccountTab';
import AccountActions from './AccountActions';
import userReducer, { INITIAL_STATE as userCustomerInitialState } from '../../context-api/user-customer/reducer';
import { userChange, setUser as setUserCustomer } from '../../context-api/user-customer/actions';
import { useSelector } from '../../store/selector';
import { AccountContext, AccountValidation } from './context/account';
import api from '../../services/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/modules/user/actions';
import { useMessage } from '../../hooks/message';
import * as yup from 'yup';
import { cpfValidation } from '../../helpers/cpfValidation';
import Loading from '../../components/loading/Loading';
import { useNavigation } from '@react-navigation/native';

const Account: React.FC = () => {
  const [userCustomer, contextDispatch] = useReducer(userReducer, userCustomerInitialState);
  const [validation, setValidation] = useState<AccountValidation>({} as AccountValidation);
  const user = useSelector(state => state.user);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const messaging = useMessage();
  const navigator = useNavigation();

  useEffect(() => {
    if (!user) navigator.navigate('Home');
  }, [user, navigator]);

  useEffect(() => {
    if (!user) return;
    contextDispatch(
      setUserCustomer({
        name: user.name,
        email: user.email,
        phone: user.phone,
        cpf: user.customer.cpf,
        image: user.image,
        isImageSelected: false,
      }),
    );
  }, [contextDispatch, user]);

  function handleValidation() {
    setValidation({});

    const schema = yup.object().shape({
      cpf: yup
        .string()
        .transform((value, originalValue) => {
          return originalValue ? originalValue.replace(/\D/g, '') : '';
        })
        .test('cpfValidation', 'CPF inválido', value => {
          return cpfValidation(value);
        })
        .required('CPF é obrigatório'),
      phone: yup
        .string()
        .transform((value, originalValue) => {
          return originalValue ? originalValue.replace(/\D/g, '') : '';
        })
        .min(10, 'Telefone inválido')
        .required('O telefone é obrigatório'),
      name: yup.string().min(3, 'Nome inválido').required('O nome é obrigatório'),
    });

    schema
      .validate(userCustomer)
      .then(() => {
        handleSubmit();
      })
      .catch((err: yup.ValidationError) => {
        setValidation({
          [err.path]: err.message,
        });
      });
  }

  function handleSubmit() {
    const form = {
      name: userCustomer.name,
      phone: userCustomer.phone,
      cpf: userCustomer.cpf,
      image: userCustomer.image,
      customer: {
        cpf: userCustomer.cpf,
      },
    };

    setSaving(true);
    api
      .put(`users/${user?.id}`, form)
      .then(response => {
        dispatch(setUser(response.data));
        messaging.handleOpen('Salvo');
      })
      .catch(err => {
        if (err.response) messaging.handleOpen(err.response.data.error);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  function appBarGoBack() {
    contextDispatch(userChange('isImageSelected', !userCustomer.isImageSelected));
  }

  return (
    <AccountContext.Provider
      value={{ userCustomer, dispatch: contextDispatch, validation, handleValidation, setValidation: setValidation }}
    >
      <AppBar
        title={userCustomer.isImageSelected ? 'Foto' : 'Minha Conta'}
        backAction={appBarGoBack}
        showBackAction={userCustomer.isImageSelected}
        actions={<AccountActions handleSubmit={handleValidation} />}
      />
      {saving && <Loading />}
      <Container>
        <AccountTab />
      </Container>
    </AccountContext.Provider>
  );
};

export default Account;
