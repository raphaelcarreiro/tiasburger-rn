import React from 'react';

import { StyleSheet, View } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import { OrderShipment as OrderShipmentType } from '../../../@types/order';

const styles = StyleSheet.create({
  section: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 15,
  },
});

type OrderShipmentProps = {
  shipment: OrderShipmentType;
};

const OrderShipment: React.FC<OrderShipmentProps> = ({ shipment }) => {
  return (
    <>
      <View style={styles.section}>
        <Typography bold size={18} gutterBottom>
          endereço de entrega
        </Typography>

        <Typography>
          {shipment.address}, {shipment.number}, {shipment.district}
          {shipment.complement && `, ${shipment.complement}`}
        </Typography>
        <Typography variant="caption">
          {shipment.city} - {shipment.region}
        </Typography>
        {shipment.postal_code !== '00000000' && <Typography variant="caption">{shipment.postal_code}</Typography>}
      </View>
    </>
  );
};

export default OrderShipment;
