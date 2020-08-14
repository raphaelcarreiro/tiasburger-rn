import React from 'react';
import AppBarAction from '../../../components/appbar/AppBarAction';
import { useSelector } from '../../../store/selector';
import { View } from 'react-native';
import { CartQuantity, CartQuantityText } from './styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/Routes';

const MenuActions: React.FC = () => {
  const cart = useSelector(state => state.cart);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <CartQuantity>
        <CartQuantityText>{cart.products.length}</CartQuantityText>
      </CartQuantity>
      <AppBarAction iconName="cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default MenuActions;
