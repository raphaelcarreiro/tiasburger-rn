import React from 'react';
import { CartProduct } from '../../@types/cart';
import ListItem from '../../components/list-item/ListItem';
import Typography from '../../components/bases/typography/Text';
import { StyleSheet, View, Image } from 'react-native';
import Button from '../../components/bases/button/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/modules/cart/actions';

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
    maxWidth: 200,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});

type CartItemProps = {
  product: CartProduct;
};

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const dispatch = useDispatch();

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
        <Typography size={24}>{product.formattedPrice}</Typography>
      </View>
      <View style={styles.actions}>
        <Button color="primary" variant="text" onPress={() => handleDeleteClick(product.uid)}>
          Excluir
        </Button>
        <Button variant="text" onPress={() => handleDeleteClick(product.uid)}>
          Alterar
        </Button>
      </View>
    </ListItem>
  );
};

export default CartItem;
