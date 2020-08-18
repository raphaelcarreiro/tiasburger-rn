import React, { useCallback, useState, useEffect } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { RootDrawerParamList } from '../../../routes/Routes';
import { useSelector } from '../../../store/selector';
import { useApp } from '../../../appContext';
import { useMessage } from '../../../hooks/message';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import AppBar from '../../../components/appbar/Appbar';
import InsideLoading from '../../../components/loading/InsideLoading';
import OrderActions from './OrderActions';
import { useLoadOrder } from './loadOrder';
import OrderShipment from './OrderShipment';
import OrderPayment from './OrderPayment';
import OrderTotal from './OrderTotal';

type OrderScreenRouteProp = RouteProp<RootDrawerParamList, 'Order'>;

type OrderProps = {
  route: OrderScreenRouteProp;
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  scrollView: {
    flex: 1,
    marginTop: 56,
  },
});

const Order: React.FC<OrderProps> = ({ route }) => {
  const [order, loadOrder, error] = useLoadOrder();
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const app = useApp();
  const messaging = useMessage();

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
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.container}
              onMomentumScrollEnd={() => Alert.alert('teste')}
            >
              <OrderShipment shipment={order.shipment} />
              <OrderPayment order={order} />
              <OrderTotal order={order} />
            </ScrollView>
          )}
        </>
      )}
    </>
  );
};

export default Order;
