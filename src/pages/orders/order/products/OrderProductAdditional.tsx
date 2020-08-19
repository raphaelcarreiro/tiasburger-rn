import React from 'react';
import { Additional } from '../../../../@types/product';
import { StyleSheet, View } from 'react-native';
import Typography from '../../../../components/bases/typography/Text';

type OrderProductAdditionalProps = {
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

const OrderProductAdditional: React.FC<OrderProductAdditionalProps> = ({ additional }) => {
  return (
    <View style={styles.container}>
      {additional.some(_additional => _additional.selected) &&
        additional.map(
          _additional =>
            _additional.selected && (
              <Typography key={String(_additional.id)} style={styles.additionalName} size={12}>
                + {_additional.name}
              </Typography>
            ),
        )}
    </View>
  );
};

export default OrderProductAdditional;
