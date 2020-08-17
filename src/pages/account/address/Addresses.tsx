import React, { useState, useMemo } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { useSelector } from '../../../store/selector';
import AccountAddressesItem from './AddressesItem';
import AddressEdit from './edit/AddressEdit';
import AddressNew from './new/AddressNew';
import { ButtonNewAddress } from './styles';
import Text from '../../../components/bases/typography/Text';
import api from '../../../services/api';
import { useDispatch } from 'react-redux';
import { deleteCustomerAddress, setMainCustomerAddress } from '../../../store/modules/user/actions';
import Loading from '../../../components/loading/Loading';
import { useMessage } from '../../../hooks/message';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  list: {
    width: '100%',
  },
});

const AccountAddresses: React.FC = () => {
  const user = useSelector(state => state.user);
  const [selectedIdAddress, setSelectedIdAddress] = useState<number | null>(null);
  const [modalNewAddress, setModalNewAddress] = useState(false);
  const [modalEditAddress, setModalEditAddress] = useState(false);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const messaging = useMessage();

  const selectedAddress = useMemo(() => {
    if (!user || !selectedIdAddress) return null;
    const address = user.customer.addresses.find(a => a.id === selectedIdAddress);

    if (!address) return null;

    return address;
  }, [selectedIdAddress, user]);

  function handleSetSelectedIdAddress(addressId: number): void {
    setSelectedIdAddress(addressId);
  }

  function handleDelete() {
    Alert.alert('Excluir', 'Você realmente deseja excluir esse endereço?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        style: 'default',
        onPress: confirm,
      },
    ]);

    function confirm() {
      if (!selectedIdAddress) return;

      setSaving(true);

      api
        .delete(`/customerAddresses/${selectedIdAddress}`)
        .then(() => {
          dispatch(deleteCustomerAddress(selectedIdAddress));
          setSaving(false);
        })
        .catch(err => {
          if (err.response) messaging.handleOpen(err.response.data.error);
        })
        .finally(() => {
          setSaving(false);
        });
    }
  }

  function handleSetMainAddress() {
    if (!selectedIdAddress) return;

    setSaving(true);

    api
      .put(`customer/addresses/main/${selectedIdAddress}`)
      .then(() => {
        dispatch(setMainCustomerAddress(selectedIdAddress));
        messaging.handleOpen('Atualizado');
      })
      .catch(err => {
        if (err.response) messaging.handleOpen(err.response.data.error);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  return (
    <>
      {modalEditAddress && (
        <AddressEdit open={true} onExited={() => setModalEditAddress(false)} address={selectedAddress} />
      )}
      {modalNewAddress && <AddressNew open={true} onExited={() => setModalNewAddress(false)} />}
      {saving && <Loading />}
      <View style={styles.container}>
        <FlatList
          ListFooterComponent={
            <ButtonNewAddress onPress={() => setModalNewAddress(true)}>
              <Text size={18}>Adicionar endereço</Text>
            </ButtonNewAddress>
          }
          style={styles.list}
          data={user?.customer.addresses}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <AccountAddressesItem
              address={item}
              handleSetSelectedIdAddress={handleSetSelectedIdAddress}
              openModalEditAddress={() => setModalEditAddress(true)}
              handleDelete={handleDelete}
              handleSetMainAddress={handleSetMainAddress}
              selectedAddress={selectedAddress}
            />
          )}
        />
      </View>
    </>
  );
};

export default AccountAddresses;
