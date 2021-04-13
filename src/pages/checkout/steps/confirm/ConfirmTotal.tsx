import React from 'react';
import Typography from '../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import { useSelector } from '../../../../store/selector';

const styles = StyleSheet.create({
  section: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  deliveryTime: {
    marginTop: 7,
  },
  actions: {
    marginTop: 7,
    alignItems: 'flex-end',
  },
});

const ConfirmTotal: React.FC = () => {
  const cart = useSelector(state => state.cart);

  return (
    <View style={styles.section}>
      <Typography size={20} bold gutterBottom>
        total à pagar
      </Typography>
      <Typography size={18} gutterBottom>
        {cart.formattedTotal}
      </Typography>
      {cart.tax > 0 && (
        <Typography variant="caption" size={12}>
          Este valor inclui a taxa de {cart.formattedTax} para a entrega
        </Typography>
      )}
    </View>
  );
};

export default ConfirmTotal;
