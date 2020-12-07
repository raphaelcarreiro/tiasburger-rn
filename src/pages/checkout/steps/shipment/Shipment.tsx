import React, { useEffect, useState } from 'react';
import { useSelector } from '../../../../store/selector';
import { useDispatch } from 'react-redux';
import { setShipmentAddress } from '../../../../store/modules/order/actions';
import { OrderShipment } from '../../../../@types/order';
import { StyleSheet, View } from 'react-native';
import ShipmentAddresses from './ShipmentAddresses';
import Typography from '../../../../components/bases/typography/Text';
import { ButtonNewAddress } from '../../../account/address/styles';
import AddressNew from '../../../account/address/new/AddressNew';
import AddressEdit from '../../../account/address/edit/AddressEdit';
import { Address } from '../../../../@types/address';
import api from '../../../../services/api';
import { useMessage } from '../../../../hooks/message';
import { deleteCustomerAddress } from '../../../../store/modules/user/actions';
import { useCheckout } from '../../checkoutContext';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 30,
  },
});

const Shipment: React.FC = () => {
  const order = useSelector(state => state.order);
  const customer = useSelector(state => state.user)?.customer;
  const restaurant = useSelector(state => state.restaurant);
  const dispatch = useDispatch();
  const [modalNewAddress, setModalNewAddress] = useState(false);
  const [modalEditAddress, setModalEditAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [saving, setSaving] = useState(false);
  const messaging = useMessage();
  const checkout = useCheckout();

  useEffect(() => {
    if (customer)
      if (customer.addresses)
        if (customer.addresses.length === 0) {
          setModalNewAddress(true);
          dispatch(setShipmentAddress({} as OrderShipment));
        }
  }, [customer, dispatch]);

  function handleConfirmDelete() {
    if (!selectedAddress) return;
    setSaving(true);
    api
      .delete(`/customerAddresses/${selectedAddress.id}`)
      .then(() => {
        messaging.handleOpen('Excluído');
        dispatch(deleteCustomerAddress(selectedAddress.id));
        if (order.shipment.id === selectedAddress.id) {
          dispatch(setShipmentAddress({} as OrderShipment));
        }
      })
      .catch(err => {
        if (err.response) console.log('customer address delete', err.response.data.error);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  function handleSelectAddress(address: Address) {
    if (!restaurant) return;

    if (restaurant.configs.tax_mode === 'district' && !address.area_region) {
      setSelectedAddress(address);
      setModalEditAddress(true);
      messaging.handleOpen('Por favor, atualize o bairro');
      return;
    }

    if (restaurant.delivery_max_distance) {
      if (address.distance === null) {
        messaging.handleOpen('Não é possível entregar nesse endereço');
        return;
      }

      if (address.distance > restaurant.delivery_max_distance) {
        messaging.handleOpen('Não entregamos nesse endereço');
        return;
      }
    }

    dispatch(
      setShipmentAddress({
        ...address,
        complement: address.address_complement,
        shipment_method: 'delivery',
        scheduled_at: null,
        formattedScheduledAt: null,
      }),
    );
    checkout.handleSetStepById('STEP_PAYMENT');
  }

  return (
    <>
      {modalNewAddress && <AddressNew open={true} onExited={() => setModalNewAddress(false)} />}
      {modalEditAddress && selectedAddress && (
        <AddressEdit address={selectedAddress} open={true} onExited={() => setModalEditAddress(false)} />
      )}

      {saving}

      <View style={styles.container}>
        {customer && (
          <>
            {customer.addresses.map(address => (
              <ShipmentAddresses
                key={String(address.id)}
                address={address}
                setSelectedAddress={(address: Address) => setSelectedAddress(address)}
                openModalEditAddress={() => setModalEditAddress(true)}
                handleConfirmDelete={handleConfirmDelete}
                handleSelectAddress={handleSelectAddress}
              />
            ))}
            <ButtonNewAddress onPress={() => setModalNewAddress(true)}>
              <Typography>Adicionar endereço</Typography>
            </ButtonNewAddress>
          </>
        )}
      </View>
    </>
  );
};

export default Shipment;
