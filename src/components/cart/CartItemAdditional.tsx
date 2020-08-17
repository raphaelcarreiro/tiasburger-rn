import React from 'react';
import { Additional } from '../../@types/product';
import { StyleSheet, View } from 'react-native';
import Typography from '../bases/typography/Text';

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
      {additional.some(_additional => _additional.selected) &&
        additional.map(
          _additional =>
            _additional.selected && (
              <Typography key={String(_additional.id)} style={styles.additionalName} size={14}>
                + {_additional.name}
              </Typography>
            ),
        )}
    </View>
  );
};

export default CartItemAdditional;
