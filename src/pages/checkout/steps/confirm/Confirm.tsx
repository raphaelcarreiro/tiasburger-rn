import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ConfirmShipment from './ConfirmShipment';
import ConfirmPayment from './ConfirmPayment';
import ConfirmTotal from './ConfirmTotal';
import Button from '../../../../components/bases/button/Button';
import { useCheckout } from '../../checkoutContext';
import Loading from '../../../../components/loading/Loading';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    marginBottom: 45,
  },
  actions: {
    marginTop: 5,
    padding: 15,
  },
});

const Confirm: React.FC = () => {
  const checkout = useCheckout();
  return (
    <>
      <ScrollView style={checkout.saving ? { zIndex: 1 } : { zIndex: 2 }} contentContainerStyle={styles.container}>
        <ConfirmShipment />
        <ConfirmPayment />
        <ConfirmTotal />
        <View style={styles.actions}>
          <Button variant="contained" color="primary" onPress={checkout.handleSubmitOrder}>
            Confirmar meu pedido
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default Confirm;
