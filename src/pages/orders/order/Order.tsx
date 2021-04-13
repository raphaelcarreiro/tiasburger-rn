import React, { useCallback, useState, useEffect } from 'react';
import { RouteProp, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { RootDrawerParamList } from '../../../routes/Routes';
import { StyleSheet, ScrollView, View } from 'react-native';
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
import { useSelector } from '../../../store/selector';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useApp } from '../../../appContext';
import Typography from '../../../components/bases/typography/Text';

type OrderScreenRouteProp = RouteProp<RootDrawerParamList, 'Order'>;

type OrderProps = {
  route: OrderScreenRouteProp;
  navigation: DrawerNavigationProp<RootDrawerParamList>;
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
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Order: React.FC<OrderProps> = ({ route, navigation }) => {
  const [order, loadOrder, error, setOrder] = useLoadOrder();
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const app = useApp();
  const isFocused = useIsFocused();

  useFocusEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      app.setRedirect('Order');
    }
  });

  useEffect(() => {
    if (!user && isFocused) {
      navigation.navigate('Login');
      app.setRedirect('Order');
    }

    if (!isFocused) setLoading(true);
  }, [user, isFocused, navigation, app]);

  useEffect(() => {
    const socket = io.connect(socketBaseUrl + '/client');

    if (!order) return;

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

    return () => {
      socket.disconnect();
    };
  }, [setOrder, order]);

  const refresh = useCallback(() => {
    if (!route.params) return;
    if (!route.params.orderId) return;

    setLoading(true);
    loadOrder(route.params.orderId).finally(() => {
      setLoading(false);
    });
  }, [loadOrder, route]);

  useEffect(() => {
    if (!user) return;
    refresh();
  }, [refresh, user]);

  return (
    <>
      <AppBar
        title={order ? `pedido ${order.formattedId}` : 'carregando...'}
        actions={<OrderActions loadOrder={refresh} loading={loading} />}
        showBackAction
        backAction={() => navigation.navigate('Orders')}
      />
      {loading ? (
        <InsideLoading />
      ) : (
        <>
          {order && !error ? (
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
              <OrderStatus orderStatus={order.order_status} />
              <OrderShipment shipment={order.shipment} />
              <OrderPayment order={order} />
              <OrderProducts products={order.products} />
              <OrderTotal order={order} />
            </ScrollView>
          ) : (
            error && (
              <View style={styles.error}>
                <Typography variant="caption">Não foi possível carregar o pedido.</Typography>
              </View>
            )
          )}
        </>
      )}
    </>
  );
};

export default Order;
