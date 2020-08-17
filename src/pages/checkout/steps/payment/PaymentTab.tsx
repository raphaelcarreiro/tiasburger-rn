import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'styled-components';
import PaymentOnline from './PaymentOnline';
import PaymentOffline from './PaymentOffline';
import { Alert } from 'react-native';
import Typography from '../../../../components/bases/typography/Text';

const Tab = createMaterialTopTabNavigator();

type PaymentTabProps = {
  offline: boolean;
  online: boolean;
  initialRouteName: 'offline' | 'online';
};

const PaymentTab: React.FC<PaymentTabProps> = ({ offline, online, initialRouteName }) => {
  const theme = useTheme();

  return (
    <>
      <Tab.Navigator
        style={{
          marginTop: 0,
        }}
        tabBarOptions={{
          indicatorStyle: {
            borderBottomWidth: 2,
            borderColor: theme.primary,
            elevation: 0,
          },
          style: {
            backgroundColor: 'transparent',
          },
          activeTintColor: theme.primary,
          inactiveTintColor: '#333',
        }}
        initialRouteName={initialRouteName}
      >
        {offline && (
          <Tab.Screen
            name="offline"
            options={{
              title: 'Pague na entrega',
            }}
            component={PaymentOffline}
          />
        )}
        {online && (
          <Tab.Screen
            options={{
              title: 'Pague online',
            }}
            name="online"
            component={PaymentOnline}
          />
        )}
      </Tab.Navigator>
    </>
  );
};

export default PaymentTab;
