import React, { useState } from 'react';
import { useCheckout } from '../../checkoutContext';
import { useSelector } from '../../../../store/selector';
import { setShipmentMethod, setSchedule } from '../../../../store/modules/order/actions';
import { useDispatch } from 'react-redux';
import ListItem from '../../../../components/list-item/ListItem';
import Typography from '../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import ShipmentCollectSchedule from './ShipmentCollectSchedule';

const styles = StyleSheet.create({
  button: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8,
  },
});

const ShipmentMethod: React.FC = () => {
  const checkout = useCheckout();
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant);
  const order = useSelector(state => state.order);

  const [modalCollectSchedule, setModalCollectSchedule] = useState(false);

  function handleSetCustomerCollect() {
    dispatch(setShipmentMethod('customer_collect'));
    if (restaurant?.configs.shipment_schedule) setModalCollectSchedule(true);
    else checkout.handleStepNext();
  }

  function handleSetDelivery() {
    dispatch(setShipmentMethod('delivery'));
    dispatch(setSchedule(null));
    checkout.handleStepNext();
  }

  function handleModalClose() {
    setModalCollectSchedule(false);
  }

  return (
    <View style={styles.container}>
      {modalCollectSchedule && <ShipmentCollectSchedule handleClose={handleModalClose} open={modalCollectSchedule} />}
      <ListItem style={styles.button} onPress={handleSetCustomerCollect}>
        <Typography size={20}>Quero retirar</Typography>
        {order.shipment.scheduled_at && (
          <Typography variant="caption">Agendado para as {order.shipment.formattedScheduledAt}</Typography>
        )}
      </ListItem>
      <ListItem style={styles.button} onPress={handleSetDelivery}>
        <Typography size={20}>Quero receber em casa</Typography>
      </ListItem>
    </View>
  );
};

export default ShipmentMethod;
