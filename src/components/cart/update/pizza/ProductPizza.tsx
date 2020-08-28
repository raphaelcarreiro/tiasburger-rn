import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import Typography from '../../../bases/typography/Text';
import { useMessage } from '../../../../hooks/message';
import { moneyFormat } from '../../../../helpers/numberFormat';
import { Complement, Product } from '../../../../@types/product';
import Modal from '../../../modal/Modal';
import ImagePreview from '../../../image-preview/ImagePreview';
import InputText from '../../../bases/input/Input';
import ProductAmount from '../ProductAmount';
import ProductComplementCategories from './ProductComplementCategories';
import { useSelector } from '../../../../store/selector';
import { useCart } from '../../cartContext';
import ProductUpdate from '../ProductUpdate';
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

const ProductPizza: React.FC = () => {
  const { selectedProduct, handleSelectProduct, isPizza } = useCart();
  const [amount, setAmount] = useState(selectedProduct ? selectedProduct.amount : 1);
  const [product, setProduct] = useState<CartProduct | null>(JSON.parse(JSON.stringify(selectedProduct)));
  const [filteredProduct, setFilteredProduct] = useState<Product | null>(product);
  const [complementsPrice, setComplementsPrice] = useState(0);
  const [complementSizeSelected, setComplementSizeSelected] = useState<Complement>({} as Complement);
  const [dialogIngredients, setDialogIngredients] = useState(false);
  const [dialogAdditional, setDialogAdditional] = useState(false);
  const [complementIdSelected, setComplementIdSelected] = useState(null);
  const [complementCategoryIdSelected, setComplementCategoryIdSelected] = useState(null);
  const [searchedCategoryId, setSearchedCategoryId] = useState<number | null>(null);
  const [searchedValue, setSearchedValue] = useState('');
  const [imagePreview, setImagePreview] = useState(false);
  const messaging = useMessage();
  const restaurant = useSelector(state => state.restaurant);

  useEffect(() => {
    if (!product) return;

    const category = product.complement_categories.find(category => category.is_pizza_size);
    if (!category) return;

    const complement = category.complements.find(complement => complement.selected);
    if (!complement) return;

    setComplementSizeSelected(complement);
  }, [product]);

  const total = useMemo(() => {
    if (!product) return moneyFormat(0);

    return moneyFormat((complementsPrice + product.product_price) * amount);
  }, [complementsPrice, product, amount]);

  useEffect(() => {
    if (!product) return;

    // Calcula o valor total dos complements selecionados
    let sumPrices = 0;
    let counterTaste = 0;
    let tastePrice = 0;
    let additionalPrice = 0;
    const tastePrices: number[] = [];

    product.complement_categories.forEach(category => {
      category.complements.forEach(complement => {
        if (complement.selected) {
          counterTaste = category.is_pizza_taste && complement.selected ? counterTaste + 1 : counterTaste;
          complement.prices.forEach(price => {
            if (category.is_pizza_taste) {
              tastePrice = price.selected && price.price ? tastePrice + price.price : tastePrice;
              if (price.selected) tastePrices.push(price.price);
            } else sumPrices = price.selected && price.price ? sumPrices + price.price : sumPrices;
          });
          complement.additional.forEach(additional => {
            if (additional.selected)
              additional.prices.forEach(price => {
                additionalPrice = price.selected && price.price ? additionalPrice + price.price : additionalPrice;
              });
          });
        }
      });
    });

    if (counterTaste > 0) {
      if (restaurant?.configs.pizza_calculate === 'average_value') sumPrices = sumPrices + tastePrice / counterTaste;
      else if (restaurant?.configs.pizza_calculate === 'higher_value') sumPrices = sumPrices + Math.max(...tastePrices);
    }

    setComplementsPrice(sumPrices + additionalPrice);
  }, [amount, product, restaurant]);

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

    const complementCategory = product.complement_categories.find(category => category.id === complementCategoryId);
    if (!complementCategory) return;

    const complementCategorySize = product.complement_categories.find(category => category.is_pizza_size);
    if (!complementCategorySize) return;

    let sizeSelected = complementCategorySize.complements.find(complement => complement.selected);

    const categories = product.complement_categories.map(category => {
      if (category.id === complementCategoryId) {
        const selectedAmount = category.complements.reduce((sum, complement) => {
          return complement.selected ? sum + 1 : sum;
        }, 0);

        // marca o complemento selecionado
        category.complements = category.complements.map(complement => {
          if (category.is_pizza_size) {
            complement.selected = complement.id === complementId;
          } else if (category.is_pizza_taste) {
            if (!sizeSelected) return complement;
            if (sizeSelected.taste_amount === 1) complement.selected = complement.id === complementId;
            else {
              if (complement.id === complementId) {
                if (complement.selected) complement.selected = !complement.selected;
                else if (sizeSelected.taste_amount > selectedAmount) complement.selected = !complement.selected;
                else if (sizeSelected.taste_amount === selectedAmount)
                  messaging.handleOpen(
                    `Apenas ${sizeSelected.taste_amount} ${
                      sizeSelected.taste_amount > 1 ? 'sabores' : 'sabor'
                    } você pode selecionar`,
                  );
              }
            }
          } else if (category.max_quantity === 1) {
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

    sizeSelected = complementCategorySize.complements.find(complement => complement.selected);

    // marca os preços de acordo com o tamanho selecionado
    if (complementCategory.is_pizza_size && sizeSelected)
      product.complement_categories.map(category => {
        category.complements.map(complement => {
          // desmarca todos os sabores caso o tamanho tenha sido alterado
          if (complementCategory.is_pizza_size)
            complement.selected = category.is_pizza_taste ? false : complement.selected;
          complement.prices = complement.prices.map(price => {
            price.selected = price.product_complement_size_id === sizeSelected?.id;
            return price;
          });
          complement.additional = complement.additional.map(additional => {
            additional.prices = additional.prices.map(price => {
              price.selected = price.product_complement_size_id === sizeSelected?.id;
              return price;
            });
            return additional;
          });
          return complement;
        });
        return category;
      });

    // verifica se o produto pode ser adicionado ao pedido
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
    setFilteredProduct(newProduct);
    handleSearch(searchedCategoryId, searchedValue);

    if (sizeSelected) setComplementSizeSelected(sizeSelected);
  }

  const handleSearch = useCallback(
    (categoryId: number | null, searchValue: string) => {
      setSearchedValue(searchValue);

      if (searchValue === '') {
        setFilteredProduct(product);
        setSearchedCategoryId(null);
        return;
      }

      setSearchedCategoryId(categoryId);
      if (!product) return;

      const productCopy: Product = JSON.parse(JSON.stringify(product));

      const newCategory = productCopy.complement_categories.find(c => c.id === categoryId);

      if (!newCategory) return;

      newCategory.complements = newCategory.complements.filter(complement => {
        const complementName = complement.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return complementName.indexOf(searchValue.toLowerCase()) !== -1;
      });

      const newProduct = {
        ...product,
        complement_categories: product.complement_categories.map(category => {
          if (category.id === categoryId) {
            return newCategory;
          }
          return category;
        }),
      };

      setFilteredProduct(newProduct);
    },
    [product],
  );

  function handleImagePreview() {
    setImagePreview(!imagePreview);
  }

  function handleModalClose() {
    handleSelectProduct(null);
  }

  return (
    <Modal open={isPizza} title="alterar produto" handleClose={handleModalClose} style={styles.modal}>
      {product && (
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
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
          {filteredProduct && (
            <ProductComplementCategories
              complementCategories={filteredProduct.complement_categories}
              handleComplementClick={handleComplementClick}
              sizeSelected={complementSizeSelected}
              handleSearch={handleSearch}
            />
          )}

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
          <ProductUpdate amount={amount} product={product} total={total} />
        </View>
      )}
    </Modal>
  );
};

export default ProductPizza;
