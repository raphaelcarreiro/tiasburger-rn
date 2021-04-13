import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductAmountControl from './ProductAmountControl';
import ProductAddButton from './ProductAddButton';
import { Product } from '../../../@types/product';

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
  product: Product;
  total: string;
  redirect?: boolean;
  buttonText?: string;
};

const ProductAdd: React.FC<ProductAddProps> = ({
  product,
  amount,
  total,
  handleAmountDown,
  handleAmountUp,
  buttonText = 'Adicionar',
}) => {
  return (
    <View style={styles.footerActions}>
      <ProductAmountControl handleAmountDown={handleAmountDown} handleAmountUp={handleAmountUp} amount={amount} />
      <ProductAddButton product={product} total={total} buttonText={buttonText} />
    </View>
  );
};

export default ProductAdd;
