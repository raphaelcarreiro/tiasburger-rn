import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login/Login';
import LoginEmail from '../pages/login-email/LoginEmail';
import Register from '../pages/register/Register';
import { useTheme } from 'styled-components';
import ForgotPassword from '../pages/forgot-password/ForgotPassword';

export type SignRouteList = {
  Initial: undefined;
  LoginEmail: { email?: string };
  Register: undefined;
  ForgotPassword: { email?: string };
};

const Stack = createStackNavigator<SignRouteList>();

const StackSignRoutes: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen name="Initial" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="LoginEmail" options={{ title: 'Entrar' }} component={LoginEmail} />
      <Stack.Screen name="Register" options={{ title: 'Registrar' }} component={Register} />
      <Stack.Screen name="ForgotPassword" options={{ title: 'Esqueci minha senha' }} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default StackSignRoutes;
