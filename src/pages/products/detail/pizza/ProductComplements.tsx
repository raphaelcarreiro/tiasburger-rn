import React from 'react';
import { Complement } from '../../../../@types/product';
import { View, StyleSheet, Image } from 'react-native';
import Typography from '../../../../components/bases/typography/Text';
import { useProduct } from '../../productContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { ListItemStyled } from '../style';

type ProductComplementsProps = {
  complements: Complement[];
  complementCategoryId: number;
  isPizzaTaste: boolean;
  handleComplementClick(productId: number, complementCategoryId: number, complementId: number): void;
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 0,
    elevation: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 26,
    width: 26,
    borderRadius: 13,
    position: 'absolute',
    right: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 30,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  productData: {
    flex: 1,
  },
});

const ProductComplements: React.FC<ProductComplementsProps> = ({
  complements,
  handleComplementClick,
  complementCategoryId,
  isPizzaTaste,
}) => {
  const { selectedProduct } = useProduct();
  const theme = useTheme();

  function handleClick(complementId: number) {
    if (!selectedProduct) return;

    handleComplementClick(selectedProduct.id, complementCategoryId, complementId);
  }
  return (
    <>
      {complements.map(complement => (
        <ListItemStyled
          selected={complement.selected}
          key={String(complement.id)}
          style={styles.listItem}
          onPress={() => handleClick(complement.id)}
        >
          {complement.image && (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: complement.image.thumbImageUlr ? complement.image.thumbImageUlr : complement.image.imageUrl,
                }}
              />
            </View>
          )}
          <View style={styles.productData}>
            <Typography>{complement.name}</Typography>
            {complement.description && (
              <Typography size={14} variant="caption" gutterBottom>
                {complement.description}
              </Typography>
            )}
            {complement.prices.map(
              price =>
                price.selected &&
                !!price.price && (
                  <Typography key={String(price.id)} bold color="primary">
                    {!isPizzaTaste && '+ '}
                    {price.formattedPrice}
                  </Typography>
                ),
            )}
          </View>
          {complement.selected && (
            <View style={styles.iconContainer}>
              <Icon name="check-circle" color={theme.primary} size={26} />
            </View>
          )}
        </ListItemStyled>
      ))}
    </>
  );
};

export default ProductComplements;
