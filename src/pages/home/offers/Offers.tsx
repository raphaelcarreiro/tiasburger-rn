import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import OfferList from './OfferList';
import api from '../../../services/api';
import { Product } from '../../../@types/product';
import { moneyFormat } from '../../../helpers/numberFormat';
import { useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../routes/Routes';
import { useDispatch } from 'react-redux';
import { addToCart, prepareProduct } from '../../../store/modules/cart/actions';
import { ProductContext } from '../../products/useProducts';
import ProductSimple from '../../products/detail/simple/ProductSimple';
import ProductComplement from '../../products/detail/complement/ProductComplement';
import ProductPizza from '../../products/detail/pizza/ProductPizza';

const styles = StyleSheet.create({
  promotions: {
    marginTop: 20,
  },
  header: {
    marginLeft: 15,
    marginBottom: 10,
  },
});

const Offers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get<Product[]>('/products')
      .then(response => {
        setProducts(
          response.data.map(product => ({
            ...product,
            formattedPrice: moneyFormat(product.price),
            formattedSpecialPrice: moneyFormat(product.special_price),
          })),
        );
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const isPizza = useMemo(() => {
    return !!selectedProduct?.category.is_pizza;
  }, [selectedProduct]);

  const isComplement = useMemo(() => {
    return !!selectedProduct?.category.has_complement && !selectedProduct?.category.is_pizza;
  }, [selectedProduct]);

  const isSimple = useMemo(() => {
    return selectedProduct ? !selectedProduct.category.has_complement : false;
  }, [selectedProduct]);

  const handleSelectProduct = useCallback((product: Product | null) => {
    setSelectedProduct(product);
  }, []);

  const handleAddProductToCart = useCallback(() => {
    dispatch(addToCart());
  }, [dispatch]);

  const handlePrepareProduct = useCallback(
    (product: Product, amount = 1) => {
      dispatch(prepareProduct(product, amount));
    },
    [dispatch],
  );

  if (!products.length) return <Fragment />;

  return (
    <ProductContext.Provider
      value={{
        handleSelectProduct,
        selectedProduct,
        handleAddProductToCart,
        handlePrepareProduct,
        isPizza,
        isComplement,
        isSimple,
      }}
    >
      {isSimple && <ProductSimple />}
      {isComplement && <ProductComplement />}
      {isPizza && <ProductPizza />}

      <View style={styles.promotions}>
        <View style={styles.header}>
          <Typography size={24} gutterBottom>
            ofertas
          </Typography>
        </View>
        <OfferList products={products} />
      </View>
    </ProductContext.Provider>
  );
};

export default Offers;
