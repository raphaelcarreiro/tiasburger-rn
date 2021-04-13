import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import { CreatedOrder } from '../../../@types/order';

const styles = StyleSheet.create({
  section: {
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  total: {
    marginTop: 10,
  },
});

type OrderTotalProps = {
  order: CreatedOrder;
};

const OrderTotal: React.FC<OrderTotalProps> = ({ order }) => {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.row}>
          <Typography>subtotal</Typography>
          <Typography>{order.formattedSubtotal}</Typography>
        </View>
        <View style={styles.row}>
          <Typography>desconto</Typography>
          <Typography>{order.formattedDiscount}</Typography>
        </View>
        <View style={styles.row}>
          <Typography>taxa de entrega</Typography>
          <Typography>{order.formattedTax}</Typography>
        </View>
        <View style={[styles.row, styles.total]}>
          <Typography>total</Typography>
          <Typography bold size={22}>
            {order.formattedTotal}
          </Typography>
        </View>
      </View>
    </>
  );
};

export default OrderTotal;
