import React from 'react';
import { Complement } from '../../../../@types/product';
import { View, StyleSheet } from 'react-native';
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
  },
  icon: {
    height: 26,
    width: 26,
    borderRadius: 15,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 10,
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
          <View>
            <Typography>{complement.name}</Typography>
            <Typography size={14} variant="caption" gutterBottom>
              {complement.description}
            </Typography>
            {complement.prices.map(
              price =>
                price.selected &&
                !!price.price && (
                  <Typography key={String(price.id)} bold color="primary">
                    {!isPizzaTaste && '+'} {price.formattedPrice}
                  </Typography>
                ),
            )}
          </View>
          {complement.selected && <Icon name="check-circle" style={styles.icon} color={theme.primary} size={26} />}
        </ListItemStyled>
      ))}
    </>
  );
};

export default ProductComplements;
