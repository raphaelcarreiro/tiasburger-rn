import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Button from '../../../components/bases/button/Button';
import Typography from '../../../components/bases/typography/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProductAmountControlProps extends ViewProps {
  amount: number;
  handleAmountUp(): void;
  handleAmountDown(): void;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 0,
  },
  button: {
    padding: 0,
  },
});

const ProductAmountControl: React.FC<ProductAmountControlProps> = ({
  amount,
  handleAmountDown,
  handleAmountUp,
  style,
}) => {
  return (
    <View style={[style, styles.container]}>
      <Button variant="text" color="primary" onPress={handleAmountDown}>
        <Icon name="minus" size={26} />
      </Button>
      <Typography size={20}>{amount}</Typography>
      <Button variant="text" color="primary" style={styles.button} onPress={handleAmountUp}>
        <Icon name="plus" size={26} />
      </Button>
    </View>
  );
};

export default ProductAmountControl;
