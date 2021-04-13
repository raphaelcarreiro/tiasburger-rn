import React, { useState, useMemo } from 'react';
import { useCheckout } from '../../checkoutContext';
import { useDispatch } from 'react-redux';
import PaymentOnlineMethod from './PaymentOnlineMethod';
import PaymentCreditCard from './credit-card/PaymentCreditCard';
import { setPaymentMethod } from '../../../../store/modules/order/actions';
import PaymentCpf from './cpf/PaymentCpf';
import { useSelector } from '../../../../store/selector';

const PaymentOnline: React.FC = () => {
  const checkout = useCheckout();
  const [modalCpf, setModalCpf] = useState(false);
  const [modalCard, setModalCard] = useState(false);
  const dispatch = useDispatch();
  const [isCardValid, setIsCardValid] = useState(false);
  const user = useSelector(state => state.user);
  const restaurant = useSelector(state => state.restaurant);

  const onlineMethods = useMemo(() => {
    return checkout.paymentMethods.filter(payment => payment.mode === 'online');
  }, [checkout.paymentMethods]);

  function handleCloseModalCard() {
    if (!isCardValid) dispatch(setPaymentMethod(null));
    setModalCard(false);
  }

  function handleModalCpfClose() {
    if (!user?.customer.cpf) dispatch(setPaymentMethod(null));
    setModalCpf(false);
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
      {modalCpf && <PaymentCpf open={modalCpf} handleClose={handleModalCpfClose} />}
      {onlineMethods
        .filter(
          method =>
            !(method.mode === 'online' && method.kind === 'card' && restaurant?.payment_gateway === 'mercadopago'),
        )
        .map(paymentMethod => (
          <PaymentOnlineMethod
            key={String(paymentMethod.id)}
            paymentMethod={paymentMethod}
            openModalCard={() => setModalCard(true)}
            openModalCpf={() => setModalCpf(true)}
          />
        ))}
    </>
  );
};

export default PaymentOnline;
