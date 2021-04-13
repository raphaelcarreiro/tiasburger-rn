import { useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { lighten } from 'polished';
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { useTheme } from 'styled-components';
import { RootDrawerParamList } from '../../routes/Routes';
import { useSelector } from '../../store/selector';
import Typography from '../bases/typography/Text';
import { FooterContainer } from './styles';

const styles = StyleSheet.create({
  links: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 30,
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderStyle: 'solid',
    paddingBottom: 30,
  },
  linksCol1: {
    minWidth: 200,
  },
  restaurantData: {
    marginTop: 30,
  },
  developer: {
    marginTop: 30,
  },
  address: {
    marginTop: 10,
  },
});

const Footer: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);
  const mainAddress = restaurant && restaurant.addresses.find(address => address.is_main);
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <FooterContainer>
      <View>
        <Typography size={24} color="contrast">
          {restaurant?.name}
        </Typography>
        <Typography size={14} color="contrast">
          {restaurant?.working_hours}
        </Typography>
      </View>
      <View style={[styles.links, { borderColor: lighten(0.1, theme.secondary) }]}>
        <View style={styles.linksCol1}>
          <Typography onPress={() => navigation.navigate('Account')} size={18} gutterBottom color="contrast">
            minha conta
          </Typography>
          <Typography onPress={() => navigation.navigate('Orders')} size={18} gutterBottom color="contrast">
            meus pedidos
          </Typography>
          <Typography onPress={() => navigation.navigate('Contact')} size={18} gutterBottom color="contrast">
            contato
          </Typography>
        </View>
        <View>
          <Typography onPress={() => navigation.navigate('Offers')} size={18} gutterBottom color="contrast">
            ofertas
          </Typography>
          <Typography onPress={() => navigation.navigate('Menu')} size={18} gutterBottom color="contrast">
            cardápio
          </Typography>
        </View>
      </View>
      <View style={styles.restaurantData}>
        <Typography size={14} color="contrast">
          {restaurant?.corporate_name}
        </Typography>
        <Typography size={14} color="contrast">
          {restaurant?.cnpj}
        </Typography>
        {mainAddress && (
          <View style={styles.address}>
            <Typography size={14} color="contrast">
              {mainAddress.address}, {mainAddress.number}, {mainAddress.district}
            </Typography>
            <Typography size={14} color="contrast">
              {mainAddress.city} - {mainAddress.region}, {mainAddress.postal_code}
            </Typography>
          </View>
        )}
      </View>
      <View style={styles.developer}>
        <Typography
          onPress={() => Linking.openURL('https://www.sgrande.delivery')}
          align="center"
          size={22}
          color="contrast"
        >
          sgrande.delivery
        </Typography>
      </View>
    </FooterContainer>
  );
};

export default Footer;
