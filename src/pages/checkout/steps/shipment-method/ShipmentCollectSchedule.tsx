import React, { useState } from 'react';
import Modal from '../../../../components/modal/Modal';
import Typography from '../../../../components/bases/typography/Text';
import { View, StyleSheet, Platform, Alert } from 'react-native';
import { useSelector } from '../../../../store/selector';
import { useDispatch } from 'react-redux';
import { addMinutes, isBefore, format, parseISO } from 'date-fns';
import Button from '../../../../components/bases/button/Button';
import { useCheckout } from '../../checkoutContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setSchedule } from '../../../../store/modules/order/actions';

type ShipmentCollectScheduleProps = {
  open: boolean;
  handleClose(): void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  button: {
    width: 100,
  },
});

const ShipmentCollectSchedule: React.FC<ShipmentCollectScheduleProps> = props => {
  const restaurant = useSelector(state => state.restaurant);
  const order = useSelector(state => state.order);
  const checkout = useCheckout();
  const dispatch = useDispatch();
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [scheduledAt, setScheduledAt] = useState<Date>(() => {
    if (!restaurant) return new Date();
    return order.shipment.scheduled_at
      ? parseISO(order.shipment.scheduled_at)
      : addMinutes(new Date(), restaurant.configs.delivery_time + 2);
  });

  function handleAnswerYes() {
    setShowTimePicker(true);
  }

  function handleAnswerNo() {
    dispatch(setSchedule(null));
    props.handleClose();
    checkout.handleStepNext();
  }

  const onChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === 'set')
      if (selectedDate) {
        setShowTimePicker(Platform.OS === 'ios');
        if (!restaurant) return;
        const availableTime = addMinutes(new Date(), restaurant.configs.delivery_time + 1);
        const formattedTime = format(availableTime, 'H:mm');
        if (isBefore(selectedDate, availableTime)) {
          Alert.alert('Horário inválido', `Escolha um horário posterior as ${formattedTime}.`);
          return;
        }
        setScheduledAt(selectedDate);
        dispatch(setSchedule(selectedDate));
        props.handleClose();
        checkout.handleStepNext();
        return;
      }
    setShowTimePicker(Platform.OS === 'ios');
  };

  return (
    <Modal {...props} title="Agendar retirada">
      <View style={styles.container}>
        <Typography size={18}>Deseja agendar a retirada?</Typography>
        <View style={styles.actions}>
          <Button style={styles.button} variant="contained" color="primary" onPress={handleAnswerYes}>
            Sim
          </Button>
          <Button style={styles.button} variant="contained" color="primary" onPress={handleAnswerNo}>
            Não
          </Button>
        </View>
        {showTimePicker && (
          <DateTimePicker value={scheduledAt} mode="time" is24Hour={true} display="default" onChange={onChange} />
        )}
      </View>
    </Modal>
  );
};

export default ShipmentCollectSchedule;
