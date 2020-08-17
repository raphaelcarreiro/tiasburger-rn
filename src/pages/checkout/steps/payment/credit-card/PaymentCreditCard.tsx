import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../../../../components/modal/Modal';
import Input from '../../../../../components/bases/input/Input';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from '../../../../../store/selector';
import { useDispatch } from 'react-redux';
import { useCheckout } from '../../../checkoutContext';
import { useTheme } from 'styled-components';
import PaymentCreditCardActions from './PaymentCreditCardActions';
import * as yup from 'yup';
import { cpfValidation } from '../../../../../helpers/cpfValidation';
import { cardBrandValidation } from '../../../../../helpers/cardBrandValidation';
import { setCard } from '../../../../../store/modules/order/actions';
import { CreditCart } from '../../../../../@types/order';

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
  const theme = useTheme();
  const checkout = useCheckout();

  const inputs = {
    number: useRef<TextInput>(null),
    name: useRef<TextInput>(null),
    expiration_date: useRef<TextInput>(null),
    cvv: useRef<TextInput>(null),
    cpf: useRef<TextInput>(null),
  };

  useEffect(() => {
    const [key] = Object.keys(validation) as Array<keyof typeof validation>;
    if (!key) return;

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
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title="Pagamento online"
        actions={<PaymentCreditCardActions handleSubmit={handleCardValidation} />}
      >
        <Input
          error={!!validation.number}
          helperText={validation.number}
          ref={inputs.number}
          variant="standard"
          placeholder="Número do cartão"
          label="Número do cartão"
          autoFocus
          keyboardType="numeric"
          value={number}
          onChange={e => setNumber(e.nativeEvent.text)}
          onSubmitEditing={() => inputs.number.current?.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          autoCorrect={false}
          textContentType="creditCardNumber"
          required
          autoCompleteType="cc-number"
        />
        <Input
          error={!!validation.name}
          helperText={validation.name}
          ref={inputs.name}
          variant="standard"
          placeholder="Nome"
          label="Nome e sobrenome"
          keyboardType="default"
          onSubmitEditing={() => inputs.expiration_date.current?.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          value={name}
          onChange={e => setName(e.nativeEvent.text)}
          autoCapitalize="words"
          autoCorrect={true}
        />
        <View style={styles.row}>
          <Input
            error={!!validation.expiration_date}
            helperText={validation.expiration_date}
            ref={inputs.expiration_date}
            variant="standard"
            placeholder="Validadade"
            label="Validade do cartão"
            keyboardType="numeric"
            value={expirationDate}
            onChange={e => setExpirationDate(e.nativeEvent.text)}
            onSubmitEditing={() => inputs.cvv.current?.focus()}
            blurOnSubmit={false}
            returnKeyType="next"
            autoCorrect={false}
            mainContainerStyle={styles.expirationDateInput}
            containerStyle={{ flex: 1 }}
          />
          <Input
            error={!!validation.cvv}
            helperText={validation.cvv}
            ref={inputs.cvv}
            variant="standard"
            placeholder="Código"
            label="Código de segurança"
            keyboardType="numeric"
            value={cvv}
            onChange={e => setCvv(e.nativeEvent.text)}
            onSubmitEditing={() => inputs.cpf.current?.focus()}
            blurOnSubmit={false}
            returnKeyType="next"
            autoCorrect={false}
            mainContainerStyle={styles.cvvInput}
            containerStyle={{ flex: 1 }}
          />
        </View>
        <Input
          error={!!validation.cpf}
          helperText={validation.cpf}
          ref={inputs.cpf}
          variant="standard"
          placeholder="CPF do títular do cartão"
          label="CPF"
          keyboardType="numeric"
          blurOnSubmit={false}
          returnKeyType="send"
          value={cpf}
          onChange={e => setCpf(e.nativeEvent.text)}
          autoCorrect={false}
        />
      </Modal>
    </>
  );
};

export default PaymentCreditCard;
