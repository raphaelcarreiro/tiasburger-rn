import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, Text } from 'react-native';
import Routes from './routes/Routes';
import api from './services/api';
import { useDispatch } from 'react-redux';
import { moneyFormat } from './helpers/numberFormat';
import { setRestaurant } from './store/modules/restaurant/actions';
import InitialLoading from './components/loading/InitialLoading';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
});

const App: React.FC = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [theme, setTheme] =
  const dispatch = useDispatch();

  useEffect(() => {
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
      })
      .finally(() => {
        setInitialLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      {initialLoading ? (
        <InitialLoading />
      ) : (
        <View style={styles.container}>
          <Routes />
        </View>
      )}
    </>
  );
};

export default App;
