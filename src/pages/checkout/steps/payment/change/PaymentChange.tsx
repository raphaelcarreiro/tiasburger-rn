import React, { useState } from 'react';
import Modal from '../../../../../components/modal/Modal';
import Typography from '../../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import Button from '../../../../../components/bases/button/Button';
import { useSelector } from '../../../../../store/selector';
import { useDispatch } from 'react-redux';
import { setChange } from '../../../../../store/modules/order/actions';
import Input from '../../../../../components/bases/input/Input';

type PaymentChangeProps = {
  handleClose(): void;
  open: boolean;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
});

const PaymentChange: React.FC<PaymentChangeProps> = ({ handleClose, open }) => {
  const [hasChange, setHasChange] = useState(false);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [paymentChange, setPaymentChange] = useState('');

  function handleYes() {
    setHasChange(true);
  }

  function handleNo() {
    setHasChange(false);
    dispatch(setChange(0));
  }

  function handleSubmit() {
    dispatch(setChange(0));
    handleClose();
  }

  return (
    <Modal open={open} handleClose={handleClose} title="Troco">
      <View style={styles.container}>
        {!hasChange ? (
          <>
            <Typography size={20}>Precisa de troco?</Typography>
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
              O valor do seu pedido é
              <Typography bold size={20}>
                {' ' + cart.formattedTotal}.
              </Typography>
            </Typography>
            <Input
              label="Troco (R$)"
              fullWidth
              placeholder="Troco para quanto?"
              helperText="Digite o valor que vai pagar ao entregador."
              variant="standard"
              value={paymentChange}
              onChange={event => setPaymentChange(event.nativeEvent.text)}
              keyboardType="numeric"
              style={{ fontSize: 30 }}
              containerStyle={{ height: 80 }}
              autoFocus
            />
          </>
        )}
      </View>
    </Modal>
  );
};

export default PaymentChange;
