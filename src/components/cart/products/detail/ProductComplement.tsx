import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useMessage } from '../../../../hooks/message';
import { moneyFormat } from '../../../../helpers/numberFormat';
import Modal from '../../../modal/Modal';
import ProductUpdate from './ProductUpdate';
import { useCart } from '../../cartContext';
import { CartProduct } from '../../../../@types/cart';
import ProductComplementDetail from '../../../../pages/products/detail/complement/ProductComplementDetail';
import { calculateProductComplementsPrice } from '../../../../pages/products/detail/complement/calculateProductComplementsPrice';
import { handleSelectProductComplement } from '../../../../pages/products/detail/complement/handleSelectProductComplement';
import { ProductComplementProvider } from '../../../../pages/products/detail/hooks/useProductComplement';

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

const ProductComplement: React.FC = () => {
  const { selectedProduct, isComplement, handleSelectProduct } = useCart();
  const [amount, setAmount] = useState(selectedProduct?.amount || 0);
  const messaging = useMessage();
  const [product, setProduct] = useState<CartProduct | null>(JSON.parse(JSON.stringify(selectedProduct)));
  const [complementsPrice, setComplementsPrice] = useState(0);

  const formattedTotal = useMemo(() => {
    if (!product) return moneyFormat(0);
    const total = (complementsPrice + product.product_price) * amount;
    return moneyFormat(total);
  }, [amount, complementsPrice, product]);

  useEffect(() => {
    if (!product) return;

    const price = calculateProductComplementsPrice(product);
    setComplementsPrice(price);
  }, [product]);

  function handleClickComplements(complementCategoryId: number, complementId: number) {
    if (!product) return;

    const { newProduct } = handleSelectProductComplement(complementCategoryId, complementId, product);
    setProduct(newProduct);
  }

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

  const productComplementContextValue = {
    product,
    handleClickComplements,
    setProduct,
  };

  return (
    <Modal
      open={isComplement}
      title="alterar produto"
      handleClose={() => handleSelectProduct(null)}
      style={styles.modal}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <ProductComplementProvider value={productComplementContextValue}>
          <ProductComplementDetail />
        </ProductComplementProvider>
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

export default ProductComplement;
