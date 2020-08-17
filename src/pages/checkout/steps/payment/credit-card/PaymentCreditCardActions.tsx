import React from 'react';
import AppBarAction from '../../../../../components/appbar/AppBarAction';

type PaymentCreditCardActionsProps = {
  handleSubmit(): void;
};

const PaymentCreditCardActions: React.FC<PaymentCreditCardActionsProps> = ({ handleSubmit }) => {
  return (
    <>
      <AppBarAction onPress={handleSubmit} iconName="check" />
    </>
  );
};

export default PaymentCreditCardActions;
