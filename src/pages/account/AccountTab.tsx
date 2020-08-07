import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'styled-components';
import AccountForm from './form/AccountForm';
import AccountAddresses from './address/Addresses';
const Tab = createMaterialTopTabNavigator();

const AccountTab: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Tab.Navigator
        style={{
          marginTop: 56,
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
        <Tab.Screen name="Endereços" component={AccountAddresses} />
      </Tab.Navigator>
    </>
  );
};

export default AccountTab;
