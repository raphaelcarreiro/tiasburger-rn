import React from 'react';
import AppBar from '../../components/appbar/Appbar';
import Typography from '../../components/bases/typography/Text';
import { useSelector } from '../../store/selector';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import Button from '../../components/bases/button/Button';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../routes/Routes';
import PromotionItem from './PromotionItem';
import Header from './Header';
import Promotions from './Promotions';

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  main: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    marginTop: 30,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  promotions: {
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flatList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

type HomeProps = {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const restaurant = useSelector(state => state.restaurant);
  const promotions = useSelector(state => state.promotions);

  return (
    <View style={styles.container}>
      <AppBar title="Início" />
      <ScrollView>
        <Header />
        {restaurant && (
          <>
            <View style={styles.info}>
              {restaurant.configs.delivery_time > 0 && (
                <Typography variant="caption" size={18}>
                  {restaurant.configs.delivery_time} minutos
                </Typography>
              )}
              {restaurant.configs.order_minimum_value > 0 && restaurant.configs.tax_mode !== 'order_value' && (
                <Typography variant="caption">{restaurant.configs.formattedOrderMinimumValue} mínimo</Typography>
              )}
            </View>
            {promotions.length > 0 && <Promotions />}
            <View style={styles.main}>
              <Button color="primary" variant="text" onPress={() => navigation.navigate('Menu')}>
                Acessar Cardápio
              </Button>
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Typography align="center" size={14} variant="caption">
          {restaurant?.working_hours}
        </Typography>
      </View>
    </View>
  );
};

export default Home;
