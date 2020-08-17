import React from 'react';
import { useSelector } from '../../store/selector';
import Typography from '../../components/bases/typography/Text';

const CheckoutSuccess: React.FC = () => {
  const user = useSelector(state => state.user);

  return (
    <>
      <Typography>Recebemos seu pedido {user?.name}</Typography>
    </>
  );
};

export default CheckoutSuccess;
