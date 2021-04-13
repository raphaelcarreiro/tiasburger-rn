import React, { Fragment } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AppBar from '../../components/appbar/Appbar';
import { useSelector } from '../../store/selector';
import Cover from './Cover';
import Promotions from './promotions/Promotions';
import Categories from './categories/Categories';
import Info from './Info';
import Offers from './offers/Offers';
import Footer from '../../components/footer/Footer';

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  promotions: {
    marginTop: 20,
  },
  footer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#fafafa',
    borderTopWidth: 1,
  },
  flatList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});

const Home: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);
  const promotions = useSelector(state => state.promotions);

  if (!restaurant) return <Fragment />;

  return (
    <View style={styles.container}>
      <AppBar title="início" />
      <ScrollView>
        <Cover />
        <Info restaurant={restaurant} />
        <Categories />
        <Offers />
        {promotions.length > 0 && <Promotions />}
        <Footer />
      </ScrollView>
    </View>
  );
};

export default Home;
