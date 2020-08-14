import React from 'react';
import AppBarAction from '../../components/appbar/AppBarAction';
import { View } from 'react-native';
import { CartQuantity, CartQuantityText } from '../menu/categories/styles';
import { useSelector } from '../../store/selector';

interface CheckoutActionsProps {
  handleCartVisilibity(): void;
}

const CheckoutActions: React.FC<CheckoutActionsProps> = ({ handleCartVisilibity }) => {
  const cart = useSelector(state => state.cart);

  return (
    <View>
      <CartQuantity>
        <CartQuantityText>{cart.products.length}</CartQuantityText>
      </CartQuantity>
      <AppBarAction iconName="cart" onPress={handleCartVisilibity} />
    </View>
  );
};

export default CheckoutActions;
