import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { useTheme } from 'styled-components';
import { DrawerHeader, DrawerHeaderText } from './styles';
import { useSelector } from '../../store/selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/auth';
import Item from './DrawerItem';
import Avatar from '../avatar/Avatar';

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'sans-serif-light',
  },
  items: {
    marginTop: 8,
  },
  avatarImage: {
    height: '100%',
    width: '100%',
  },
});

const SIZE_ICON = 28;

const Drawer: React.FC<DrawerContentComponentProps> = props => {
  const theme = useTheme();
  const restaurant = useSelector(state => state.restaurant);
  const user = useSelector(state => state.user);
  const { logout } = useAuth();
  const { navigation } = props;

  function handleLogout(): void {
    logout().catch(err => {
      console.log(err);
    });
  }

  return (
    <ScrollView {...props} style={{ backgroundColor: theme.secondary }}>
      <DrawerHeader>
        <DrawerHeaderText>{restaurant ? restaurant.name : 'Carregando'}</DrawerHeaderText>
        {/* <RestaurantStatus status={restaurant ? restaurant.is_open : false} /> */}
      </DrawerHeader>
      <View style={styles.items}>
        <Item
          label="Início"
          Icon={<Icon name="home" color={theme.contrast} size={SIZE_ICON} />}
          onPress={() => navigation.navigate('Home')}
        />
        <Item
          Icon={<Icon color={theme.contrast} size={SIZE_ICON} name="local-offer" />}
          label="Ofertas"
          onPress={() => navigation.navigate('Offers')}
        />
        <Item
          Icon={<Icon color={theme.contrast} size={SIZE_ICON} name="book" />}
          label="Cardápio"
          onPress={() => navigation.navigate('Menu')}
        />
        <Item
          Icon={<Icon color={theme.contrast} size={SIZE_ICON} name="shopping-cart" />}
          label="Carrinho"
          onPress={() => navigation.navigate('Cart')}
        />
        <Item
          Icon={<Icon color={theme.contrast} size={SIZE_ICON} name="contact-phone" />}
          label="Contato"
          onPress={() => navigation.navigate('Contact')}
        />
        {user ? (
          <>
            <Item
              Icon={<Icon color={theme.contrast} size={SIZE_ICON} name="assignment" />}
              label="Meus pedidos"
              onPress={() => navigation.navigate('Orders')}
            />

            <Item
              Icon={
                user.image ? (
                  <Avatar>
                    <Image style={styles.avatarImage} source={{ uri: user.image.imageUrl }} />
                  </Avatar>
                ) : (
                  <Avatar>
                    <Icon name="person" size={24} color={theme.primary} />
                  </Avatar>
                )
              }
              label={user.name}
              onPress={() => navigation.navigate('Account')}
            />
            <Item
              Icon={<McIcon color="#dc3545" size={SIZE_ICON} name="application-export" />}
              label="Sair"
              onPress={handleLogout}
            />
          </>
        ) : (
          <Item
            Icon={<McIcon size={SIZE_ICON} color={theme.contrast} name="application-import" />}
            label="Entrar"
            onPress={() => navigation.navigate('Login')}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Drawer;
