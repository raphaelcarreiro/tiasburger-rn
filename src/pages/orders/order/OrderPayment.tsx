import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import { CreatedOrder } from '../../../@types/order';
import Button from '../../../components/bases/button/Button';
import CheckoutSucessPix from '../../checkout/steps/success/CheckoutSuccessPix';

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
    if (!order.picpay_payment) return;

    Linking.canOpenURL(order.picpay_payment.payment_url).then(supported => {
      if (supported && order.picpay_payment) Linking.openURL(order.picpay_payment.payment_url);
      else console.log('It is not possible open url');
    });
  }
  return (
    <>
      <View style={styles.section}>
        <Typography size={18} bold gutterBottom>
          forma de pagamento
        </Typography>
        {order.payment_method.mode === 'online' ? (
          <Typography>pagamento online </Typography>
        ) : (
          <Typography>pagamento na entrega</Typography>
        )}
        <Typography>
          {order.payment_method.method}
          {order.change > 0 && (
            <Typography size={14} variant="caption">{`, troco para ${order.formattedChange}`}</Typography>
          )}
        </Typography>

        {order.picpay_payment && order.status === 'p' && (
          <Button color="primary" variant="text" onPress={handleOpenPicPay}>
            fazer pagamento
          </Button>
        )}

        {order.pix_payment && order.status === 'p' && <CheckoutSucessPix order={order} />}
      </View>
    </>
  );
};

export default OrderPayment;
