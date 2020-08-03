import React from 'react';
import SignRoutes from './SignRoutes';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/home/Home';
import DrawerContent from '../components/drawer/DrawerContent';
import { useSelector } from '../store/selector';
import Menu from '../pages/menu/Menu';
import Offers from '../pages/offer/Offers';
import Account from '../pages/account/Account';

const Drawer = createDrawerNavigator();

const Routes: React.FC = () => {
  const user = useSelector(state => state.user);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Offers" component={Offers} />
        <Drawer.Screen name="Menu" component={Menu} />
        <Drawer.Screen name="Cart" component={Home} />
        <Drawer.Screen name="Contact" component={Home} />
        {!user && <Drawer.Screen name="Login" options={{ title: 'Entrar' }} component={SignRoutes} />}
        <Drawer.Screen name="Orders" component={Home} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Logoff" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
