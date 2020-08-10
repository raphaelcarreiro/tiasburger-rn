import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import api from '../../services/api';
import { Product } from '../../@types/product';
import AppBar from '../../components/appbar/Appbar';
import InsideLoading from '../../components/loading/InsideLoading';
import { RootStackParamList } from '../../routes/Routes';
import ProductItem from './ProductItem';
import { moneyFormat } from '../../helpers/numberFormat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56,
    padding: 15,
  },
});

type ProductsScreenRouteProp = RouteProp<RootStackParamList, 'Products'>;

type ProductsProps = {
  route: ProductsScreenRouteProp;
  navigation: NavigationProp<RootStackParamList>;
};

const Products: React.FC<ProductsProps> = ({ route, navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    api
      .get(`/categories/${route.params.categoryName}`)
      .then(response => {
        const _products: Product[] = response.data.products;
        setProducts(
          _products.map(product => {
            return {
              ...product,
              formattedPrice: moneyFormat(product.price),
            };
          }),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [route]);

  useEffect(() => {
    navigation.addListener('blur', () => {
      setProducts([]);
      setLoading(true);
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params) refresh();
  }, [route, refresh]);

  return (
    <>
      <AppBar title={route.params.categoryName} showBackAction backAction={() => navigation.navigate('Menu')} />
      {loading ? (
        <InsideLoading />
      ) : (
        <View style={styles.container}>
          {products.length > 0 && (
            <FlatList
              data={products}
              keyExtractor={item => String(item.id)}
              renderItem={({ item: product }) => <ProductItem product={product} />}
              onRefresh={refresh}
              refreshing={loading}
            />
          )}
        </View>
      )}
    </>
  );
};

export default Products;
