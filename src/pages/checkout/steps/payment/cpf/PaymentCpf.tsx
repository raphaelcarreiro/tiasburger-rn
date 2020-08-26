import React, { useState, useRef } from 'react';
import Modal from '../../../../../components/modal/Modal';
import Typography from '../../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { cpfValidation } from '../../../../../helpers/cpfValidation';
import { TextInput } from 'react-native';
import { customerChange } from '../../../../../store/modules/user/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../../store/selector';
import api from '../../../../../services/api';
import Input from '../../../../../components/bases/input/Input';
import PaymentCpfActions from './PaymentCpfActions';
import { useCheckout } from '../../../checkoutContext';

type PaymentCpfProps = {
  handleClose(): void;
  open: boolean;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Validation = {
  cpf?: string;
};

const PaymentCpf: React.FC<PaymentCpfProps> = ({ open, handleClose }) => {
  const [validation, setValidation] = useState<Validation>({} as Validation);
  const [cpf, setCpf] = useState('');
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const checkout = useCheckout();

  const cpfInput = useRef<TextInput>(null);

  function handleValidation() {
    if (saving) return;

    setValidation({});

    const schema = yup.object().shape({
      cpf: yup
        .string()
        .transform((value, originalValue) => {
          return originalValue ? originalValue.replace(/\D/g, '') : '';
        })
        .test('cpfValidation', 'CPF inválido', value => {
          return cpfValidation(value);
        })
        .required('CPF é obrigatório'),
    });

    const form = {
      cpf,
    };

    schema
      .validate(form)
      .then(() => {
        handleSubmit();
      })
      .catch(err => {
        setValidation({
          [err.path]: err.message,
        });
        cpfInput.current?.focus();
      });
  }

  function handleSubmit() {
    const form = {
      cpf,
    };

    setSaving(true);
    api
      .put(`customers/${user?.customer.id}`, form)
      .then(response => {
        setSaving(false);
        dispatch(customerChange('cpf', response.data.cpf));
        handleClose();
        checkout.handleStepNext();
      })
      .catch(err => {
        setSaving(false);
        if (err.response) console.log('checkout - customer cpf update', err.response.data.error);
      });
  }

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="CPF"
      actions={<PaymentCpfActions handleValidation={handleValidation} saving={saving} />}
    >
      <View style={styles.container}>
        <Typography size={18}>Precisamos saber seu CPF.</Typography>
        <Input
          error={!!validation.cpf}
          helperText={validation.cpf}
          label="CPF"
          fullWidth
          placeholder="Digite seu CPF"
          variant="standard"
          value={cpf}
          onChange={event => setCpf(event.nativeEvent.text)}
          keyboardType="numeric"
          style={{ fontSize: 30 }}
          containerStyle={{ height: 80 }}
          autoFocus
          onSubmitEditing={handleValidation}
          blurOnSubmit={false}
        />
      </View>
    </Modal>
  );
};

export default PaymentCpf;
