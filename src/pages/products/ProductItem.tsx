import React from 'react';
import { StyleSheet, Alert, View, Image } from 'react-native';
import ListItem from '../../components/list-item/ListItem';
import { Product } from '../../@types/product';
import Text from '../../components/bases/typography/Text';

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  price: {
    marginTop: 7,
  },
  hasComplement: {
    marginTop: 7,
  },
});

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  function handlePress() {
    Alert.alert('Pressed', 'It was pressed');
  }
  return (
    <ListItem style={styles.listItem} onPress={handlePress}>
      <View>
        <Text size={22}>{product.name}</Text>
        <Text size={14} variant="caption">
          {product.name}
        </Text>
        {product.price > 0 && (
          <Text style={styles.price} color="primary" size={20}>
            {product.formattedPrice}
          </Text>
        )}
        {product.category.has_complement && (
          <Text style={styles.hasComplement} color="primary">
            Monte esse produto
          </Text>
        )}
      </View>
      {product.image && <Image source={{ uri: product.image.imageUrl }} style={styles.image} />}
    </ListItem>
  );
};

export default ProductItem;
