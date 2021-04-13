import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Product } from '../../@types/product';
import AppBar from '../../components/appbar/Appbar';
import ProductItem from './ProductItem';
import { ProductContext } from './useProducts';
import ProductSimple from './detail/simple/ProductSimple';
import { useDispatch } from 'react-redux';
import ProductComplement from './detail/complement/ProductComplement';
import ProductPizza from './detail/pizza/ProductPizza';
import { prepareProduct, addToCart } from '../../store/modules/cart/actions';
import ProductActions from './ProductActions';
import Typography from '../../components/bases/typography/Text';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../routes/Routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    padding: 15,
  },
  flatListEmpty: {
    flex: 1,
  },
});

type ProductsProps = {
  products: Product[];
  refresh(): void;
  loading: boolean;
  title: string;
  isOffer?: boolean;
};

const ProductList: React.FC<ProductsProps> = ({ products, refresh, loading, title, isOffer = false }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

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

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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

  function handleOpenSearchBox() {
    setIsSearching(true);
  }

  function handleCloseSearchBox() {
    handleSearch('');
    setIsSearching(false);
  }

  function handleSearch(value: string) {
    const _products = products.filter(product => {
      const productName = product.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return productName.indexOf(value.toLowerCase()) !== -1;
    });

    setFilteredProducts(_products);
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
      {isSimple && <ProductSimple />}
      {isComplement && <ProductComplement />}
      {isPizza && <ProductPizza />}

      <AppBar
        actions={
          <ProductActions
            openSearchBox={handleOpenSearchBox}
            isSearching={isSearching}
            handleSearch={handleSearch}
            loading={loading}
          />
        }
        title={isSearching ? undefined : title}
        showBackAction={!isOffer || isSearching}
        backAction={() => (isSearching ? handleCloseSearchBox() : navigation.navigate('Menu'))}
      />

      <View style={styles.container}>
        <FlatList
          contentContainerStyle={filteredProducts.length === 0 ? styles.flatListEmpty : styles.flatList}
          keyboardShouldPersistTaps="handled"
          data={filteredProducts}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: product }) => <ProductItem product={product} />}
          onRefresh={refresh}
          refreshing={loading}
          ListEmptyComponent={
            <View style={styles.empty}>
              {!loading && (
                <Typography variant="caption" size={20}>
                  nenhum produto
                </Typography>
              )}
            </View>
          }
        />
      </View>
    </ProductContext.Provider>
  );
};

export default ProductList;
