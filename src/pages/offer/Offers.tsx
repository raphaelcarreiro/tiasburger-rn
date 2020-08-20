import React, { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import { Product } from '../../@types/product';
import { RootDrawerParamList } from '../../routes/Routes';
import { moneyFormat } from '../../helpers/numberFormat';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import ProductList from '../products/ProductList';

type ProductsProps = {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
};

const Offers: React.FC<ProductsProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    api
      .get('/products')
      .then(response => {
        let _products: Product[] = response.data;
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
  }, []);

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
    refresh();
  }, [refresh]);

  return (
    <>
      <ProductList title="Ofertas" products={products} refresh={refresh} loading={loading} />
    </>
  );
};

export default Offers;
