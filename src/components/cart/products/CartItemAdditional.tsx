import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Additional } from '../../../@types/product';
import Typography from '../../bases/typography/Text';

type CartItemAdditionalProps = {
  additional: Additional[];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 5,
    flex: 1,
  },
  additionalName: {
    color: '#4CAF50',
    marginRight: 7,
  },
});

const CartItemAdditional: React.FC<CartItemAdditionalProps> = ({ additional }) => {
  return (
    <View style={styles.container}>
      {additional
        .filter(a => a.selected)
        .map(_additional => (
          <Typography key={String(_additional.id)} style={styles.additionalName} size={14}>
            c/ {_additional.amount}x {_additional.name}
          </Typography>
        ))}
    </View>
  );
};

export default CartItemAdditional;
