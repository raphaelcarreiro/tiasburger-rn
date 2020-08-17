import React, { useMemo } from 'react';
import { useSelector } from '../../../../store/selector';
import { useCheckout } from '../../checkoutContext';
import { StyleSheet, View } from 'react-native';
import PaymentTab from './PaymentTab';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    position: 'relative',
  },
});

const Payment: React.FC = () => {
  const checkout = useCheckout();
  const order = useSelector(state => state.order);
  const paymentMethods = checkout.paymentMethods;
  const online = useMemo(() => paymentMethods.some(method => method.mode === 'online'), [paymentMethods]);
  const offline = useMemo(() => paymentMethods.some(method => method.mode === 'offline'), [paymentMethods]);
  const initialRoute = useMemo(() => {
    return order.paymentMethod && order.paymentMethod.mode === 'online' ? 'online' : 'offline';
  }, [order.paymentMethod]);

  return (
    <>
      <PaymentTab online={online} offline={offline} initialRouteName={initialRoute} />
      <View style={styles.container} />
    </>
  );
};

export default Payment;
