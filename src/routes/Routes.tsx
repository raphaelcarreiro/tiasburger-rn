import React from 'react';
import RoutesNoHeader from './SignRoutes';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/home/Home';
import { useTheme } from 'styled-components';
import DrawerContent from '../components/drawer/DrawerContent';

const Drawer = createDrawerNavigator();

const Routes: React.FC = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Offers" component={Home} />
        <Drawer.Screen name="Menu" component={Home} />
        <Drawer.Screen name="Cart" component={Home} />
        <Drawer.Screen name="Contact" component={Home} />
        <Drawer.Screen name="Login" options={{ title: 'Entrar' }} component={RoutesNoHeader} />
        <Drawer.Screen name="Orders" component={Home} />
        <Drawer.Screen name="Account" component={Home} />
        <Drawer.Screen name="Logoff" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
