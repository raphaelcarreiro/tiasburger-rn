import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Restaurant } from '../../@types/restaurant';
import Typography from '../../components/bases/typography/Text';
import { RestaurantStatus } from './styles';

const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    position: 'relative',
    paddingTop: 16,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  content: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: -35,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 3,
  },
  restaurantOpen: {
    borderColor: '#28a745',
  },
  restaurantClosed: {
    borderColor: '#dc3545',
  },
  logoWrapper: {
    width: 115,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantDescription: {
    maxWidth: WIDTH - 130,
  },
});

interface InfoProps {
  restaurant: Restaurant;
}

const Info: React.FC<InfoProps> = ({ restaurant }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Image
            style={restaurant.is_open ? [styles.logo, styles.restaurantOpen] : [styles.logo, styles.restaurantClosed]}
            source={{ uri: restaurant.image.imageThumbUrl }}
          />
        </View>
        <View>
          <Typography bold size={24}>
            {restaurant.name}
          </Typography>
          <Typography
            numberOfLines={1}
            ellipsizeMode="tail"
            variant="caption"
            size={14}
            style={styles.restaurantDescription}
          >
            {restaurant.description}
          </Typography>
          <View style={styles.status}>
            <Typography bold>{restaurant.is_open ? 'aberto' : 'fechado'}</Typography>
            <RestaurantStatus status={restaurant.is_open} />
          </View>
        </View>
      </View>
      <View style={styles.info}>
        {restaurant.configs.delivery_time > 0 && (
          <Typography size={20}>
            <Icon name="clock-outline" size={24} /> {restaurant.configs.delivery_time} minutos
          </Typography>
        )}
        {restaurant.configs.order_minimum_value > 0 && restaurant.configs.tax_mode !== 'order_value' && (
          <Typography size={20}>{restaurant.configs.formattedOrderMinimumValue} mínimo</Typography>
        )}
      </View>
    </View>
  );
};

export default Info;
