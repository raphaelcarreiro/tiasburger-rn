import React, { useState, useMemo } from 'react';
import { useCheckout } from '../../checkoutContext';
import { useDispatch } from 'react-redux';
import PaymentOnlineMethod from './PaymentOnlineMethod';
import PaymentCreditCard from './credit-card/PaymentCreditCard';
import { setPaymentMethod } from '../../../../store/modules/order/actions';

const PaymentOnline: React.FC = () => {
  const checkout = useCheckout();
  const [dialogCpf, setDialogCpf] = useState(false);
  const [modalCard, setModalCard] = useState(false);
  const dispatch = useDispatch();
  const [isCardValid, setIsCardValid] = useState(false);

  const onlineMethods = useMemo(() => {
    return checkout.paymentMethods.filter(payment => payment.mode === 'online');
  }, [checkout.paymentMethods]);

  function handleCloseModalCard() {
    if (!isCardValid) dispatch(setPaymentMethod(null));
    setModalCard(false);
  }

  return (
    <>
      {modalCard && (
        <PaymentCreditCard
          open={modalCard}
          handleClose={handleCloseModalCard}
          setIsCardValid={(valid: boolean) => setIsCardValid(valid)}
        />
      )}
      {onlineMethods.map(paymentMethod => (
        <PaymentOnlineMethod
          key={String(paymentMethod.id)}
          paymentMethod={paymentMethod}
          openModalCard={() => setModalCard(true)}
        />
      ))}
    </>
  );
};

export default PaymentOnline;
