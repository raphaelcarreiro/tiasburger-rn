import React from 'react';
import Typography from '../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import { useSelector } from '../../../../store/selector';
import Button from '../../../../components/bases/button/Button';
import { useCheckout } from '../../checkoutContext';

const styles = StyleSheet.create({
  section: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  deliveryTime: {
    marginTop: 7,
  },
  actions: {
    marginTop: 7,
    alignItems: 'flex-end',
  },
});

const ConfirmPayment: React.FC = () => {
  const order = useSelector(state => state.order);
  const { handleSetStepById } = useCheckout();

  return (
    <>
      <View style={styles.section}>
        <Typography size={20} bold>
          Forma de pagamento
        </Typography>
        {order.paymentMethod?.mode === 'online' ? (
          <Typography>Pagamento on-line</Typography>
        ) : (
          <Typography>Pagamento na entrega</Typography>
        )}
        {order.paymentMethod?.kind === 'card' && order.paymentMethod.mode === 'online' ? (
          <>
            <Typography variant="caption">{order.paymentMethod.method}</Typography>
            <Typography>**** **** **** {order.creditCard.number.substr(-4)}</Typography>
          </>
        ) : (
          <Typography>
            {order.paymentMethod?.method}
            {order.change > 0 && (
              <Typography variant="caption" size={14}>
                {' - '}Troco para {order.formattedChange}
              </Typography>
            )}
          </Typography>
        )}
        <View style={styles.actions}>
          <Button
            style={{ width: 60 }}
            disablePadding
            variant="text"
            color="primary"
            onPress={() => handleSetStepById('STEP_PAYMENT')}
          >
            Alterar
          </Button>
        </View>
      </View>
    </>
  );
};

export default ConfirmPayment;
