import React from 'react';
import AppBarAction from '../../../../../components/appbar/AppBarAction';

type PaymentActionsProps = {
  handleSubmit(): void;
  checkValue(): boolean;
};

const PaymentActions: React.FC<PaymentActionsProps> = ({ handleSubmit, checkValue }) => {
  return (
    <>
      <AppBarAction onPress={handleSubmit} iconName="check" disabled={checkValue()} />
    </>
  );
};

export default PaymentActions;
