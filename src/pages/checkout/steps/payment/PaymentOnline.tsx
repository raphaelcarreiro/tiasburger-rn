import React, { useState } from 'react';
import { useCheckout } from '../../checkoutContext';
import { useSelector } from '../../../../store/selector';
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import PaymentOnlineMethod from './PaymentOnlineMethod';
import PaymentCreditCard from './credit-card/PaymentCreditCard';
import { setPaymentMethod } from '../../../../store/modules/order/actions';

const PaymentOnline: React.FC = () => {
  const checkout = useCheckout();
  const [dialogCpf, setDialogCpf] = useState(false);
  const [modalCard, setModalCard] = useState(false);
  const dispatch = useDispatch();
  const [isCardValid, setIsCardValid] = useState(false);

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
      <FlatList
        data={checkout.paymentMethods.filter(payment => payment.mode === 'online')}
        keyExtractor={payment => String(payment.id)}
        renderItem={({ item: paymentMethod }) => (
          <PaymentOnlineMethod paymentMethod={paymentMethod} openModalCard={() => setModalCard(true)} />
        )}
      />
    </>
  );
};

export default PaymentOnline;
