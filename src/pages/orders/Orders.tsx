import React, { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import { CreatedOrder } from '../../@types/order';
import { parseISO, format, formatDistanceStrict } from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';
import { formatId } from '../../helpers/formatOrderId';
import { moneyFormat } from '../../helpers/numberFormat';
import { orderStatusName } from './orderStatus';
import { FlatList, StyleSheet, View } from 'react-native';
import OrderItem from './OrderItem';
import AppBar from '../../components/appbar/Appbar';
import Typography from '../../components/bases/typography/Text';
import order from '../../store/modules/order/reducer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56,
    padding: 15,
  },
  empty: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<CreatedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    api
      .get('/orders')
      .then(response => {
        setOrders(handleSetOrders(response.data.data));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
  }, [refresh]);

  function handleSetOrders(orders: CreatedOrder[]) {
    return orders.map(order => {
      const date = parseISO(order.created_at);
      return {
        ...order,
        formattedId: formatId(order.id),
        formattedTotal: moneyFormat(order.total),
        formattedDate: format(date, "PP 'às' p", { locale: ptbr }),
        dateDistance: formatDistanceStrict(date, new Date(), { locale: ptbr, roundingMethod: 'ceil' }),
        statusName: orderStatusName(order.shipment.shipment_method, order.status),
        shipment: {
          ...order.shipment,
          formattedScheduledAt: order.shipment.scheduled_at
            ? format(parseISO(order.shipment.scheduled_at), 'HH:mm')
            : null,
        },
      };
    });
  }
  return (
    <>
      <AppBar title="Meus pedidos" />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={orders.length === 0 && { flex: 1 }}
          data={orders}
          keyExtractor={order => String(order.id)}
          renderItem={({ item: order }) => <OrderItem order={order} />}
          refreshing={loading}
          onRefresh={refresh}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Typography variant="caption" size={18}>
                Não há pedidos para mostrar.
              </Typography>
            </View>
          }
        />
      </View>
    </>
  );
};

export default Orders;
