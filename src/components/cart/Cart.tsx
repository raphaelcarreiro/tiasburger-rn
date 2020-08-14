import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { useSelector } from '../../store/selector';
import CartItem from './CartItem';
import Typography from '../../components/bases/typography/Text';
import Button from '../../components/bases/button/Button';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/Routes';
import Coupon from './coupon/Coupon';
import CouponButton from './coupon/CouponButton';
import CartTotals from './CartTotals';
import { useMessage } from '../../hooks/message';
import { useApp } from '../../App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56,
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
  const cart = useSelector(state => state.cart);
  const restaurant = useSelector(state => state.restaurant);
  const user = useSelector(state => state.user);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isCouponVisible, setIsCouponVisible] = useState(false);
  const messaging = useMessage();
  const app = useApp();
  const route = useRoute();

  function handleCouponVisibility() {
    setIsCouponVisible(!isCouponVisible);
  }

  function handleProceedToCheckout() {
    if (!restaurant?.is_open) {
      Alert.alert('Aviso', restaurant?.name + ' está fechado no momento');
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

  return (
    <View style={styles.container}>
      <Coupon open={isCouponVisible} handleClose={handleCouponVisibility} />
      {cart.products.length > 0 ? (
        <ScrollView>
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
  );
};

export default Cart;
