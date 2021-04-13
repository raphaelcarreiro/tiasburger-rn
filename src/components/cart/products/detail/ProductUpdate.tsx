import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CartProduct } from '../../../../@types/cart';
import ProductAmountControl from './ProductAmountControl';
import ProductUpdateButton from './ProductUpdateButton';

const styles = StyleSheet.create({
  footerActions: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    justifyContent: 'flex-end',
  },
});

type ProductAddProps = {
  handleAmountDown(): void;
  handleAmountUp(): void;
  amount: number;
  product: CartProduct;
  total: string;
  redirect?: boolean;
};

const ProductUpdate: React.FC<ProductAddProps> = ({ product, amount, total, handleAmountDown, handleAmountUp }) => {
  return (
    <View style={styles.footerActions}>
      <ProductAmountControl handleAmountDown={handleAmountDown} handleAmountUp={handleAmountUp} amount={amount} />
      <ProductUpdateButton product={product} total={total} amount={amount} />
    </View>
  );
};

export default ProductUpdate;
