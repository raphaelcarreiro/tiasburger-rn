import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ComplementCategory, Complement } from '../../../../@types/product';
import ListItem from '../../../../components/list-item/ListItem';
import Typography from '../../../../components/bases/typography/Text';
import { useTheme } from 'styled-components';
import ProductComplements from './ProductComplements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductPizzaSearchBox from './ProductPizzaSearchBox';
import { useProductPizza } from '../hooks/useProductPizza';

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
  categoryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'flex-end',
  },
  buttonSearch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

const ProductComplementCateogories: React.FC = () => {
  const theme = useTheme();
  const [searchOpened, setSearchOpened] = useState(false);
  const { product, handleClickPizzaComplements, complementSizeSelected, handleSearch } = useProductPizza();

  return (
    <View style={styles.list}>
      {product?.complement_categories.map(category => (
        <View key={String(category.id)} style={styles.category}>
          {category.is_pizza_size ? (
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
          ) : category.is_pizza_taste ? (
            <ListItem style={styles.listItem}>
              {searchOpened ? (
                <ProductPizzaSearchBox
                  closeSearchBox={() => setSearchOpened(false)}
                  categoryId={category.id}
                  handleSearch={handleSearch}
                />
              ) : (
                <>
                  <View>
                    <Typography bold size={20}>
                      {category.name}
                    </Typography>
                    {complementSizeSelected.taste_amount === 1 ? (
                      <Typography size={14} variant="caption">
                        Escolha 1 opção.
                      </Typography>
                    ) : complementSizeSelected.id ? (
                      <Typography size={14} variant="caption">
                        Escolha até {complementSizeSelected.taste_amount} opções.
                      </Typography>
                    ) : (
                      <Typography color="primary">Selecione o tamanho</Typography>
                    )}
                  </View>
                  <View style={styles.categoryAction}>
                    {complementSizeSelected.id && (
                      <TouchableOpacity style={styles.buttonSearch} onPress={() => setSearchOpened(true)}>
                        <Icon name="search" size={30} />
                      </TouchableOpacity>
                    )}
                    {category.is_required && (
                      <View style={[styles.required, { backgroundColor: theme.primary }]}>
                        <Typography bold color="contrast" size={10}>
                          Obrigatório
                        </Typography>
                      </View>
                    )}
                  </View>
                </>
              )}
            </ListItem>
          ) : (
            <ListItem style={styles.listItem}>
              <View>
                <Typography bold size={20}>
                  {category.name}
                </Typography>
                {category.max_quantity === 1 && complementSizeSelected.id ? (
                  <Typography size={14} variant="caption">
                    Escolha 1 opção.
                  </Typography>
                ) : complementSizeSelected.id ? (
                  <Typography variant="caption">Escolha até {category.max_quantity} opções.</Typography>
                ) : (
                  <Typography color="primary">Selecione o tamanho</Typography>
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
          )}
          {(category.is_pizza_size || complementSizeSelected.id) && <ProductComplements category={category} />}
        </View>
      ))}
    </View>
  );
};

export default ProductComplementCateogories;
