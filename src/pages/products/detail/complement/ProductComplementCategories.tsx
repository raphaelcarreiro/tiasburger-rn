import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ComplementCategory } from '../../../../@types/product';
import ListItem from '../../../../components/list-item/ListItem';
import Typography from '../../../../components/bases/typography/Text';
import { useTheme } from 'styled-components';
import ProductComplements from './ProductComplements';

type ProductComplementCategoriesProps = {
  complementCategories: ComplementCategory[];
  handleComplementClick(productId: number, complementCategoryId: number, complementId: number): void;
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 55,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 0,
    backgroundColor: '#f8f8f8',
  },
  required: {
    borderRadius: 4,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  category: {
    marginBottom: 10,
  },
});

const ProductComplementCateogories: React.FC<ProductComplementCategoriesProps> = ({
  complementCategories,
  handleComplementClick,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.list}>
      {complementCategories.map(category => (
        <View key={String(category.id)} style={styles.category}>
          <ListItem style={styles.listItem}>
            <View>
              <Typography bold size={20}>
                {category.name}
              </Typography>
              {category.max_quantity === 1 ? (
                <Typography size={14} variant="caption">
                  Escolha 1 opção.
                </Typography>
              ) : (
                <Typography size={14} variant="caption">
                  Escolha até {category.max_quantity} opções.
                </Typography>
              )}
            </View>
            {category.is_required && (
              <View style={[styles.required, { backgroundColor: theme.primary }]}>
                <Typography bold color="contrast" size={10}>
                  Obrigatório
                </Typography>
              </View>
            )}
          </ListItem>
          <ProductComplements
            complements={category.complements}
            handleComplementClick={handleComplementClick}
            complementCategoryId={category.id}
          />
        </View>
      ))}
    </View>
  );
};

export default ProductComplementCateogories;
