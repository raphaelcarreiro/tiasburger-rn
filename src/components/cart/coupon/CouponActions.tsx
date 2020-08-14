import React from 'react';
import AppBarAction from '../../appbar/AppBarAction';

type CouponActionsProps = {
  handleSubmit(): void;
  loading: boolean;
};

const CouponActions: React.FC<CouponActionsProps> = ({ handleSubmit, loading }) => {
  return (
    <>
      <AppBarAction iconName="check" onPress={handleSubmit} disabled={loading} />
    </>
  );
};

export default CouponActions;
