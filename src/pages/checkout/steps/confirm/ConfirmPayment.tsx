import React from 'react';
import Typography from '../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import { useSelector } from '../../../../store/selector';
import { useCheckout } from '../../checkoutContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import IconButton from '../../../../components/bases/icon-button/IconButton';

const styles = StyleSheet.create({
  section: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  deliveryTime: {
    marginTop: 7,
  },
  actions: {
    marginTop: 5,
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
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
          <IconButton
            onPress={() => handleSetStepById('STEP_PAYMENT')}
            Icon={<Icon color="#666" name="edit" size={24} />}
          />
        </View>
      </View>
    </>
  );
};

export default ConfirmPayment;
