import React, { useCallback, useState, useEffect } from 'react';
import Typography from '../../../components/bases/typography/Text';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/Routes';
import { CreatedOrder } from '../../../@types/order';
import { useSelector } from '../../../store/selector';
import { useApp } from '../../../appContext';
import { useMessage } from '../../../hooks/message';
import api from '../../../services/api';
import { formatId } from '../../../helpers/formatOrderId';
import ptBR, { parseISO, format } from 'date-fns';
import { moneyFormat } from '../../../helpers/numberFormat';
import { Alert, StyleSheet, View } from 'react-native';
import AppBar from '../../../components/appbar/Appbar';
import InsideLoading from '../../../components/loading/InsideLoading';
import OrderActions from './OrderActions';

type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>;

type OrderProps = {
  route: OrderScreenRouteProp;
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    marginTop: 56,
  },
});

const Order: React.FC<OrderProps> = ({ route }) => {
  const [order, setOrder] = useState<CreatedOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const app = useApp();
  const messaging = useMessage();

  const loadOrder = useCallback(() => {
    setLoading(true);
    api
      .get(`orders/${route.params.orderId}`)
      .then(response => {
        const _order: CreatedOrder = response.data;

        const formattedId = formatId(_order.id);

        const date = parseISO(_order.created_at);

        setOrder({
          ..._order,
          formattedId,
          formattedDate: format(date, "PP 'às' p", { locale: ptBR }),
          formattedChange: moneyFormat(_order.change),
          formattedTax: moneyFormat(_order.tax),
          products: _order.products.map(product => {
            product.formattedFinalPrice = moneyFormat(product.final_price);
            product.formattedPrice = moneyFormat(product.price);
            product.formattedProductPrice = moneyFormat(product.product_price);
            product.complement_categories = product.complement_categories.map(category => {
              category.complements = category.complements.map(complement => {
                complement.formattedPrice = moneyFormat(complement.price || null);
                complement.additional = complement.additional.map(additional => {
                  additional.formattedPrice = moneyFormat(additional.price);
                  return additional;
                });
                return complement;
              });
              return category;
            });
            product.additional = product.additional.map(additional => {
              additional.formattedPrice = moneyFormat(additional.price);
              return additional;
            });
            return product;
          }),
          formattedSubtotal: moneyFormat(_order.subtotal),
          formattedDiscount: moneyFormat(_order.discount),
          formattedTotal: moneyFormat(_order.total),
          shipment: {
            ..._order.shipment,
            formattedScheduledAt: _order.shipment.scheduled_at
              ? format(parseISO(_order.shipment.scheduled_at), 'HH:mm')
              : null,
          },
          order_status: _order.order_status.reverse().map(status => {
            const statusDate = parseISO(status.created_at);
            status.formattedDate = format(statusDate, "PP 'às' p", { locale: ptBR });
            return status;
          }),
        });
      })
      .catch(err => {
        if (err.response)
          if (err.response.status === 404) {
            Alert.alert('Pedido não encontrado');
          } else Alert.alert('Não foi possível carregar o pedido');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [route.params]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  return (
    <>
      <AppBar
        title={order ? `Pedido ${order.formattedId}` : 'Pedido'}
        actions={<OrderActions loadOrder={loadOrder} loading={loading} />}
      />
      {loading ? (
        <InsideLoading />
      ) : (
        <>
          <View style={styles.container}>{order && <Typography>{order.formattedId}</Typography>}</View>
        </>
      )}
    </>
  );
};

export default Order;
