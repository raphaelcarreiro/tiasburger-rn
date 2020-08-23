import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StatusBar, StyleSheet, Platform, Alert } from 'react-native';
import Routes from './routes/Routes';
import api from './services/api';
import { useDispatch } from 'react-redux';
import { moneyFormat } from './helpers/numberFormat';
import { setRestaurant, setRestaurantIsOpen } from './store/modules/restaurant/actions';
import { useThemeContext } from './hooks/theme';
import { useSelector } from './store/selector';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';
import { setCart } from './store/modules/cart/actions';
import { Cart } from './@types/cart';
import { setPromotions } from './store/modules/promotion/actions';
import { RedirectScreens, AppContext } from './appContext';
import { socketBaseUrl } from './constants/constants';
import io from 'socket.io-client';
import SplashScreen from 'react-native-splash-screen';
import firebaseMessaging from '@react-native-firebase/messaging';
import { useMessage } from './hooks/message';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
});

const socket: SocketIOClient.Socket = io.connect(socketBaseUrl + '/client');

const App: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [redirect, setRedirect] = useState<RedirectScreens>(null);
  const { handleSetTheme } = useThemeContext();
  const dispatch = useDispatch();
  const theme = useTheme();
  const messaging = useMessage();
  const restaurant = useSelector(state => state.restaurant);
  const user = useSelector(state => state.user);

  const saveToken = useCallback(() => {
    firebaseMessaging()
      .getToken()
      .then(token => {
        const param = {
          token: token,
          device: Platform.OS,
          type: 'client',
        };

        api.post('/pushTokens', param).catch(err => {
          console.log(err);
        });
      });
  }, []);

  const requestPermission = useCallback(() => {
    firebaseMessaging()
      .requestPermission()
      .then(permission => {
        if (permission) saveToken();
      });
  }, [saveToken]);

  useEffect(() => {
    if (!user) return;

    firebaseMessaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) saveToken();
        else requestPermission();
      });
  }, [saveToken, requestPermission, user]);

  useEffect(() => {
    const unsubscribe = firebaseMessaging().onMessage(async ({ notification }) => {
      if (notification && notification.body) messaging.handleOpen(notification.body);
    });

    return unsubscribe;
  }, [messaging]);

  useEffect(() => {
    async function loadPromotions() {
      const response = await api.get('/promotions');
      dispatch(setPromotions(response.data));
    }

    api
      .get('/restaurants')
      .then(response => {
        const _restaurant = response.data;

        dispatch(
          setRestaurant({
            ..._restaurant,
            configs: {
              ..._restaurant.configs,
              formattedTax: moneyFormat(_restaurant.configs.tax_value),
              formattedOrderMinimumValue: moneyFormat(_restaurant.configs.order_minimum_value),
            },
          }),
        );

        AsyncStorage.getItem('cart').then(response => {
          if (response) {
            const cart: Cart = JSON.parse(response);
            dispatch(setCart(cart));
          }
        });
      })
      .finally(async () => {
        await loadPromotions();
        SplashScreen.hide();
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    if (restaurant) {
      handleSetTheme(restaurant.primary_color, restaurant.secondary_color);
    }
  }, [restaurant, handleSetTheme]);

  // set webscoket connection
  useEffect(() => {
    function getRestaurantState() {
      api
        .get('/restaurant/state')
        .then(response => {
          dispatch(setRestaurantIsOpen(response.data.is_open));
        })
        .catch(err => {
          console.log(err);
        });
    }

    if (restaurant) {
      if (socket.disconnected) socket.connect();
      socket.emit('register', restaurant.id);

      socket.on('handleRestaurantState', ({ state }: { state: boolean }) => {
        dispatch(setRestaurantIsOpen(state));
      });

      socket.on('reconnect', () => {
        socket.emit('register', restaurant.id);
        getRestaurantState();
      });
    }
  }, [dispatch, restaurant]);

  const handleCartVisibility = useCallback(() => {
    setIsCartVisible(!isCartVisible);
  }, [isCartVisible]);

  return (
    <>
      <StatusBar animated={false} barStyle="default" backgroundColor={theme.primary} />
      <AppContext.Provider value={{ handleCartVisibility, isCartVisible, setRedirect: setRedirect, redirect }}>
        <View style={styles.container}>
          <Routes />
        </View>
      </AppContext.Provider>
    </>
  );
};

export default App;
