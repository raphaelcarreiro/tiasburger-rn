import React, { useRef, useEffect } from 'react';
import Input from '../../../components/bases/input/Input';
import { StyleSheet, Image, TextInput } from 'react-native';
import { userChange } from '../../../context-api/user-customer/actions';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageContainer, ImageWrapper } from './styles';
import { useAccount, AccountValidation } from '../context/account';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  scrollViewContent: {
    paddingBottom: 30,
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
  const { userCustomer, dispatch, validation, handleValidation, setValidation } = useAccount();
  const theme = useTheme();

  const inputs = {
    name: useRef<TextInput>(null),
    phone: useRef<TextInput>(null),
    cpf: useRef<TextInput>(null),
  };

  useEffect(() => {
    const [key] = Object.keys(validation) as [keyof typeof inputs];

    if (!key) return;

    inputs[key].current?.focus();
  }, [validation, inputs]);

  function handleImageSelect(): void {
    if (userCustomer.image) dispatch(userChange('isImageSelected', !userCustomer.isImageSelected));
  }

  function handleChange(index: string, value: any) {
    dispatch(userChange(index, value));
    setValidation({} as AccountValidation);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
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
          <Input
            label="E-mail"
            placeholder="Digite seu email"
            keyboardType="email-address"
            variant="standard"
            editable={false}
            value={userCustomer.email}
          />
          <Input
            ref={inputs.name}
            error={!!validation.name}
            helperText={validation.name}
            label="Nome"
            placeholder="Digite seu nome completo"
            autoCapitalize="words"
            autoCorrect
            autoCompleteType="name"
            variant="standard"
            value={userCustomer.name}
            onChange={text => handleChange('name', text.nativeEvent.text)}
            returnKeyType="next"
            onSubmitEditing={() => inputs.phone.current?.focus()}
            blurOnSubmit={false}
          />
          <Input
            ref={inputs.phone}
            error={!!validation.phone}
            helperText={validation.phone}
            label="Telefone"
            placeholder="Digite seu telefone"
            keyboardType="phone-pad"
            autoCompleteType="tel"
            autoCorrect={false}
            variant="standard"
            value={userCustomer.phone}
            onChange={text => handleChange('phone', text.nativeEvent.text)}
            returnKeyType="next"
            onSubmitEditing={() => inputs.cpf.current?.focus()}
            blurOnSubmit={false}
          />
          <Input
            ref={inputs.cpf}
            error={!!validation.cpf}
            helperText={validation.cpf}
            label="CPF"
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            autoCorrect={false}
            variant="standard"
            value={userCustomer.cpf ? userCustomer.cpf : ''}
            onChange={text => handleChange('cpf', text.nativeEvent.text)}
            returnKeyType="send"
            onSubmitEditing={handleValidation}
          />
        </>
      )}
    </ScrollView>
  );
};

export default AccountForm;
