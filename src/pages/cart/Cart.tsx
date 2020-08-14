import React from 'react';
import AppBar from '../../components/appbar/Appbar';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { useSelector } from '../../store/selector';
import CartItem from './CartItem';
import Typography from '../../components/bases/typography/Text';
import Button from '../../components/bases/button/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/Routes';

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
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

const Cart: React.FC = () => {
  const cart = useSelector(state => state.cart);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <AppBar title="Carrinho" />
      <View style={styles.container}>
        {cart.products.length > 0 ? (
          <ScrollView>
            {cart.products.map(product => (
              <CartItem product={product} key={String(product.uid)} />
            ))}
            <View style={styles.total}>
              <Typography size={22}>Total</Typography>
              <Typography size={24} bold>
                {cart.formattedTotal}
              </Typography>
            </View>
            <View style={styles.actions}>
              <Button color="primary" variant="contained" style={styles.buttonProceed}>
                Fechar pedido
              </Button>
              <Button color="primary" variant="text" onPress={() => navigation.navigate('Menu')}>
                Continuar comprando
              </Button>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Typography variant="caption" size={20}>
              Carrinho vazio
            </Typography>
          </View>
        )}
      </View>
    </>
  );
};

export default Cart;
