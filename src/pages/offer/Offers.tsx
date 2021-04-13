import React, { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import { Product } from '../../@types/product';
import { moneyFormat } from '../../helpers/numberFormat';
import ProductList from '../products/ProductList';

const Offers: React.FC = () => {
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
    refresh();
  }, [refresh]);

  return (
    <>
      <ProductList isOffer title="ofertas" products={products} refresh={refresh} loading={loading} />
    </>
  );
};

export default Offers;
