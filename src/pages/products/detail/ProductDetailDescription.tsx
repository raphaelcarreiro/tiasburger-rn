import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'styled-components';
import { Product } from '../../../@types/product';
import Text from '../../../components/bases/typography/Text';

const styles = StyleSheet.create({
  productData: {
    alignItems: 'center',
  },
  oldPrice: {
    color: '#888',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginRight: 15,
  },
  prices: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

type ProductDetailDescriptionProps = {
  product: Product;
};

const ProductDetailDescription: React.FC<ProductDetailDescriptionProps> = ({ product }) => {
  const theme = useTheme();
  return (
    <View style={styles.productData}>
      <Text align="center" size={24}>
        {product.name}
      </Text>
      <Text variant="caption" align="center" gutterBottom>
        {product.description}
      </Text>
      <View style={styles.prices}>
        <Text
          align="center"
          size={product.special_price ? 16 : 20}
          style={product.promotion_activated ? styles.oldPrice : { color: theme.primary }}
        >
          {product.formattedPrice}
        </Text>
        {product.promotion_activated && (
          <Text align="center" color="primary" size={20}>
            {product.formattedSpecialPrice}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProductDetailDescription;
