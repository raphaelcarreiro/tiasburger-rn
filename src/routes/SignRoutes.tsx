import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login/Login';
import LoginEmail from '../pages/login-email/LoginEmail';
import Register from '../pages/register/Register';

const NoHeader = createStackNavigator();

const NoHeaderRoutes: React.FC = () => (
  <NoHeader.Navigator>
    <NoHeader.Screen name="Initial" options={{ headerShown: false }} component={Login} />
    <NoHeader.Screen name="LoginEmail" options={{ title: 'Entrar' }} component={LoginEmail} />
    <NoHeader.Screen name="Register" options={{ title: 'Registrar' }} component={Register} />
  </NoHeader.Navigator>
);

export default NoHeaderRoutes;
