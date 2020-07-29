import React from 'react';
import Title from '../../components/bases/title/Title';
import TextInput from '../../components/bases/input/Input';

interface PasswordStepProps {
  password: string;
  setPassword(value: string): void;
  name: string;
}

const PasswordStep: React.FC<PasswordStepProps> = ({ password, setPassword, name }) => {
  return (
    <>
      <Title size={16}>Olá {name}!</Title>
      <TextInput
        placeholder="Sua senha"
        fullWidth
        value={password}
        onChange={text => setPassword(text.nativeEvent.text)}
        returnKeyType="send"
        secureTextEntry
        autoCorrect={false}
      />
    </>
  );
};

export default PasswordStep;
