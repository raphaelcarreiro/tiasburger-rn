import React from 'react';
import { OrderStatus as OrderStatusType } from '../../../@types/order';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import { OrderStatusBadge } from './styles';

type OrderStatusProps = {
  orderStatus: OrderStatusType[];
};

type OrderStatusItemProps = {
  orderStatus: OrderStatusType;
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

const OrderStatusItem: React.FC<OrderStatusItemProps> = ({ orderStatus }) => (
  <View style={styles.item}>
    <OrderStatusBadge status={orderStatus.status} />
    <View>
      <Typography>{orderStatus.statusName}</Typography>
      <Typography variant="caption" size={14}>
        {orderStatus.formattedDate}
      </Typography>
    </View>
  </View>
);

const OrderStatus: React.FC<OrderStatusProps> = ({ orderStatus }) => {
  return (
    <View style={styles.container}>
      {orderStatus.map(status => (
        <OrderStatusItem orderStatus={status} key={String(status.id)} />
      ))}
    </View>
  );
};

export default OrderStatus;
