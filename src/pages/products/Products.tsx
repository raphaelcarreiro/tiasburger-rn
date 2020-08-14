import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import api from '../../services/api';
import { Product } from '../../@types/product';
import AppBar from '../../components/appbar/Appbar';
import InsideLoading from '../../components/loading/InsideLoading';
import { RootStackParamList } from '../../routes/Routes';
import ProductItem from './ProductItem';
import { moneyFormat } from '../../helpers/numberFormat';
import { ProductContext } from './productContext';
import ProductSimple from './detail/simple/ProductSimple';
import { useDispatch } from 'react-redux';
import ProductComplement from './detail/complement/ProductComplement';
import ProductPizza from './detail/pizza/ProductPizza';
import { prepareProduct, addToCart } from '../../store/modules/cart/actions';
import ProductActions from './ProductActions';

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const isPizza = useMemo(() => {
    return !!selectedProduct?.category.is_pizza;
  }, [selectedProduct]);

  const isComplement = useMemo(() => {
    return !!selectedProduct?.category.has_complement && !selectedProduct?.category.is_pizza;
  }, [selectedProduct]);

  const isSimple = useMemo(() => {
    return selectedProduct ? !selectedProduct.category.has_complement : false;
  }, [selectedProduct]);

  const refresh = useCallback(() => {
    api
      .get(`/categories/${route.params.url}`)
      .then(response => {
        const p: Product[] = response.data.products;
        setProducts(
          p.map(product => {
            return {
              ...product,
              formattedPrice: moneyFormat(product.price),
              formattedSpecialPrice: moneyFormat(product.special_price),
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

  const handleSelectProduct = useCallback((product: Product | null) => {
    setSelectedProduct(product);
  }, []);

  const handleAddProductToCart = useCallback(() => {
    dispatch(addToCart());
    console.log('Added');
  }, [dispatch]);

  const handlePrepareProduct = useCallback(
    (product: Product, amount = 1) => {
      dispatch(prepareProduct(product, amount));
      console.log('Prepared');
    },
    [dispatch],
  );

  function handleOpenSearchBox() {
    //
  }

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
      <ProductSimple />
      <ProductComplement />
      <ProductPizza />

      <AppBar
        actions={<ProductActions openSearchBox={handleOpenSearchBox} />}
        title={route.params.categoryName}
        showBackAction
        backAction={() => navigation.navigate('Menu')}
      />
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
    </ProductContext.Provider>
  );
};

export default Products;
