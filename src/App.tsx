import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import Routes from './routes/Routes';
import api from './services/api';
import { useDispatch } from 'react-redux';
import { moneyFormat } from './helpers/numberFormat';
import { setRestaurant } from './store/modules/restaurant/actions';
import InitialLoading from './components/loading/InitialLoading';
import { useThemeContext } from './hooks/theme';
import { useSelector } from './store/selector';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';
import { setCart } from './store/modules/cart/actions';
import { Cart } from './@types/cart';
import { setPromotions } from './store/modules/promotion/actions';
import { RedirectScreens, AppContext } from './appContext';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
});

const App: React.FC = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [redirect, setRedirect] = useState<RedirectScreens>(null);
  const { handleSetTheme } = useThemeContext();
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant);
  const theme = useTheme();

  useEffect(() => {
    function loadPromotions() {
      api.get('/promotions').then(response => {
        dispatch(setPromotions(response.data));
      });
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
      .finally(() => {
        loadPromotions();
        setInitialLoading(false);
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

  const handleCartVisibility = useCallback(() => {
    setIsCartVisible(!isCartVisible);
  }, [isCartVisible]);

  return (
    <>
      {initialLoading ? (
        <InitialLoading />
      ) : (
        <>
          <StatusBar animated={false} barStyle="default" backgroundColor={theme.primary} />
          <AppContext.Provider value={{ handleCartVisibility, isCartVisible, setRedirect: setRedirect, redirect }}>
            <View style={styles.container}>
              <Routes />
            </View>
          </AppContext.Provider>
        </>
      )}
    </>
  );
};

export default App;
