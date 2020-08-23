import React, { useState, useEffect } from 'react';
import SignRoutes from './SignRoutes';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/home/Home';
import DrawerContent from '../components/drawer/DrawerContent';
import { useSelector } from '../store/selector';
import Menu from '../pages/menu/Menu';
import Offers from '../pages/offer/Offers';
import Account from '../pages/account/Account';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';
import Orders from '../pages/orders/Orders';
import Order from '../pages/orders/order/Order';
import Products from '../pages/products/Products';

type SignRouteOptions = 'Initial' | 'LoginEmail' | 'Register' | 'ForgotPassword';

export type RootDrawerParamList = {
  Home: undefined;
  Offers: undefined;
  Menu: undefined;
  Products: { url: string; categoryName: string };
  Cart: undefined;
  Contact: undefined;
  Login: { screen: SignRouteOptions; params?: { email: string } } | undefined;
  Account: undefined;
  Checkout: undefined;
  Orders: undefined;
  Order: { orderId: string | number };
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const Routes: React.FC = () => {
  const user = useSelector(state => state.user);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ width: isInitialRender ? undefined : 270 }}
        drawerContent={props => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Offers" component={Offers} />
        <Drawer.Screen name="Menu" component={Menu} />
        <Drawer.Screen name="Products" component={Products} />
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name="Contact" component={Home} />
        {!user && <Drawer.Screen name="Login" options={{ title: 'Entrar' }} component={SignRoutes} />}
        <Drawer.Screen name="Orders" component={Orders} />
        <Drawer.Screen name="Order" component={Order} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Checkout" component={Checkout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
