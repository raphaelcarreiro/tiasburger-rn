import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'styled-components';
import { Text } from 'react-native';
import AccountForm from './form/AccountForm';
import AccountAddresses from './address/AccountAddresses';
const Tab = createMaterialTopTabNavigator();

const AccountTab: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Tab.Navigator
        style={{
          top: 56,
        }}
        tabBarOptions={{
          indicatorStyle: {
            backgroundColor: theme.secondary,
            borderBottomWidth: 2,
          },
          style: {
            backgroundColor: theme.primary,
          },
          activeTintColor: theme.contrast,
        }}
      >
        <Tab.Screen name="Dados" component={AccountForm} />
        <Tab.Screen name="Settings" component={AccountAddresses} />
      </Tab.Navigator>
    </>
  );
};

export default AccountTab;
