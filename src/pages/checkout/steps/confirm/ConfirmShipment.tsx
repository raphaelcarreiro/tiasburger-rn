import React, { useMemo } from 'react';
import Typography from '../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import { useSelector } from '../../../../store/selector';
import { useCheckout } from '../../checkoutContext';
import IconButton from '../../../../components/bases/icon-button/IconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  section: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  deliveryTime: {
    marginTop: 7,
  },
  actions: {
    marginTop: 5,
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  button: {
    width: 60,
  },
});

const ConfirmShipment: React.FC = () => {
  const order = useSelector(state => state.order);
  const restaurant = useSelector(state => state.restaurant);
  const { handleSetStep } = useCheckout();

  const mainRestaurantAddress = useMemo(() => {
    if (!restaurant) return;
    const address = restaurant.addresses.find(address => address.is_main);
    return address;
  }, [restaurant]);

  return (
    <>
      {order.shipment.shipment_method === 'delivery' ? (
        <View style={styles.section}>
          <Typography bold size={18} gutterBottom>
            Endereço de entrega
          </Typography>

          <Typography>
            {order.shipment.address}, {order.shipment.number}, {order.shipment.district}
            {order.shipment.complement && `, ${order.shipment.complement}`}
            {order.shipment.postal_code !== '00000000' && `, ${order.shipment.postal_code}`}
          </Typography>
          {restaurant?.configs.delivery_time && (
            <View style={styles.deliveryTime}>
              <Typography variant="caption" size={14}>
                Tempo estimado para entrega, {restaurant.configs.delivery_time} min
              </Typography>
            </View>
          )}
          <View style={styles.actions}>
            <IconButton onPress={() => handleSetStep(1)} Icon={<Icon color="#666" name="edit" size={24} />} />
          </View>
        </View>
      ) : (
        <View style={styles.section}>
          <Typography bold size={18} gutterBottom>
            Endereço de entrega
          </Typography>

          <Typography>
            {mainRestaurantAddress?.address}, {mainRestaurantAddress?.number}, {mainRestaurantAddress?.district}
            {mainRestaurantAddress?.postal_code}
          </Typography>
          {restaurant?.configs.delivery_time && (
            <View style={styles.deliveryTime}>
              <Typography variant="caption" size={14}>
                Tempo estimado para entrega, {restaurant.configs.delivery_time} min
              </Typography>
            </View>
          )}
          <View style={styles.actions}>
            <IconButton onPress={() => handleSetStep(1)} Icon={<Icon color="#666" name="edit" size={24} />} />
          </View>
        </View>
      )}
    </>
  );
};

export default ConfirmShipment;
