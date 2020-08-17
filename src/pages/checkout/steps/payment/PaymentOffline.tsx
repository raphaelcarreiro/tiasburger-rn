import React, { useState } from 'react';
import { useCheckout } from '../../checkoutContext';
import { FlatList } from 'react-native';
import PaymentOfflineMethod from './PaymentOfflineMethod';
import PaymentChange from './change/PaymentChange';

const PaymentOffline: React.FC = () => {
  const checkout = useCheckout();
  const [modalChange, setModalChange] = useState(false);

  return (
    <>
      {modalChange && <PaymentChange open={modalChange} handleClose={() => setModalChange(false)} />}
      <FlatList
        data={checkout.paymentMethods.filter(payment => payment.mode === 'offline')}
        keyExtractor={payment => String(payment.id)}
        renderItem={({ item: paymentMethod }) => (
          <PaymentOfflineMethod openModalChange={() => setModalChange(true)} paymentMethod={paymentMethod} />
        )}
      />
    </>
  );
};

export default PaymentOffline;
