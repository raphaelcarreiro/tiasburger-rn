import React from 'react';
import { Complement } from '../../../../@types/product';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../bases/typography/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { ListItemStyled } from '../style';
import { useCart } from '../../cartContext';

type ProductComplementsProps = {
  complements: Complement[];
  complementCategoryId: number;
  handleComplementClick(productId: number, complementCategoryId: number, complementId: number): void;
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 0,
    elevation: 0,
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
});

const ProductComplements: React.FC<ProductComplementsProps> = ({
  complements,
  handleComplementClick,
  complementCategoryId,
}) => {
  const { selectedProduct } = useCart();
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
          <View>
            <Typography>{complement.name}</Typography>
            <Typography size={14} variant="caption">
              {complement.description}
            </Typography>
            {complement.price && (
              <Typography bold color="primary">
                + {complement.formattedPrice}
              </Typography>
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
