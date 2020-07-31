import React, { useState, useRef } from 'react';
import { UserState } from '../../context-api/user/reducer';
import Input from '../../components/bases/input/Input';
import { UserValidation } from './Register';
import Text from '../../components/bases/typography/Text';
import { Image, StyleSheet, TextInput } from 'react-native';
import { useSelector } from '../../store/selector';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
});

interface RegisterFormProps {
  user: UserState;
  handleChange(index: string, value: string): void;
  validation: UserValidation;
  handleSubmit(): void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ user, handleChange, validation, handleSubmit }) => {
  const restaurant = useSelector(state => state.restaurant);
  const [passVis, setPassVis] = useState(false);
  const [confirmPassVis, setConfirmPassVis] = useState(false);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  function handleVisibility(field: string): void {
    if (field === 'password') setPassVis(!passVis);
    if (field === 'confirmPassword') setConfirmPassVis(!confirmPassVis);
  }

  return (
    <>
      {restaurant && <Image source={{ uri: restaurant.image.imageUrl }} style={styles.image} />}
      <Text size={22} bold gutterBottom>
        Criar conta
      </Text>
      <Text>É rapidinho, complete os 5 campos abaixo.</Text>
      <Input
        error={!!validation.name}
        helperText={validation.name}
        autoCapitalize="words"
        fullWidth
        placeholder="Digite seu nome"
        label="Nome"
        variant="standard"
        value={user.name}
        onChange={event => handleChange('name', event.nativeEvent.text)}
        autoCompleteType="name"
        returnKeyType="next"
        onSubmitEditing={() => phoneRef.current?.focus()}
        autoFocus
      />
      <Input
        ref={phoneRef}
        keyboardType="number-pad"
        error={!!validation.phone}
        helperText={validation.phone}
        fullWidth
        placeholder="Digite seu telefone"
        variant="standard"
        label="Telefone"
        value={user.phone}
        onChange={event => handleChange('phone', event.nativeEvent.text)}
        autoCompleteType="tel"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <Input
        ref={emailRef}
        error={!!validation.email}
        helperText={validation.email}
        fullWidth
        placeholder="Digite seu e-mail"
        variant="standard"
        label="E-mail"
        value={user.email}
        onChange={event => handleChange('email', event.nativeEvent.text)}
        keyboardType="email-address"
        autoCompleteType="email"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <Input
        ref={passwordRef}
        error={!!validation.password}
        helperText={validation.password}
        fullWidth
        placeholder="Digite sua senha"
        variant="standard"
        label="Senha"
        value={user.password}
        onChange={event => handleChange('password', event.nativeEvent.text)}
        secureTextEntry={!passVis}
        textContentType="newPassword"
        Icon={
          !passVis ? (
            <Icon name="visibility" size={26} onPress={() => handleVisibility('password')} color="#666" />
          ) : (
            <Icon name="visibility-off" size={26} onPress={() => handleVisibility('password')} color="#666" />
          )
        }
        returnKeyType="next"
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
      />
      <Input
        ref={confirmPasswordRef}
        error={!!validation.passwordConfirm}
        helperText={validation.passwordConfirm}
        fullWidth
        placeholder="Digite sua senha novamente"
        variant="standard"
        label="Confirmação da senha"
        value={user.passwordConfirm}
        onChange={event => handleChange('passwordConfirm', event.nativeEvent.text)}
        secureTextEntry={!confirmPassVis}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        textContentType="newPassword"
        Icon={
          !confirmPassVis ? (
            <Icon name="visibility" size={26} onPress={() => handleVisibility('confirmPassword')} color="#666" />
          ) : (
            <Icon name="visibility-off" size={26} onPress={() => handleVisibility('confirmPassword')} color="#666" />
          )
        }
      />
    </>
  );
};

export default RegisterForm;
