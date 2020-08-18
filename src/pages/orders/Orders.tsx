import React from 'react';
import Typography from '../../components/bases/typography/Text';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/Routes';

type OrdersProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const Orders: React.FC<OrdersProps> = ({ navigation }) => {
  return (
    <>
      <Typography>Orders</Typography>
    </>
  );
};

export default Orders;
