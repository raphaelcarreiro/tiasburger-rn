import React, { useReducer, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import userReducer, { INITIAL_STATE as userCustomerInitialState } from '../../../context-api/user-customer/reducer';
import { setUser as setUserCustomer } from '../../../context-api/user-customer/actions';
import { useSelector } from '../../../store/selector';
import { ImageContainer } from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  input: {
    backgroundColor: 'transparent',
    marginBottom: 15,
    color: '#333',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const AccountForm: React.FC = () => {
  const [userCustomer, contextDispatch] = useReducer(userReducer, userCustomerInitialState);
  const user = useSelector(state => state.user);

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

  return (
    <ScrollView style={styles.container}>
      {user && (
        <>
          <ImageContainer>
            {user.image && <Image style={styles.image} source={{ uri: user.image.imageUrl }} />}
          </ImageContainer>
          <TextInput
            style={styles.input}
            label="E-mail"
            placeholder="Digite seu email"
            keyboardType="email-address"
            mode="flat"
            disabled
            value={userCustomer.email}
            theme={{ colors: { text: '#222' } }}
          />
          <TextInput
            style={styles.input}
            label="Nome"
            placeholder="Digite seu nome completo"
            autoCapitalize="words"
            autoCorrect
            autoCompleteType="name"
            mode="flat"
            value={userCustomer.name}
            theme={{ colors: { text: '#222' } }}
          />
          <TextInput
            style={styles.input}
            label="Telefone"
            placeholder="Digite seu telefone"
            keyboardType="phone-pad"
            autoCompleteType="tel"
            autoCorrect={false}
            mode="flat"
            value={userCustomer.phone}
            theme={{ colors: { text: '#222' } }}
          />
          <TextInput
            style={styles.input}
            label="CPF"
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            autoCorrect={false}
            mode="flat"
            value={userCustomer.cpf}
            theme={{ colors: { text: '#222' } }}
          />
        </>
      )}
    </ScrollView>
  );
};

export default AccountForm;
