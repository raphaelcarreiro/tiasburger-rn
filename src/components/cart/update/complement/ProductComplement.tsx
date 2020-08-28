import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import Typography from '../../../bases/typography/Text';
import { useMessage } from '../../../../hooks/message';
import { moneyFormat } from '../../../../helpers/numberFormat';
import Modal from '../../../modal/Modal';
import ImagePreview from '../../../image-preview/ImagePreview';
import InputText from '../../../bases/input/Input';
import ProductAmount from '../ProductAmount';
import ProductUpdate from '../ProductUpdate';
import ProductComplementCategories from './ProductComplementCategories';
import { useCart } from '../../cartContext';
import { CartProduct } from '../../../../@types/cart';

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
  const { selectedProduct, handleSelectProduct, isComplement } = useCart();
  const [amount, setAmount] = useState(selectedProduct ? selectedProduct.amount : 1);
  const [imagePreview, setImagePreview] = useState(false);
  const [product, setProduct] = useState<CartProduct | null>(JSON.parse(JSON.stringify(selectedProduct)));
  const messaging = useMessage();
  const [complementsPrice, setComplementsPrice] = useState(0);

  const total = useMemo(() => {
    if (!product) return moneyFormat(0);
    return moneyFormat((complementsPrice + product.product_price) * amount);
  }, [complementsPrice, product, amount]);

  useEffect(() => {
    if (!product) return;

    setComplementsPrice(
      product.complement_categories.reduce((value, category) => {
        const categoryPrice = category.complements.reduce((sum, complement) => {
          return complement.selected && complement.price ? sum + complement.price : sum;
        }, 0);
        return categoryPrice + value;
      }, 0),
    );
  }, [amount, product]);

  function handleAmountUp() {
    if (product && !product.ready) {
      messaging.handleOpen('Você precisa selecionar os itens obrigatórios');
      return;
    }
    setAmount(amount + 1);
  }

  function handleAmountDown() {
    if (product && !product.ready) {
      messaging.handleOpen('Você precisa selecionar os itens obrigatórios');
      return;
    }
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }

  function handleComplementClick(productId: number, complementCategoryId: number, complementId: number) {
    if (!product) return;

    const categories = product.complement_categories.map(category => {
      if (category.id === complementCategoryId) {
        const selectedAmount = category.complements.reduce((sum, complement) => {
          return complement.selected ? sum + 1 : sum;
        }, 0);

        category.complements = category.complements.map(complement => {
          if (category.max_quantity === 1) {
            complement.selected = complement.id === complementId && !complement.selected;
          } else {
            if (complement.id === complementId) {
              if (complement.selected) complement.selected = !complement.selected;
              else if (category.max_quantity > selectedAmount) complement.selected = !complement.selected;
            }
          }

          return complement;
        });
      }
      return category;
    });

    const ready = product.complement_categories.every(category => {
      if (category.is_required) {
        const selectedAmount = category.complements.reduce((sum, complement) => {
          return complement.selected ? sum + 1 : sum;
        }, 0);

        return category.min_quantity <= selectedAmount;
      }
      return true;
    });

    const newProduct = {
      ...product,
      ready,
      complement_categories: categories,
    };

    setProduct(newProduct);
  }

  function handleImagePreview() {
    setImagePreview(!imagePreview);
  }

  function handleModalClose() {
    handleSelectProduct(null);
  }

  return (
    <Modal open={isComplement} title="alterar produto" handleClose={handleModalClose} style={styles.modal}>
      {product && (
        <ScrollView contentContainerStyle={styles.scroll}>
          <ImagePreview
            source={product.image.imageUrl}
            open={imagePreview}
            description={product.name}
            handleClose={handleImagePreview}
          />
          <TouchableOpacity onPress={handleImagePreview} style={styles.imageContainer}>
            <Image
              source={{ uri: product.image.thumbImageUlr ? product.image.thumbImageUlr : product.image.imageUrl }}
              style={styles.productImage}
            />
          </TouchableOpacity>
          <View style={styles.productData}>
            <Typography align="center" size={24}>
              {product.name}
            </Typography>
            <Typography variant="caption" align="center" gutterBottom>
              {product.description}
            </Typography>
          </View>
          <ProductComplementCategories
            complementCategories={product.complement_categories}
            handleComplementClick={handleComplementClick}
          />

          <View style={styles.inputContainer}>
            <InputText
              label="Observação"
              placeholder="Exemplo: quero com carne bem passada"
              variant="outlined"
              numberOfLines={5}
              multiline
              textAlignVertical="top"
              autoCorrect
              returnKeyType="done"
              value={product.annotation}
              onChange={event => setProduct({ ...product, annotation: event.nativeEvent.text })}
            />
          </View>
        </ScrollView>
      )}
      {product && (
        <View style={styles.footerActions}>
          <ProductAmount handleAmountDown={handleAmountDown} handleAmountUp={handleAmountUp} amount={amount} />
          <ProductUpdate product={product} total={total} amount={amount} />
        </View>
      )}
    </Modal>
  );
};

export default ProductComplement;
