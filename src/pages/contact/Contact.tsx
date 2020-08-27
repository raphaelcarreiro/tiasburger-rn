import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import Typography from '../../components/bases/typography/Text';
import AppBar from '../../components/appbar/Appbar';
import { useSelector } from '../../store/selector';
import ListItem from '../../components/list-item/ListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from '../../components/bases/icon-button/IconButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56,
    padding: 15,
  },
  listItemHeader: {
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Contact: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);

  function handleOpenWhatsApp(phoneNumber: string) {
    Linking.canOpenURL('whatsapp://send/app').then(enabled => {
      if (enabled) Linking.openURL(`whatsapp://send/${phoneNumber.replace(/\D/g, '')}`);
    });
  }

  function handleOpenEmail() {
    if (!restaurant) return;
    Linking.canOpenURL(`mailto:${restaurant.email}`).then(enabled => {
      if (enabled) Linking.openURL(`mailto:${restaurant.email}`);
    });
  }

  return (
    <>
      {restaurant && (
        <>
          <AppBar title="fala comigo" />
          <View style={styles.container}>
            <ListItem>
              <Typography size={12} bold style={styles.listItemHeader}>
                Telefones
              </Typography>
              {restaurant.phones.map(phone => (
                <View key={String(phone.id)} style={styles.item}>
                  <Typography>{phone.phone}</Typography>
                  <View>
                    <IconButton
                      onPress={() => handleOpenWhatsApp(phone.phone)}
                      Icon={<Icon size={24} name="whatsapp" />}
                    />
                  </View>
                </View>
              ))}
            </ListItem>
            <ListItem>
              <Typography size={12} bold style={styles.listItemHeader}>
                E-mail
              </Typography>
              <View style={styles.item}>
                <Typography>{restaurant.email}</Typography>
                <View>
                  <IconButton onPress={handleOpenEmail} Icon={<Icon size={24} name="email-send-outline" />} />
                </View>
              </View>
            </ListItem>
          </View>
        </>
      )}
    </>
  );
};

export default Contact;
