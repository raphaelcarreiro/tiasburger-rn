import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login/Login';
import LoginEmail from '../pages/login-email/LoginEmail';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fafafa' },
    }}
  >
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="LoginEmail" component={LoginEmail} />
  </Auth.Navigator>
);

export default AuthRoutes;
