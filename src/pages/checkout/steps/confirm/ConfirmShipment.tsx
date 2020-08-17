import React, { useMemo } from 'react';
import Typography from '../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import { useSelector } from '../../../../store/selector';
import Button from '../../../../components/bases/button/Button';
import { useCheckout } from '../../checkoutContext';

const styles = StyleSheet.create({
  section: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  deliveryTime: {
    marginTop: 7,
  },
  actions: {
    marginTop: 7,
    alignItems: 'flex-end',
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
            <Button
              variant="text"
              color="primary"
              onPress={() => handleSetStep(1)}
              style={styles.button}
              disablePadding
            >
              Alterar
            </Button>
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
            <Button
              style={styles.button}
              disablePadding
              variant="text"
              color="primary"
              onPress={() => handleSetStep(1)}
            >
              Alterar
            </Button>
          </View>
        </View>
      )}
    </>
  );
};

export default ConfirmShipment;
