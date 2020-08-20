import React, { useEffect, useState, useCallback } from 'react';
import { RouteProp } from '@react-navigation/native';
import api from '../../services/api';
import { Product } from '../../@types/product';
import { RootDrawerParamList } from '../../routes/Routes';
import { moneyFormat } from '../../helpers/numberFormat';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import ProductList from './ProductList';

type ProductsScreenRouteProp = RouteProp<RootDrawerParamList, 'Products'>;

type ProductsProps = {
  route: ProductsScreenRouteProp;
  navigation: DrawerNavigationProp<RootDrawerParamList>;
};

const NewProducts: React.FC<ProductsProps> = ({ route, navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    api
      .get(`/categories/${route.params.url}`)
      .then(response => {
        let _products: Product[] = response.data.products;
        _products = _products.map(product => {
          return {
            ...product,
            formattedPrice: moneyFormat(product.price),
            formattedSpecialPrice: moneyFormat(product.special_price),
          };
        });
        setProducts(_products);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [route]);

  useEffect(() => {
    const onBlur = () => {
      // console.log('product cleaned');
    };
    navigation.addListener('blur', onBlur);

    return () => {
      navigation.removeListener('blur', onBlur);
    };
  }, [navigation]);

  useEffect(() => {
    if (route.params) refresh();
  }, [route, refresh]);

  return (
    <>
      <ProductList title={route.params.categoryName} products={products} refresh={refresh} loading={loading} />
    </>
  );
};

export default NewProducts;
