import React from 'react';
import Typography from '../../components/bases/typography/Text';
import { CreatedOrder } from '../../@types/order';
import ListItem from '../../components/list-item/ListItem';
import { StyleSheet, View } from 'react-native';
import { OrderStatusBadge } from './styles';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../routes/Routes';
import { useNavigation } from '@react-navigation/native';

type OrderItemProps = {
  order: CreatedOrder;
};

const styles = StyleSheet.create({
  content: {
    marginTop: 15,
    marginBottom: 15,
  },
});

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  function handlePress(orderId: string) {
    navigation.navigate('Order', { orderId });
  }

  return (
    <ListItem onPress={() => handlePress(order.encrypted_id)}>
      <OrderStatusBadge status={order.status}>
        <Typography color="contrast" size={12} bold>
          {order.statusName}
        </Typography>
      </OrderStatusBadge>
      <Typography color="primary">Pedido {order.formattedId}</Typography>
      <View style={styles.content}>
        <Typography>{order.customer.name}</Typography>
        <Typography>
          {order.formattedDate}
          {(order.status === 'o' || order.status === 'a') && (
            <Typography variant="caption" size={14}>{`, ${order.dateDistance} atrás`}</Typography>
          )}
        </Typography>
        {order.shipment.shipment_method === 'customer_collect' ? (
          <Typography size={14} variant="caption">
            Cliente retira
            {order.shipment.scheduled_at && (
              <Typography size={14} variant="caption">
                {`, agendado para as ${order.shipment.formattedScheduledAt}`}
              </Typography>
            )}
          </Typography>
        ) : (
          <Typography size={14} variant="caption">
            {order.shipment.address}, {order.shipment.number}, {order.shipment.district}
          </Typography>
        )}
      </View>
      <Typography bold size={18}>
        {order.formattedTotal}
      </Typography>
    </ListItem>
  );
};

export default OrderItem;
