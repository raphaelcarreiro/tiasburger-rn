import React from 'react';
import Typography from '../../../components/bases/typography/Text';
import { Image, StyleSheet, View } from 'react-native';
import { ListItem } from '../styles';
import { Product } from '../../../@types/product';
import { useProducts } from '../../products/useProducts';

const styles = StyleSheet.create({
  container: {
    width: 200,
    position: 'relative',
    backgroundColor: '#fff',
    shadowColor: '#666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
  description: {
    marginTop: 15,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    borderStyle: 'solid',
    padding: 10,
  },
  price: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
});

type OfferItemProps = {
  product: Product;
};

const OfferItem: React.FC<OfferItemProps> = ({ product }) => {
  const { handleSelectProduct } = useProducts();

  return (
    <ListItem style={styles.container} onPress={() => handleSelectProduct(product)}>
      <Image style={styles.image} source={{ uri: product.image?.imageUrl }} />
      <View style={styles.description}>
        <View style={styles.price}>
          <Typography style={styles.oldPrice}>{product.formattedPrice}</Typography>
          <Typography size={20} color="primary">
            {product.formattedSpecialPrice}
          </Typography>
        </View>
        <Typography>{product.name}</Typography>
      </View>
    </ListItem>
  );
};

export default OfferItem;
