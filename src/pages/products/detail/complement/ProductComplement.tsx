import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import Typography from '../../../../components/bases/typography/Text';
import { useMessage } from '../../../../hooks/message';
import api from '../../../../services/api';
import { useProduct } from '../../productContext';
import { moneyFormat } from '../../../../helpers/numberFormat';
import { ComplementCategory, Complement, Product } from '../../../../@types/product';
import Modal from '../../../../components/modal/Modal';
import InsideLoading from '../../../../components/loading/InsideLoading';
import ImagePreview from '../../../../components/image-preview/ImagePreview';
import InputText from '../../../../components/bases/input/Input';
import ProductAmount from '../ProductAmount';
import ProductAdd from '../ProductAdd';
import ProductComplementCategories from './ProductComplementCategories';

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
  container: {
    flex: 1,
    marginBottom: 60,
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
});

const ProductComplement: React.FC = () => {
  const { selectedProduct, handlePrepareProduct, handleSelectProduct, isComplement } = useProduct();
  const [amount, setAmount] = useState(1);
  const [imagePreview, setImagePreview] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const messaging = useMessage();
  const [complementsPrice, setComplementsPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const total = useMemo(() => {
    if (!product) return moneyFormat(0);
    return moneyFormat((complementsPrice + product.price) * amount);
  }, [complementsPrice, product, amount]);

  useEffect(() => {
    if (!selectedProduct) return;

    api
      .get(`/products/${selectedProduct.id}`)
      .then(response => {
        const categories = response.data.complement_categories.map((category: ComplementCategory) => {
          category.product_complement_category_id = category.id;
          category.complements = category.complements.map(complement => {
            complement.product_complement_id = complement.id;
            complement.selected = !!complement.selected;
            complement.formattedPrice = complement.price && moneyFormat(complement.price);

            complement.prices = complement.prices.map((price, index) => {
              price.product_complement_price_id = price.id;
              price.formattedPrice = price.price && moneyFormat(price.price);
              price.selected = index === 0;
              return price;
            });

            complement.ingredients = complement.ingredients.map(ingredient => {
              ingredient.product_complement_ingredient_id = ingredient.id;
              return ingredient;
            });

            complement.additional = complement.additional.map(additional => {
              additional.product_complement_additional_id = additional.id;
              additional.prices = additional.prices.map((price, index) => {
                price.product_complement_additional_price_id = price.id;
                price.selected = index === 0;
                price.formattedPrice = price.price && moneyFormat(price.price);
                return price;
              });
              return additional;
            });
            return complement;
          });
          return category;
        });

        const ready = response.data.complement_categories.every((category: ComplementCategory) => {
          if (category.is_required) {
            const selectedAmount = category.complements.reduce((sum: number, complement: Complement) => {
              return complement.selected ? sum + 1 : sum;
            }, 0);

            return category.min_quantity <= selectedAmount;
          }
          return true;
        });

        setProduct({
          ...response.data,
          ready,
          complement_categories: categories,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedProduct]);

  useEffect(() => {
    if (!product) return;

    handlePrepareProduct(product, amount);
  }, [amount, product, handlePrepareProduct]);

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
    handlePrepareProduct(product, amount);
  }, [amount, handlePrepareProduct, product]);

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

    if (ready) handlePrepareProduct(newProduct);
  }

  function handleImagePreview() {
    setImagePreview(!imagePreview);
  }

  function handleModalClose() {
    handleSelectProduct(null);
    setProduct(null);
  }

  return (
    <Modal open={isComplement} title="Adicionar" handleClose={handleModalClose}>
      {loading ? (
        <InsideLoading />
      ) : (
        <>
          {product && (
            <ScrollView style={styles.container}>
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
              <ProductAdd product={product} total={total} />
            </View>
          )}
        </>
      )}
    </Modal>
  );
};

export default ProductComplement;
