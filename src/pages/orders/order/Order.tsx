import React, { useCallback, useState, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootDrawerParamList } from '../../../routes/Routes';
import { useSelector } from '../../../store/selector';
import { useApp } from '../../../appContext';
import { useMessage } from '../../../hooks/message';
import { StyleSheet, ScrollView } from 'react-native';
import AppBar from '../../../components/appbar/Appbar';
import InsideLoading from '../../../components/loading/InsideLoading';
import OrderActions from './OrderActions';
import { useLoadOrder } from './loadOrder';
import OrderShipment from './OrderShipment';
import OrderPayment from './OrderPayment';
import OrderTotal from './OrderTotal';
import OrderStatus from './OrderStatus';
import { parseISO, format } from 'date-fns';
import io from 'socket.io-client';
import { ptBR } from 'date-fns/esm/locale';
import { socketBaseUrl } from '../../../constants/constants';
import { OrderStatus as OrderStatusType, OrderStatusOptions } from '../../../@types/order';
import { orderStatusName } from '../orderStatus';
import OrderProducts from './products/OrderProducts';

type OrderScreenRouteProp = RouteProp<RootDrawerParamList, 'Order'>;

type OrderProps = {
  route: OrderScreenRouteProp;
};

type Payload = {
  orderStatus: OrderStatusType[];
  orderId: number;
  status: OrderStatusOptions;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: 56,
  },
});

const Order: React.FC<OrderProps> = ({ route }) => {
  const [order, loadOrder, error, setOrder] = useLoadOrder();
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const app = useApp();
  const messaging = useMessage();

  useEffect(() => {
    const socket = io.connect(socketBaseUrl + '/client');
    if (order) {
      socket.emit('register', order.id);
      socket.on('reconnect', () => {
        socket.emit('register', order.id);
      });
      socket.on('orderStatusChange', (payload: Payload) => {
        const statusOrder = payload.orderStatus.reverse().map(status => {
          const statusDate = parseISO(status.created_at);
          status.formattedDate = format(statusDate, "PP 'às' p", { locale: ptBR });
          status.statusName = orderStatusName(order.shipment.shipment_method, status.status);
          return status;
        });
        setOrder(oldOrder =>
          oldOrder && oldOrder.id === payload.orderId
            ? { ...oldOrder, order_status: statusOrder, status: payload.status }
            : oldOrder,
        );
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [setOrder, order]);

  const refresh = useCallback(() => {
    if (!route.params.orderId) return;

    setLoading(true);
    loadOrder(route.params.orderId).finally(() => {
      setLoading(false);
    });
  }, [loadOrder, route.params]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <>
      <AppBar
        title={order ? `Pedido ${order.formattedId}` : 'Pedido'}
        actions={<OrderActions loadOrder={refresh} loading={loading} />}
      />
      {loading ? (
        <InsideLoading />
      ) : (
        <>
          {order && (
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
              <OrderStatus orderStatus={order.order_status} />
              <OrderShipment shipment={order.shipment} />
              <OrderPayment order={order} />
              <OrderProducts products={order.products} />
              <OrderTotal order={order} />
            </ScrollView>
          )}
        </>
      )}
    </>
  );
};

export default Order;
