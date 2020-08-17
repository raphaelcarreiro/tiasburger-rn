import React from 'react';
import { StyleSheet, View } from 'react-native';
import ConfirmShipment from './ConfirmShipment';
import ConfirmPayment from './ConfirmPayment';
import ConfirmTotal from './ConfirmTotal';
import Button from '../../../../components/bases/button/Button';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
  },
  actions: {
    marginTop: 10,
    padding: 15,
  },
});

const Confirm: React.FC = () => {
  return (
    <View style={styles.container}>
      <ConfirmShipment />
      <ConfirmPayment />
      <ConfirmTotal />
      <View style={styles.actions}>
        <Button variant="contained" color="primary">
          Confirmar meu pedido
        </Button>
      </View>
    </View>
  );
};

export default Confirm;
