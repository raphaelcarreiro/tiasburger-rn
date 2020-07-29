import React from 'react';
import Title from '../../components/bases/title/Title';
import TextInput from '../../components/bases/input/Input';

interface EmailStepProps {
  email: string;
  setEmail(value: string): void;
}

const EmailStep: React.FC<EmailStepProps> = ({ email, setEmail }) => {
  return (
    <>
      <Title size={16}>Informe seu e-mail ou telefone</Title>
      <TextInput
        placeholder="E-mail ou telefone"
        fullWidth
        value={email}
        onChange={text => setEmail(text.nativeEvent.text)}
        autoCompleteType="password"
        autoFocus
        keyboardType="email-address"
        returnKeyType="send"
      />
    </>
  );
};

export default EmailStep;
