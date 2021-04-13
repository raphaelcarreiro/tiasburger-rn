import React, { useState, useEffect, useMemo } from 'react';
import Modal from '../../../../components/modal/Modal';
import InsideLoading from '../../../../components/loading/InsideLoading';
import { StyleSheet, ScrollView } from 'react-native';
import { useProducts } from '../../useProducts';
import { moneyFormat } from '../../../../helpers/numberFormat';
import { Product } from '../../../../@types/product';
import ProductAdd from '../ProductAdd';
import { fetchSimpleProduct } from './fetchSimpleProduct';
import { ProductSimpleProvider } from '../hooks/useSimpleProduct';
import ProductSimpleDetail from './ProductSimpleDetail';

const styles = StyleSheet.create({
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

const ProductSimple: React.FC = () => {
  const { selectedProduct, handleSelectProduct, isSimple, handlePrepareProduct } = useProducts();
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [additionalPrice, setAdditionalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const total = useMemo(() => {
    if (!product) return moneyFormat(0);
    const productPrice = product.promotion_activated && product.special_price ? product.special_price : product.price;
    const total = (productPrice + additionalPrice) * amount;
    return moneyFormat(total);
  }, [additionalPrice, amount, product]);

  useEffect(() => {
    if (!product) return;
    handlePrepareProduct(product, amount);
  }, [amount, product, handlePrepareProduct]);

  useEffect(() => {
    if (!selectedProduct) return;
    fetchSimpleProduct(selectedProduct.id)
      .then(product => setProduct(product))
      .finally(() => setLoading(false));
  }, [selectedProduct]);

  useEffect(() => {
    if (product) {
      setAdditionalPrice(
        product.additional.reduce(
          (value, additional) => (additional.selected ? value + additional.price * additional.amount : value),
          0,
        ),
      );
    }
  }, [product, amount]);

  function handleAmountUp() {
    setAmount(amount + 1);
  }

  function handleAmountDown() {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }

  function handleClickIngredient(ingredientId) {
    if (product)
      setProduct({
        ...product,
        ingredients: product.ingredients.map(ingredient => {
          if (ingredient.id === ingredientId) ingredient.selected = !ingredient.selected;
          return ingredient;
        }),
      });
  }

  function handleClickAdditional(additionalId: number, amount: number) {
    if (product)
      setProduct({
        ...product,
        additional: product.additional.map(additional => {
          if (additional.id === additionalId) {
            additional.selected = amount > 0;
            additional.amount = amount;
          }
          return additional;
        }),
      });
  }

  function handleModalClose() {
    handleSelectProduct(null);
  }

  const productSimpleContext = {
    handleClickAdditional,
    handleClickIngredient,
    product,
    setProduct,
  };

  return (
    <Modal open={isSimple} title="adicionar ao carrinho" handleClose={handleModalClose} style={styles.modal}>
      {loading ? (
        <InsideLoading />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            <ProductSimpleProvider value={productSimpleContext}>
              <ProductSimpleDetail />
            </ProductSimpleProvider>
          </ScrollView>
          {product && (
            <ProductAdd
              product={product}
              total={total}
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

export default ProductSimple;
