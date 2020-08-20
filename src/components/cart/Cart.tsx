import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { useSelector } from '../../store/selector';
import CartItem from './CartItem';
import Typography from '../../components/bases/typography/Text';
import Button from '../../components/bases/button/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootDrawerParamList } from '../../routes/Routes';
import Coupon from './coupon/Coupon';
import CouponButton from './coupon/CouponButton';
import CartTotals from './CartTotals';
import { useMessage } from '../../hooks/message';
import { useApp } from '../../appContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CartProduct } from '../../@types/cart';
import { CartContext } from './cartContext';
import { updateProductFromCart } from '../../store/modules/cart/actions';
import { useDispatch } from 'react-redux';
import ProductSimple from './update/simple/ProductSimple';
import ProductPizza from './update/pizza/ProductPizza';
import ProductComplement from './update/complement/ProductComplement';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56,
  },
  scroll: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    marginTop: 20,
  },
  buttonProceed: {
    marginBottom: 20,
  },
  info: {
    marginTop: 10,
  },
});

const Cart: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<CartProduct | null>(null);
  const [isCouponVisible, setIsCouponVisible] = useState(false);
  const messaging = useMessage();
  const app = useApp();
  const route = useRoute();
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const cart = useSelector(state => state.cart);
  const restaurant = useSelector(state => state.restaurant);
  const user = useSelector(state => state.user);
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

  function handleCouponVisibility() {
    setIsCouponVisible(!isCouponVisible);
  }

  function handleProceedToCheckout() {
    if (!restaurant?.is_open) {
      Alert.alert('Fechado', restaurant?.name + ' não está atendendo no momento.');
      return;
    }

    if (restaurant.configs.order_minimum_value > cart.subtotal && restaurant.configs.tax_mode !== 'order_value') {
      messaging.handleOpen(`O valor mínimo do pedido é ${restaurant.configs.formattedOrderMinimumValue}`);
      return;
    }

    if (!user) {
      if (restaurant.configs.require_login) {
        navigation.navigate('Login');
        app.setRedirect('Checkout');
        return;
      }
    }

    navigation.navigate('Checkout');
  }

  const handleSelectProduct = useCallback((product: CartProduct) => {
    setSelectedProduct(product);
  }, []);

  const handleUpdateCartProduct = useCallback(
    (product: CartProduct, amount: number) => {
      dispatch(updateProductFromCart(product, amount));
    },
    [dispatch],
  );

  return (
    <CartContext.Provider
      value={{ selectedProduct, handleSelectProduct, handleUpdateCartProduct, isComplement, isPizza, isSimple }}
    >
      {isSimple && <ProductSimple />}
      {isComplement && <ProductComplement />}
      {isPizza && <ProductPizza />}

      <View style={styles.container}>
        <Coupon open={isCouponVisible} handleClose={handleCouponVisibility} />
        {cart.products.length > 0 ? (
          <ScrollView style={styles.scroll}>
            {cart.products.map(product => (
              <CartItem product={product} key={String(product.uid)} />
            ))}
            <CouponButton handleCouponVisibility={handleCouponVisibility} />
            <CartTotals />
            {route.name !== 'Checkout' && (
              <View style={styles.actions}>
                <Button
                  color="primary"
                  variant="contained"
                  style={styles.buttonProceed}
                  onPress={handleProceedToCheckout}
                >
                  Fechar pedido
                </Button>
                <Button color="primary" variant="text" onPress={() => navigation.navigate('Menu')}>
                  Continuar comprando
                </Button>
              </View>
            )}
            {restaurant && route.name !== 'Checkout' && (
              <View style={styles.info}>
                {restaurant.configs.delivery_time > 0 && (
                  <Typography variant="caption" size={14}>
                    * Tempo estimado para entrega {restaurant.configs.delivery_time} minutos
                  </Typography>
                )}
                {restaurant.configs.order_minimum_value > 0 && restaurant.configs.tax_mode !== 'order_value' && (
                  <Typography variant="caption" size={14}>
                    * {restaurant.configs.formattedOrderMinimumValue} pedido mínimo
                  </Typography>
                )}
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Typography variant="caption" size={20}>
              Carrinho vazio
            </Typography>
          </View>
        )}
      </View>
    </CartContext.Provider>
  );
};

export default Cart;
