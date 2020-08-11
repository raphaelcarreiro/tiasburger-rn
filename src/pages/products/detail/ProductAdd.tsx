import React from 'react';
import { Product } from '../../../@types/product';
import Button from '../../../components/bases/button/Button';
import { StyleSheet } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import { useProduct } from '../productContext';

type ProductAddProps = {
  total: string | number;
  product: Product;
};

const styles = StyleSheet.create({
  addButton: {
    minWidth: 190,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

const ProductAdd: React.FC<ProductAddProps> = ({ total, product }) => {
  const { handleAddProductToCart } = useProduct();

  function handleConfirm() {
    if (!product.ready) return;
    handleAddProductToCart();
  }

  return (
    <Button variant="contained" color="primary" style={styles.addButton} onPress={handleConfirm}>
      <Typography bold>
        <Typography>Adicionar </Typography>
        {total}
      </Typography>
    </Button>
  );
};

export default ProductAdd;
