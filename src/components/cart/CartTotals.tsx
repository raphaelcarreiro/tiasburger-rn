import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../bases/typography/Text';
import { useSelector } from '../../store/selector';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  values: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  taxWarning: {
    maxWidth: 250,
  },
  total: {
    marginTop: 10,
  },
});

const CartTotals: React.FC = () => {
  const cart = useSelector(state => state.cart);
  const restaurant = useSelector(state => state.restaurant);
  const order = useSelector(state => state.order);

  return (
    <View style={styles.container}>
      {cart.discount > 0 && (
        <>
          <View style={styles.values}>
            <Typography>Subtotal</Typography>
            <Typography>{cart.formattedSubtotal}</Typography>
          </View>
          <View style={styles.values}>
            <Typography>Desconto</Typography>
            <Typography>{cart.formattedDiscount}</Typography>
          </View>
        </>
      )}
      {cart.tax > 0 && (
        <View style={styles.values}>
          <View>
            <Typography>Taxa de entrega</Typography>
            {restaurant?.configs.tax_mode === 'order_value' ? (
              <Typography variant="caption" size={12} style={styles.taxWarning}>
                {`Será cobrada para os pedidos inferiores a ${restaurant?.configs.formattedOrderMinimumValue}`}
              </Typography>
            ) : (
              restaurant?.configs.tax_mode === 'district' && (
                <>
                  <Typography variant="caption">Valor determinado por bairro</Typography>
                  <Typography variant="caption">
                    {order.shipment.district}, {order.shipment.city}
                  </Typography>
                </>
              )
            )}
          </View>
          <Typography align="right">{cart.formattedTax}</Typography>
        </View>
      )}
      <View style={[styles.values, styles.total]}>
        <Typography size={22}>Total</Typography>
        <Typography size={24} bold>
          {cart.formattedTotal}
        </Typography>
      </View>
    </View>
  );
};

export default CartTotals;
