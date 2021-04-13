import React from 'react';
import { CartProduct } from '../../../@types/cart';
import ListItem from '../../list-item/ListItem';
import Typography from '../../bases/typography/Text';
import { StyleSheet, View, Image } from 'react-native';
import Button from '../../bases/button/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../store/modules/cart/actions';
import CartItemComplements from './CartItemComplements';
import CartItemIngredients from './CartItemIngredients';
import CartItemAdditional from './CartItemAdditional';
import { useCart } from '../cartContext';

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.7,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  promotion: {
    paddingLeft: 5,
  },
});

type CartItemProps = {
  product: CartProduct;
};

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useCart();

  function handleUpdatePress(product: CartProduct) {
    cart.handleSelectProduct(product);
  }

  function handleDeleteClick(productUid: number) {
    dispatch(removeFromCart(productUid));
  }
  return (
    <ListItem style={styles.listItem}>
      <View style={styles.row}>
        <View style={styles.col}>
          <View style={styles.imageContainer}>
            {product.image && <Image style={styles.image} source={{ uri: product.image.imageUrl }} />}
          </View>
          <Typography size={20}>
            {product.amount}x {product.name}
          </Typography>
        </View>
        <Typography size={24}>{product.formattedFinalPrice}</Typography>
      </View>
      <CartItemIngredients ingredients={product.ingredients} />
      <CartItemAdditional additional={product.additional} />
      <View style={styles.promotion}>
        {product.promotion && (
          <>
            <Typography variant="caption" size={12}>
              Você ganhou esse produto!
            </Typography>
            <Typography variant="caption" size={12}>
              Promoção {product.promotion.name}
            </Typography>
          </>
        )}
      </View>
      {product.complement_categories.length > 0 && (
        <CartItemComplements complementCategories={product.complement_categories} />
      )}
      <View style={styles.actions}>
        <Button disablePadding color="primary" variant="text" onPress={() => handleUpdatePress(product)}>
          Alterar
        </Button>
        <Button variant="text" onPress={() => handleDeleteClick(product.uid)}>
          Excluir
        </Button>
      </View>
    </ListItem>
  );
};

export default CartItem;
