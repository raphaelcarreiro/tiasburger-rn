import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import { CreatedOrder } from '../../../@types/order';
import Button from '../../../components/bases/button/Button';

const styles = StyleSheet.create({
  section: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 15,
  },
});

type OrderPaymentProps = {
  order: CreatedOrder;
};

const OrderPayment: React.FC<OrderPaymentProps> = ({ order }) => {
  function handleOpenPicPay() {
    Linking.canOpenURL(order.picpay_payment.payment_url).then(supported => {
      if (supported) Linking.openURL(order.picpay_payment.payment_url);
      else console.log('It is not possible open url');
    });
  }
  return (
    <>
      <View style={styles.section}>
        <Typography size={18} bold gutterBottom>
          Forma de pagamento
        </Typography>
        {order.payment_method.mode === 'online' ? (
          <Typography>Pagamento online </Typography>
        ) : (
          <Typography>Pagamento na entrega</Typography>
        )}
        <Typography>
          {order.payment_method.method}
          {order.change > 0 && (
            <Typography size={14} variant="caption">{`, troco para ${order.formattedChange}`}</Typography>
          )}
        </Typography>

        {order.picpay_payment && order.status === 'p' && (
          <Button color="primary" variant="text" onPress={handleOpenPicPay}>
            Fazer pagamento
          </Button>
        )}
      </View>
    </>
  );
};

export default OrderPayment;
