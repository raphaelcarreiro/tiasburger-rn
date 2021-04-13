import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../../../../components/modal/Modal';
import Input from '../../../../../components/bases/input/Input';
import { StyleSheet, TextInput, View, ScrollView } from 'react-native';
import { useSelector } from '../../../../../store/selector';
import { useDispatch } from 'react-redux';
import { useCheckout } from '../../../checkoutContext';
import PaymentCreditCardActions from './PaymentCreditCardActions';
import * as yup from 'yup';
import { cpfValidation } from '../../../../../helpers/cpfValidation';
import { cardBrandValidation } from '../../../../../helpers/cardBrandValidation';
import { setCard } from '../../../../../store/modules/order/actions';
import { CreditCart } from '../../../../../@types/order';
import StandardMaskedInput from '../../../../../components/bases/input/masked/StandardMaskedInput';
import TextInputMask from 'react-native-text-input-mask';

type PaymentCreditCardProps = {
  open: boolean;
  handleClose(): void;
  setIsCardValid(valid: boolean): void;
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 22,
  },
  inputContainer: {
    height: 70,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expirationDateInput: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
  },
  cvvInput: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
  },
  modal: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  scroll: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
});

type Validation = {
  number?: string;
  name?: string;
  cvv?: string;
  expiration_date?: string;
  cpf?: string;
};

const PaymentCreditCard: React.FC<PaymentCreditCardProps> = ({ open, handleClose, setIsCardValid }) => {
  const order = useSelector(state => state.order);
  const [name, setName] = useState(order.creditCard.name);
  const [number, setNumber] = useState(order.creditCard.number);
  const [cvv, setCvv] = useState(order.creditCard.cvv);
  const [expirationDate, setExpirationDate] = useState(order.creditCard.expiration_date);
  const [cpf, setCpf] = useState(order.creditCard.cpf);
  const [validation, setValidation] = useState<Validation>({});
  const dispatch = useDispatch();
  const checkout = useCheckout();

  const inputs = {
    number: useRef<TextInputMask>(null),
    name: useRef<TextInput>(null),
    expiration_date: useRef<TextInputMask>(null),
    cvv: useRef<TextInput>(null),
    cpf: useRef<TextInputMask>(null),
  };

  useEffect(() => {
    const [key] = Object.keys(validation) as Array<keyof typeof validation>;
    if (!key) return;

    if (key === 'number' || key === 'expiration_date' || key === 'cpf') {
      inputs[key].current?.input.focus();
      return;
    }

    inputs[key].current?.focus();
  }, [validation]); //eslint-disable-line

  function handleCardValidation() {
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
      cvv: yup.string().min(3, 'O código deve ter 3 digitos').required('O código de segurança é obrigatório'),
      expiration_date: yup
        .string()
        .transform((value, originalValue) => {
          return originalValue.replace(/\D/g, '');
        })
        .min(4, 'Data de validade inválida')
        .required('A data de validade do cartão é obrigatória'),
      name: yup.string().required('O nome e sobrenome são obrigatórios'),
      number: yup
        .string()
        .transform((value, originalValue) => {
          return originalValue.replace(/\D/g, '');
        })
        .min(12, 'Número do cartão inválido')
        .test('cardValidation', 'Infelizmente não trabalhamos com essa bandeira de cartão', value => {
          return cardBrandValidation(value);
        })
        .required('O número do cartão é obrigatório'),
    });

    const card: CreditCart = {
      number,
      name,
      expiration_date: expirationDate,
      cvv,
      cpf,
    };

    schema
      .validate(card)
      .then(() => {
        setValidation({});
        dispatch(setCard(card));
        setIsCardValid(true);
        checkout.handleStepNext();
      })
      .catch(err => {
        setIsCardValid(false);
        setValidation({
          [err.path]: err.message,
        });
      });
  }

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Pagamento online"
      actions={<PaymentCreditCardActions handleSubmit={handleCardValidation} />}
      style={styles.modal}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <StandardMaskedInput
          error={!!validation.number}
          helperText={validation.number}
          ref={inputs.number}
          placeholder="Número do cartão"
          label="Número do cartão"
          autoFocus
          keyboardType="numeric"
          value={number}
          onChangeText={formatted => setNumber(formatted)}
          onSubmitEditing={() => inputs.name.current?.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          autoCorrect={false}
          textContentType="creditCardNumber"
          autoCompleteType="cc-number"
          mask="[0000] [0000] [0000] [0000]"
        />
        <Input
          error={!!validation.name}
          helperText={validation.name ? validation.name : 'Assim como está escrito no cartão'}
          ref={inputs.name}
          variant="standard"
          placeholder="Nome e sobrenome"
          label="Nome e sobrenome"
          keyboardType="default"
          onSubmitEditing={() => inputs.expiration_date.current?.input.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          value={name}
          onChange={e => setName(e.nativeEvent.text)}
          autoCapitalize="words"
          autoCorrect={true}
        />
        <View style={styles.row}>
          <StandardMaskedInput
            error={!!validation.expiration_date}
            helperText={validation.expiration_date ? validation.expiration_date : 'MM/AA'}
            ref={inputs.expiration_date}
            placeholder="00/00"
            label="Validade"
            keyboardType="numeric"
            value={expirationDate}
            onChangeText={formatted => setExpirationDate(formatted)}
            onSubmitEditing={() => inputs.cvv.current?.focus()}
            blurOnSubmit={false}
            returnKeyType="next"
            autoCorrect={false}
            mainContainerStyle={styles.expirationDateInput}
            containerStyle={{ flex: 1 }}
            mask="[00]/[00]"
          />
          <Input
            error={!!validation.cvv}
            helperText={validation.cvv ? validation.cvv : 'Código de segurança'}
            ref={inputs.cvv}
            variant="standard"
            placeholder="Código"
            label="Código de segurança"
            keyboardType="numeric"
            value={cvv}
            onChange={e => setCvv(e.nativeEvent.text)}
            onSubmitEditing={() => inputs.cpf.current?.input.focus()}
            blurOnSubmit={false}
            returnKeyType="next"
            autoCorrect={false}
            mainContainerStyle={styles.cvvInput}
            containerStyle={{ flex: 1 }}
          />
        </View>
        <StandardMaskedInput
          error={!!validation.cpf}
          helperText={validation.cpf ? validation.cpf : 'CPF do titular do cartão'}
          ref={inputs.cpf}
          placeholder="CPF"
          label="CPF"
          keyboardType="numeric"
          returnKeyType="send"
          value={cpf}
          onChangeText={formatted => setCpf(formatted)}
          autoCorrect={false}
          onSubmitEditing={handleCardValidation}
          mask="[000].[000].[000]-[00]"
        />
      </ScrollView>
    </Modal>
  );
};

export default PaymentCreditCard;
