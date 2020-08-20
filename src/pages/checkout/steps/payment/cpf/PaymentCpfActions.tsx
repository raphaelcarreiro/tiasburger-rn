import React from 'react';
import AppBarAction from '../../../../../components/appbar/AppBarAction';

type PaymentCpfActionsProps = {
  handleValidation(): void;
  saving: boolean;
};

const PaymentCpfActions: React.FC<PaymentCpfActionsProps> = ({ handleValidation, saving }) => {
  return (
    <>
      <AppBarAction onPress={handleValidation} iconName="check" disabled={saving} />
    </>
  );
};

export default PaymentCpfActions;
