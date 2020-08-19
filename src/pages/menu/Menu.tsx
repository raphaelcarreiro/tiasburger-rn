import React, { useEffect, useState, useCallback } from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import api, { getCancelTokenSource } from '../../services/api';
import { Category } from '../../@types/category';
import { FlatList, StyleSheet } from 'react-native';
import CategoryList from './categories/CategoryList';
import MenuActions from './categories/MenuActions';

const styles = StyleSheet.create({
  flatList: {
    padding: 15,
  },
});

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setProductsAmount] = useState(0);

  const refresh = useCallback(() => {
    let request = true;
    const source = getCancelTokenSource();

    api
      .get('/categories', { cancelToken: source.token })
      .then(response => {
        setProductsAmount(
          response.data.reduce((sum: number, category: Category) => sum + category.available_products_amount, 0),
        );
        if (request) setCategories(response.data);
      })
      .catch(err => {
        if (err.response) console.log(err.response.data.error);
      })
      .finally(() => {
        if (request) setLoading(false);
        request = false;
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <>
      <AppBar title="Cardápio" actions={<MenuActions />} />
      <Container>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={categories}
          keyExtractor={category => String(category.id)}
          renderItem={({ item: category }) => <CategoryList category={category} />}
          onRefresh={refresh}
          refreshing={loading}
        />
      </Container>
    </>
  );
};

export default Menu;
