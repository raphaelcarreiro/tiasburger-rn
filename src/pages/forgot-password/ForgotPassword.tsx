import React, { useState, useRef } from 'react';
import Typography from '../../components/bases/typography/Text';
import { RouteProp } from '@react-navigation/native';
import { SignRouteList } from '../../routes/AuthRoutes';
import { StyleSheet, View, TextInput } from 'react-native';
import Input from '../../components/bases/input/Input';
import Button from '../../components/bases/button/Button';
import * as yup from 'yup';
import api from '../../services/api';
import { useMessage } from '../../hooks/message';

type ForgotPassScreenRouteProp = RouteProp<SignRouteList, 'ForgotPassword'>;

type ForgotPasswordProps = {
  route: ForgotPassScreenRouteProp;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  actions: {
    marginTop: 30,
  },
  button: {
    alignSelf: 'center',
  },
});

type Validation = {
  email: Array<string>;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ route }) => {
  const [email, setEmail] = useState(route.params.email || '');
  const [loading, setLoading] = useState(false);
  const messaging = useMessage();
  const [validation, setValidation] = useState<Validation>({ email: [] });
  const ref = useRef<TextInput>(null);

  function handleValidation() {
    setValidation({ email: [] });

    const schema = yup.object().shape({
      email: yup.string().required('E-mail ou telefone obrigatório'),
    });

    schema
      .validate({ email })
      .then(handleSubmit)
      .catch((err: yup.ValidationError) => {
        setValidation({ email: [err.message] });
        ref.current?.focus();
      });
  }

  function handleSubmit() {
    setLoading(true);

    api
      .post('password/email', { email })
      .then(() => {
        messaging.handleOpen('Enviamos uma mensagem para seu e-mail');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data.errors) {
            const _validation = { ...validation, ...err.response.data.errors };
            setValidation(_validation);
          } else if (err.response.data.error) messaging.handleOpen(err.response.data.error);
        } else messaging.handleOpen('Aconteceu um erro');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Typography gutterBottom size={20} align="center">
        Gerar nova senha
      </Typography>
      <Typography gutterBottom variant="caption" size={14} align="center">
        Um link será enviado para sua conta de e-mail, com instruções para a redefinição da senha.
      </Typography>
      <Input
        ref={ref}
        error={!!validation}
        helperText={validation ? validation.email[0] : ''}
        variant="outlined"
        label="E-mail ou telefone"
        placeholder="Digite seu e-mail ou telefone"
        value={email}
        onChange={e => setEmail(e.nativeEvent.text)}
        editable={!loading}
        autoFocus
        onSubmitEditing={handleValidation}
      />
      <View style={styles.actions}>
        <Button onPress={handleValidation} variant="contained" color="primary" style={styles.button} disabled={loading}>
          Pronto!
        </Button>
      </View>
    </View>
  );
};

export default ForgotPassword;
