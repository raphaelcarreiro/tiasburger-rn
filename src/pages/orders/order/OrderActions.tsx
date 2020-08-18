import React from 'react';
import AppBarAction from '../../../components/appbar/AppBarAction';

type OrderActionsProps = {
  loadOrder(): void;
  loading: boolean;
};

const OrderActions: React.FC<OrderActionsProps> = ({ loadOrder, loading }) => {
  return (
    <>
      <AppBarAction onPress={loadOrder} iconName="refresh" disabled={loading} />
    </>
  );
};

export default OrderActions;
