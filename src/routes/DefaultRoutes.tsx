import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/home/Home';
import { useAuth } from '../hooks/auth';
import SignRoutes from './SignRoutes';
import { useTheme } from 'styled-components';

const Default = createDrawerNavigator();

const DefaultRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  return (
    <Default.Navigator
      drawerStyle={{
        backgroundColor: theme.secondary,
        width: 240,
      }}
    >
      <Default.Screen name="Home" component={Home} />
      <Default.Screen name="Offers" component={Home} />
      <Default.Screen name="Menu" component={Home} />
      <Default.Screen name="Cart" component={Home} />
      <Default.Screen name="Contact" component={Home} />
      <Default.Screen name="Login" options={{ title: 'Entrar' }} component={SignRoutes} />
      <Default.Screen name="Orders" component={Home} />
      <Default.Screen name="Account" component={Home} />
      <Default.Screen name="Logoff" component={Home} />
    </Default.Navigator>
  );
};

export default DefaultRoutes;
