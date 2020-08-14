import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login/Login';
import LoginEmail from '../pages/login-email/LoginEmail';
import Register from '../pages/register/Register';
import { useTheme } from 'styled-components';

const Stack = createStackNavigator();

const StackSignRoutes: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Initial" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="LoginEmail" options={{ title: 'Entrar' }} component={LoginEmail} />
      <Stack.Screen name="Register" options={{ title: 'Registrar' }} component={Register} />
    </Stack.Navigator>
  );
};

export default StackSignRoutes;
