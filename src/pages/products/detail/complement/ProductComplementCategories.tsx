import React from 'react';
import { StyleSheet, View } from 'react-native';
import ListItem from '../../../../components/list-item/ListItem';
import Typography from '../../../../components/bases/typography/Text';
import { useTheme } from 'styled-components';
import ProductComplements from './ProductComplements';
import { useProductComplement } from '../hooks/useProductComplement';

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
    borderRadius: 0,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  category: {
    marginBottom: 10,
  },
});

const ProductComplementCategories: React.FC = () => {
  const theme = useTheme();
  const { product } = useProductComplement();

  return (
    <View style={styles.list}>
      {product?.complement_categories.map(category => (
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
          <ProductComplements category={category} />
        </View>
      ))}
    </View>
  );
};

export default ProductComplementCategories;
