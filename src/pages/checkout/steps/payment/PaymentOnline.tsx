import React, { useState } from 'react';
import { useCheckout } from '../../checkoutContext';
import { useSelector } from '../../../../store/selector';
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import PaymentOnlineMethod from './PaymentOnlineMethod';

const PaymentOnline: React.FC = () => {
  const checkout = useCheckout();
  const [dialogCpf, setDialogCpf] = useState(false);
  const [dialogCard, setDialogCard] = useState(false);
  const user = useSelector(state => state.user);
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={checkout.paymentMethods.filter(payment => payment.mode === 'online')}
      keyExtractor={payment => String(payment.id)}
      renderItem={({ item: paymentMethod }) => <PaymentOnlineMethod paymentMethod={paymentMethod} />}
    />
  );
};

export default PaymentOnline;
