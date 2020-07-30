import React from 'react';
import Title from '../../components/bases/typography/Text';
import TextInput from '../../components/bases/input/Input';

interface EmailStepProps {
  email: string;
  setEmail(value: string): void;
  validation?: string;
}

const EmailStep: React.FC<EmailStepProps> = ({ email, setEmail, validation }) => {
  return (
    <>
      <Title size={16}>Informe seu e-mail ou telefone</Title>
      <TextInput
        error={!!validation}
        required
        placeholder="E-mail ou telefone"
        fullWidth
        value={email}
        onChange={text => setEmail(text.nativeEvent.text)}
        autoCompleteType="password"
        autoFocus
        keyboardType="email-address"
        returnKeyType="send"
        helperText={validation}
      />
    </>
  );
};

export default EmailStep;
