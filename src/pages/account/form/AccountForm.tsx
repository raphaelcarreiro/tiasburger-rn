import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import { userChange } from '../../../context-api/user-customer/actions';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageContainer, ImageWrapper } from './styles';
import { useAccount } from '../Account';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';

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
  icon: {
    height: 26,
    width: 26,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
});

const AccountForm: React.FC = () => {
  const { userCustomer, dispatch } = useAccount();
  const theme = useTheme();

  function handleImageSelect(): void {
    if (userCustomer.image) dispatch(userChange('isImageSelected', !userCustomer.isImageSelected));
  }

  function handleChange(index: string, value: any) {
    dispatch(userChange(index, value));
  }

  return (
    <ScrollView style={styles.container}>
      {userCustomer && (
        <>
          <ImageContainer onPress={handleImageSelect}>
            {userCustomer.isImageSelected && (
              <ImageWrapper>
                <MCIcons name="check-circle" style={styles.icon} color={theme.primary} size={26} />
              </ImageWrapper>
            )}
            {userCustomer.image ? (
              <Image style={styles.image} source={{ uri: userCustomer.image.imageUrl }} />
            ) : (
              <Icon name="add-a-photo" size={30} color={theme.primary} />
            )}
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
            onChange={text => handleChange('name', text.nativeEvent.text)}
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
            onChange={text => handleChange('phone', text.nativeEvent.text)}
          />
          <TextInput
            style={styles.input}
            label="CPF"
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            autoCorrect={false}
            mode="flat"
            value={userCustomer.cpf ? userCustomer.cpf : ''}
            theme={{ colors: { text: '#222' } }}
            onChange={text => handleChange('cpf', text.nativeEvent.text)}
          />
        </>
      )}
    </ScrollView>
  );
};

export default AccountForm;
