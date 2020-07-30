import React from 'react';
import { UserState } from '../../context-api/user/reducer';
import Input from '../../components/bases/input/Input';
import { UserValidation } from './Register';

interface RegisterFormProps {
  user: UserState;
  handleChange(index: string, value: string): void;
  validation: UserValidation;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ user, handleChange, validation }) => {
  return (
    <>
      <Input
        error={!!validation.name}
        helperText={validation.name}
        autoCapitalize="words"
        fullWidth
        placeholder="Digite seu nome"
        label="Nome"
        variant="standard"
        autoFocus
        value={user.name}
        onChange={event => handleChange('name', event.nativeEvent.text)}
      />
      <Input
        error={!!validation.phone}
        helperText={validation.phone}
        fullWidth
        placeholder="Digite seu telefone"
        variant="standard"
        label="Telefone"
        value={user.phone}
        onChange={event => handleChange('phone', event.nativeEvent.text)}
      />
      <Input
        error={!!validation.email}
        helperText={validation.email}
        fullWidth
        placeholder="Digite seu e-mail"
        variant="standard"
        label="E-mail"
        value={user.email}
        onChange={event => handleChange('email', event.nativeEvent.text)}
      />
      <Input
        error={!!validation.password}
        helperText={validation.password}
        fullWidth
        placeholder="Digite sua senha"
        variant="standard"
        label="Senha"
        value={user.password}
        onChange={event => handleChange('password', event.nativeEvent.text)}
      />
      <Input
        error={!!validation.passwordConfirm}
        helperText={validation.passwordConfirm}
        fullWidth
        placeholder="Digite sua senha novamente"
        variant="standard"
        label="Confirmação da senha"
        value={user.passwordConfirm}
        onChange={event => handleChange('passwordConfirm', event.nativeEvent.text)}
      />
    </>
  );
};

export default RegisterForm;
