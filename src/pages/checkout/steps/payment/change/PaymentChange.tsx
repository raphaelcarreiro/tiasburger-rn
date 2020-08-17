import React, { useState } from 'react';
import Modal from '../../../../../components/modal/Modal';
import Typography from '../../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import Button from '../../../../../components/bases/button/Button';
import { useSelector } from '../../../../../store/selector';
import { useDispatch } from 'react-redux';
import { setChange } from '../../../../../store/modules/order/actions';
import Input from '../../../../../components/bases/input/Input';
import PaymentActions from './PaymentActions';
import { useCheckout } from '../../../checkoutContext';

type PaymentChangeProps = {
  handleClose(): void;
  open: boolean;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 30,
  },
  button: {
    width: 100,
  },
  inputContainer: {
    marginTop: 10,
  },
});

const PaymentChange: React.FC<PaymentChangeProps> = ({ handleClose, open }) => {
  const [hasChange, setHasChange] = useState(false);
  const cart = useSelector(state => state.cart);
  const [paymentChange, setPaymentChange] = useState('');
  const dispatch = useDispatch();
  const checkout = useCheckout();

  function handleYes() {
    setHasChange(true);
  }

  function handleNo() {
    setHasChange(false);
    dispatch(setChange(0));
    checkout.handleSetStepById('STEP_CONFIRM');

    handleClose();
  }

  function handleSubmit() {
    if (checkValue()) return;
    dispatch(setChange(parseFloat(paymentChange)));
    checkout.handleSetStepById('STEP_CONFIRM');

    handleClose();
  }

  function checkValue() {
    if (!paymentChange) return true;

    return parseFloat(paymentChange) <= cart.total;
  }

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Troco"
      actions={<PaymentActions handleSubmit={handleSubmit} checkValue={checkValue} />}
    >
      <View style={styles.container}>
        {!hasChange ? (
          <>
            <Typography size={20} align="center">
              Precisa de troco?
            </Typography>
            <View style={styles.actions}>
              <Button style={styles.button} variant="contained" color="primary" onPress={handleYes}>
                Sim
              </Button>
              <Button style={styles.button} variant="contained" color="primary" onPress={handleNo}>
                Não
              </Button>
            </View>
          </>
        ) : (
          <>
            <Typography size={20}>
              Seu pedido
              <Typography bold size={20}>
                {' ' + cart.formattedTotal}.
              </Typography>
            </Typography>
            <View style={styles.inputContainer}>
              <Input
                error={paymentChange === '' ? false : checkValue()}
                label="Troco (R$)"
                fullWidth
                placeholder="Troco para quanto?"
                helperText={
                  checkValue() && paymentChange !== ''
                    ? 'O valor deve ser maior que o valor do pedido.'
                    : 'Digite o valor que vai pagar ao entregador.'
                }
                variant="standard"
                value={paymentChange}
                onChange={event => setPaymentChange(event.nativeEvent.text)}
                keyboardType="numeric"
                style={{ fontSize: 30 }}
                containerStyle={{ height: 80 }}
                autoFocus
                onSubmitEditing={handleSubmit}
                blurOnSubmit={false}
              />
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default PaymentChange;
