import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useMessage } from '../../../../hooks/message';
import { useProducts } from '../../useProducts';
import { moneyFormat } from '../../../../helpers/numberFormat';
import { Product } from '../../../../@types/product';
import Modal from '../../../../components/modal/Modal';
import InsideLoading from '../../../../components/loading/InsideLoading';
import ProductAdd from '../ProductAdd';
import { fetchProductComplement } from './fetchProductComplement';
import { calculateProductComplementsPrice } from './calculateProductComplementsPrice';
import { handleSelectProductComplement } from './handleSelectProductComplement';
import { ProductComplementProvider } from '../hooks/useProductComplement';
import ProductComplementDetail from './ProductComplementDetail';

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
    flex: 1,
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

const ProductComplement: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const messaging = useMessage();
  const [complementsPrice, setComplementsPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const { handlePrepareProduct, selectedProduct, handleSelectProduct, isComplement } = useProducts();

  const formattedTotal = useMemo(() => {
    if (!product) return moneyFormat(0);
    const _total = (complementsPrice + product.price) * amount;
    return moneyFormat(_total);
  }, [amount, complementsPrice, product]);

  useEffect(() => {
    if (!selectedProduct) return;
    fetchProductComplement(selectedProduct.id)
      .then(product => {
        setProduct(product);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedProduct]);

  useEffect(() => {
    if (!product) return;

    handlePrepareProduct(product, amount);
  }, [amount, product, handlePrepareProduct]);

  useEffect(() => {
    if (!product) return;

    const price = calculateProductComplementsPrice(product);
    setComplementsPrice(price);
  }, [product]);

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

  function handleClickComplements(complementCategoryId: number, complementId: number) {
    if (!product) return;

    const { newProduct } = handleSelectProductComplement(complementCategoryId, complementId, product);

    setProduct(newProduct);

    if (newProduct.ready) handlePrepareProduct(newProduct);
  }

  const productComplementContextValue = {
    product,
    handleClickComplements,
    setProduct,
  };

  return (
    <Modal
      open={isComplement}
      title="adicionar ao carrinho"
      handleClose={() => handleSelectProduct(null)}
      style={styles.modal}
    >
      {loading ? (
        <InsideLoading />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            <ProductComplementProvider value={productComplementContextValue}>
              <ProductComplementDetail />
            </ProductComplementProvider>
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

export default ProductComplement;
