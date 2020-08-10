import React, { useEffect, useState, useCallback } from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import { useMessage } from '../../hooks/message';
import api, { getCancelTokenSource } from '../../services/api';
import { Category } from '../../@types/category';
import { FlatList } from 'react-native';
import CategoryList from './categories/CategoryList';

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const messaging = useMessage();
  const [productsAmount, setProductsAmount] = useState(0);

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
        if (err.response) messaging.handleOpen(err.response.data.error);
      })
      .finally(() => {
        if (request) setLoading(false);
        request = false;
      });
  }, [messaging]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <>
      <AppBar title="Cardápio" />
      <Container>
        <FlatList
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
