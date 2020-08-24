import React, { useRef, useEffect } from 'react';
import Title from '../../components/bases/typography/Text';
import Input from '../../components/bases/input/Input';
import { TextInput } from 'react-native';

interface EmailStepProps {
  email: string;
  setEmail(value: string): void;
  validation?: string;
  handleValidation(): void;
}

const EmailStep: React.FC<EmailStepProps> = ({ email, setEmail, validation, handleValidation }) => {
  const ref = useRef<TextInput>(null);

  useEffect(() => {
    if (!!validation && ref.current) ref.current.focus();
  }, [validation, ref]);

  return (
    <>
      <Title size={16}>Informe seu e-mail ou telefone</Title>
      <Input
        ref={ref}
        error={!!validation}
        required
        placeholder="E-mail ou telefone"
        fullWidth
        value={email}
        onChange={text => setEmail(text.nativeEvent.text)}
        autoFocus
        keyboardType="email-address"
        returnKeyType="send"
        helperText={validation}
        autoCompleteType="email"
        onSubmitEditing={handleValidation}
        autoCapitalize="none"
        blurOnSubmit={false}
      />
    </>
  );
};

export default EmailStep;
