import React, { useEffect } from 'react';
import AppBar from '../../components/appbar/Appbar';
import Typography from '../../components/bases/typography/Text';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from '../../store/selector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 56,
  },
});

const Cart: React.FC = () => {
  const cart = useSelector(state => state.cart);

  return (
    <>
      <AppBar title="Carrinho" />
      <View style={styles.container}>
        <FlatList
          data={cart.products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item: product }) => <Typography>{product.name}</Typography>}
        />
      </View>
    </>
  );
};

export default Cart;
