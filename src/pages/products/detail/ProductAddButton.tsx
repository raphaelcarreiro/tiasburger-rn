import React from 'react';
import { Product } from '../../../@types/product';
import Button from '../../../components/bases/button/Button';
import { StyleSheet } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import { useProducts } from '../useProducts';
import { useNavigation } from '@react-navigation/native';
import { RootDrawerParamList } from '../../../routes/Routes';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type ProductAddButtonProps = {
  total: string | number;
  product: Product;
  buttonText: string;
};

const styles = StyleSheet.create({
  addButton: {
    minWidth: 190,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

const ProductAddButton: React.FC<ProductAddButtonProps> = ({ total, product, buttonText }) => {
  const { handleAddProductToCart, handleSelectProduct } = useProducts();
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  function handleConfirm() {
    if (!product.ready) return;
    handleAddProductToCart();
    handleSelectProduct(null); // close modal
    navigation.navigate('Cart');
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
        <Typography>{buttonText} </Typography>
        {total}
      </Typography>
    </Button>
  );
};

export default ProductAddButton;
