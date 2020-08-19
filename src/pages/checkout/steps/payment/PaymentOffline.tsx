import React, { useState, useMemo } from 'react';
import { useCheckout } from '../../checkoutContext';
import PaymentOfflineMethod from './PaymentOfflineMethod';
import PaymentChange from './change/PaymentChange';

const PaymentOffline: React.FC = () => {
  const checkout = useCheckout();
  const [modalChange, setModalChange] = useState(false);

  const offlineMethods = useMemo(() => {
    return checkout.paymentMethods.filter(payment => payment.mode === 'offline');
  }, [checkout.paymentMethods]);

  return (
    <>
      {modalChange && <PaymentChange open={modalChange} handleClose={() => setModalChange(false)} />}
      {offlineMethods.map(paymentMethod => (
        <PaymentOfflineMethod
          key={String(paymentMethod.id)}
          openModalChange={() => setModalChange(true)}
          paymentMethod={paymentMethod}
        />
      ))}
    </>
  );
};

export default PaymentOffline;
