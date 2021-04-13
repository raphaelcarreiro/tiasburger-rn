import React, { useState, useEffect, useMemo } from 'react';
import Modal from '../../../../modal/Modal';
import { StyleSheet, ScrollView } from 'react-native';
import { moneyFormat } from '../../../../../helpers/numberFormat';
import { useCart } from '../../../cartContext';
import ProductSimpleDetail from '../../../../../pages/products/detail/simple/ProductSimpleDetail';
import ProductUpdate from '../ProductUpdate';
import { ProductSimpleProvider } from '../../../../../pages/products/detail/hooks/useSimpleProduct';
import { CartProduct } from '../../../../../@types/cart';

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
  const { selectedProduct, handleSelectProduct, isSimple } = useCart();
  const [amount, setAmount] = useState(selectedProduct?.amount || 0);
  const [product, setProduct] = useState<CartProduct | null>(JSON.parse(JSON.stringify(selectedProduct)));
  const [additionalPrice, setAdditionalPrice] = useState(0);

  const formattedTotal = useMemo(() => {
    if (!product) return moneyFormat(0);
    const productPrice =
      product.promotion_activated && product.special_price ? product.special_price : product.product_price;
    const total = (productPrice + additionalPrice) * amount;
    return moneyFormat(total);
  }, [additionalPrice, amount, product]);

  useEffect(() => {
    if (!product) return;
    setAdditionalPrice(
      product.additional.reduce(
        (value, additional) => (additional.selected ? value + additional.price * additional.amount : value),
        0,
      ),
    );
  }, [product]);

  function handleAmountUp() {
    setAmount(amount + 1);
  }

  function handleAmountDown() {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }

  function handleClickIngredient(ingredientId: number) {
    if (!product) return;

    setProduct({
      ...product,
      ingredients: product.ingredients.map(ingredient => {
        if (ingredient.id === ingredientId) ingredient.selected = !ingredient.selected;
        return ingredient;
      }),
    });
  }

  function handleClickAdditional(additionalId: number, amount: number) {
    if (!product) return;

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

  const productSimpleContext = {
    handleClickAdditional,
    handleClickIngredient,
    product,
    setProduct,
  };

  return (
    <Modal open={isSimple} title="atualizar produto" handleClose={() => handleSelectProduct(null)} style={styles.modal}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ProductSimpleProvider value={productSimpleContext}>
          <ProductSimpleDetail />
        </ProductSimpleProvider>
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

export default ProductSimple;
