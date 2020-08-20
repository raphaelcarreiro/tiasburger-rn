import React from 'react';
import Button from '../../bases/button/Button';
import { StyleSheet } from 'react-native';
import Typography from '../../bases/typography/Text';
import { useCart } from '../cartContext';
import { CartProduct } from '../../../@types/cart';

type ProductUpdateProps = {
  total: string | number;
  product: CartProduct;
  amount: number;
};

const styles = StyleSheet.create({
  addButton: {
    minWidth: 190,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

const ProductUpdate: React.FC<ProductUpdateProps> = ({ total, product, amount }) => {
  const { handleUpdateCartProduct, handleSelectProduct } = useCart();

  function handleConfirm() {
    if (!product.ready) return;
    handleUpdateCartProduct(product, amount);
    handleSelectProduct(null); // close modal
  }

  return (
    <Button
      disabled={!product.ready}
      variant="contained"
      color="primary"
      style={styles.addButton}
      onPress={handleConfirm}
    >
      <Typography bold>
        <Typography>Alterar </Typography>
        {total}
      </Typography>
    </Button>
  );
};

export default ProductUpdate;
