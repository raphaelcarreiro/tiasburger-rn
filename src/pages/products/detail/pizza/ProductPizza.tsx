import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useMessage } from '../../../../hooks/message';
import { useProducts } from '../../useProducts';
import { moneyFormat } from '../../../../helpers/numberFormat';
import { Complement, Product } from '../../../../@types/product';
import Modal from '../../../../components/modal/Modal';
import InsideLoading from '../../../../components/loading/InsideLoading';
import ProductAdd from '../ProductAdd';
import { useSelector } from '../../../../store/selector';
import { handleSearchComplement } from './handleSearchComplement';
import { fetchPizzaProduct } from './fetchPizzaProduct';
import { calculatePizzaProductComplementPrice } from './calculatePizzaProductComplementsPrice';
import { handleSelectPizzaProductComplement } from './handleSelectPizzaProductComplement';
import { ProductPizzaProvider } from '../hooks/useProductPizza';
import ProductPizzaDetail from './ProductPìzzaDetail';

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
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [filteredProduct, setFilteredProduct] = useState<Product | null>(null);
  const [complementsPrice, setComplementsPrice] = useState(0);
  const [complementIdSelected, setComplementIdSelected] = useState<number | null>(null);
  const [complementCategoryIdSelected, setComplementCategoryIdSelected] = useState<number | null>(null);
  const [complementSizeSelected, setComplementSizeSelected] = useState<Complement>({} as Complement);
  const messaging = useMessage();
  const restaurant = useSelector(state => state.restaurant);
  const [searchedCategoryId, setSearchedCategoryId] = useState<null | number>(null);
  const [searchedValue, setSearchedValue] = useState('');
  const [loading, setLoading] = useState(true);
  const { handlePrepareProduct, selectedProduct, handleSelectProduct, isPizza } = useProducts();

  const formattedTotal = useMemo(() => {
    if (!product) return moneyFormat(0);
    const total = (complementsPrice + product.price) * amount;
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
    if (!selectedProduct) return;
    fetchPizzaProduct(selectedProduct.id)
      .then(payload => {
        setProduct(payload.product);
        setComplementSizeSelected(payload.sizeSelected);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedProduct]);

  useEffect(() => {
    handleSearch(searchedCategoryId, searchedValue);
  }, [handleSearch, searchedCategoryId, searchedValue]);

  useEffect(() => {
    if (!product) return;
    handlePrepareProduct(product, amount);
  }, [amount, product, handlePrepareProduct]);

  useEffect(() => {
    if (!product || !restaurant) return;

    const _complementsPrice = calculatePizzaProductComplementPrice(product, restaurant);

    setComplementsPrice(_complementsPrice);
  }, [product, restaurant]);

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
      const { newProduct, sizeSelected } = handleSelectPizzaProductComplement(
        product,
        complementCategoryId,
        complementId,
      );

      setProduct(newProduct);
      handleSearch(searchedCategoryId, searchedValue);
      setComplementSizeSelected(sizeSelected);

      if (newProduct.ready) handlePrepareProduct(newProduct);
    } catch (err) {
      messaging.handleOpen(err.message);
    }
  }

  const productPizzaContextValue = {
    product,
    filteredProduct,
    setProduct,
    handleSearch,
    handleClickPizzaComplements,
    complementSizeSelected,
    setComplementCategoryIdSelected,
    setComplementIdSelected,
    complementCategoryIdSelected,
    complementIdSelected,
  };

  return (
    <Modal
      open={isPizza}
      title="adicionar ao carrinho"
      handleClose={() => handleSelectProduct(null)}
      style={styles.modal}
    >
      {loading ? (
        <InsideLoading />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            <ProductPizzaProvider value={productPizzaContextValue}>
              <ProductPizzaDetail />
            </ProductPizzaProvider>
          </ScrollView>
          {product && (
            <ProductAdd
              product={product}
              total={formattedTotal}
              handleAmountDown={handleAmountDown}
              handleAmountUp={handleAmountUp}
              amount={amount}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default ProductPizza;
