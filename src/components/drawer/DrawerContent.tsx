import React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { DrawerHeader, DrawerHeaderText, RestaurantStatus } from './styles';
import { useSelector } from '../../store/selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import { useAuth } from '../../hooks/auth';

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'sans-serif-light',
  },
});

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
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.secondary }}>
      <DrawerHeader>
        <DrawerHeaderText>{restaurant ? restaurant.name : 'Carregando'}</DrawerHeaderText>
        <RestaurantStatus status={restaurant ? restaurant.is_open : false} />
      </DrawerHeader>
      <DrawerItem
        icon={props => <Icon color="#fff" size={props.size} name="home" />}
        label="Início"
        labelStyle={styles.label}
        style={{ marginVertical: 0 }}
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        icon={props => <Icon color="#fff" size={props.size} name="local-offer" />}
        label="Ofertas"
        labelStyle={styles.label}
        onPress={() => navigation.navigate('Offers')}
      />
      <DrawerItem
        icon={props => <McIcon color="#fff" size={props.size} name="book" />}
        label="Cardápio"
        labelStyle={styles.label}
        onPress={() => navigation.navigate('Menu')}
      />
      <DrawerItem
        icon={props => <Icon color="#fff" size={props.size} name="shopping-cart" />}
        label="Carrinho"
        labelStyle={styles.label}
        onPress={() => navigation.navigate('Cart')}
      />
      <DrawerItem
        icon={props => <Icon color="#fff" size={props.size} name="contact-phone" />}
        label="Contato"
        labelStyle={styles.label}
        onPress={() => navigation.navigate('Contact')}
      />
      {user ? (
        <>
          <DrawerItem
            icon={props => <Icon color="#fff" size={props.size} name="assignment" />}
            label="Meus pedidos"
            labelStyle={styles.label}
            onPress={() => navigation.navigate('Orders')}
          />
          <DrawerItem
            icon={() =>
              user.image ? (
                <Avatar.Image size={24} source={{ uri: user.image.imageUrl }} />
              ) : (
                <Avatar.Icon size={24} icon="person" />
              )
            }
            label={user.name}
            labelStyle={styles.label}
            onPress={() => navigation.navigate('Account')}
          />
          <DrawerItem
            icon={props => <McIcon color="#fff" size={props.size} name="application-export" />}
            label="Sair"
            labelStyle={styles.label}
            onPress={handleLogout}
          />
        </>
      ) : (
        <DrawerItem
          icon={props => <McIcon size={props.size} color="#fff" name="application-import" />}
          label="Entrar"
          labelStyle={styles.label}
          onPress={() => navigation.navigate('Login')}
        />
      )}
    </DrawerContentScrollView>
  );
};

export default Drawer;
