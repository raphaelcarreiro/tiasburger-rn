import React from 'react';
import AppBarAction from '../../../components/appbar/AppBarAction';
import { useSelector } from '../../../store/selector';
import { View } from 'react-native';
import { CartQuantity, CartQuantityText } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RootDrawerParamList } from '../../../routes/Routes';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const MenuActions: React.FC = () => {
  const cart = useSelector(state => state.cart);
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <View>
      {cart.products.length > 0 && (
        <CartQuantity>
          <CartQuantityText>{cart.products.length}</CartQuantityText>
        </CartQuantity>
      )}
      <AppBarAction iconName="cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default MenuActions;
