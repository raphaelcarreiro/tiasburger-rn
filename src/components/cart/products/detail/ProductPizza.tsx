import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useMessage } from '../../../../hooks/message';
import { moneyFormat } from '../../../../helpers/numberFormat';
import Modal from '../../../modal/Modal';
import { useSelector } from '../../../../store/selector';
import { useCart } from '../../cartContext';
import ProductUpdate from './ProductUpdate';
import { CartProduct } from '../../../../@types/cart';
import { calculatePizzaProductComplementPrice } from '../../../../pages/products/detail/pizza/calculatePizzaProductComplementsPrice';
import { handleSelectPizzaProductComplement } from '../../../../pages/products/detail/pizza/handleSelectPizzaProductComplement';
import { handleSearchComplement } from '../../../../pages/products/detail/pizza/handleSearchComplement';
import ProductPizzaDetail from '../../../../pages/products/detail/pizza/ProductPìzzaDetail';
import { Complement } from '../../../../@types/product';
import { ProductPizzaProvider } from '../../../../pages/products/detail/hooks/useProductPizza';

const styles = StyleSheet.create({
  footerActions: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    width: '100%',
    height: 175,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 20,
    marginTop: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 175,
  },
  inputContainer: {
    marginTop: 20,
  },
  productData: {
    alignItems: 'center',
  },
  oldPrice: {
    color: '#888',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  modal: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  scroll: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 70,
  },
});

const ProductPizza: React.FC = () => {
  const messaging = useMessage();
  const restaurant = useSelector(state => state.restaurant);
  const { selectedProduct, isPizza, handleSelectProduct } = useCart();
  const [amount, setAmount] = useState(selectedProduct?.amount || 0);
  const [product, setProduct] = useState<CartProduct | null>(JSON.parse(JSON.stringify(selectedProduct)));
  const [filteredProduct, setFilteredProduct] = useState<CartProduct | null>(product);
  const [complementsPrice, setComplementsPrice] = useState(0);
  const [complementIdSelected, setComplementIdSelected] = useState<null | number>(null);
  const [complementCategoryIdSelected, setComplementCategoryIdSelected] = useState<null | number>(null);
  const [searchedCategoryId, setSearchedCategoryId] = useState<null | number>(null);
  const [searchedValue, setSearchedValue] = useState('');

  const categoryComplementSize = useMemo(
    () => product?.complement_categories.find(category => category.is_pizza_size),
    [product],
  );

  const complementSizeSelected = useMemo(() => {
    const _complement = categoryComplementSize?.complements.find(complement => complement.selected);
    if (!_complement) return {} as Complement;
    return _complement;
  }, [categoryComplementSize]);

  const formattedTotal = useMemo(() => {
    if (!product) return moneyFormat(0);
    const total = (complementsPrice + product.product_price) * amount;
    return moneyFormat(total);
  }, [amount, complementsPrice, product]);

  const handleSearch = useCallback(
    (categoryId, searchValue) => {
      if (!product) return;

      setSearchedValue(searchValue);

      if (searchValue === '') {
        setFilteredProduct(product);
        setSearchedCategoryId(null);
        return;
      }

      setSearchedCategoryId(categoryId);

      const newProduct = handleSearchComplement(product, searchValue, categoryId);

      setFilteredProduct(newProduct);
    },
    [product],
  );

  useEffect(() => {
    if (!restaurant) return;
    if (!product) return;

    const price = calculatePizzaProductComplementPrice(product, restaurant);

    setComplementsPrice(price);
  }, [product, restaurant]);

  useEffect(() => {
    setFilteredProduct(product);
  }, [product]);

  useEffect(() => {
    handleSearch(searchedCategoryId, searchedValue);
  }, [handleSearch, searchedCategoryId, searchedValue]);

  function handleAmountUp() {
    if (!product?.ready) {
      messaging.handleOpen('Você precisa selecionar os itens obrigatórios');
      return;
    }
    setAmount(amount + 1);
  }

  function handleAmountDown() {
    if (!product?.ready) {
      messaging.handleOpen('Você precisa selecionar os itens obrigatórios');
      return;
    }
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }

  function handleClickPizzaComplements(complementCategoryId: number, complementId: number) {
    if (!product) return;

    try {
      const { newProduct } = handleSelectPizzaProductComplement(product, complementCategoryId, complementId);

      setProduct(newProduct);
      handleSearch(searchedCategoryId, searchedValue);
    } catch (err) {
      messaging.handleOpen(err.message);
    }
  }

  const productPizzaContextValue = {
    product,
    setProduct,
    filteredProduct,
    handleClickPizzaComplements,
    setComplementCategoryIdSelected,
    setComplementIdSelected,
    complementCategoryIdSelected,
    complementIdSelected,
    complementSizeSelected,
    handleSearch,
  };

  return (
    <Modal open={isPizza} title="alterar produto" handleClose={() => handleSelectProduct(null)} style={styles.modal}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ProductPizzaProvider value={productPizzaContextValue}>
          <ProductPizzaDetail />
        </ProductPizzaProvider>
      </ScrollView>
      {product && (
        <ProductUpdate
          product={product}
          total={formattedTotal}
          handleAmountDown={handleAmountDown}
          handleAmountUp={handleAmountUp}
          amount={amount}
        />
      )}
    </Modal>
  );
};

export default ProductPizza;
