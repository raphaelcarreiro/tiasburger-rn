import React, { useState, useMemo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from '../../../store/selector';
import AccountAddressesItem from './AddressesItem';
import AddressEdit from './edit/AddressEdit';
import AddressNew from './new/AddressNew';
import { ButtonNewAddress } from './styles';
import Text from '../../../components/bases/typography/Text';

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
  const [newAddress, setNewAddress] = useState(false);

  const selectedAddress = useMemo(() => {
    if (!user || !selectedIdAddress) return null;
    const address = user.customer.addresses.find(a => a.id === selectedIdAddress);

    if (!address) return null;

    return address;
  }, [selectedIdAddress, user]);

  function handleSetSelectedIdAddress(addressId: number): void {
    setSelectedIdAddress(addressId);
  }

  return (
    <View style={styles.container}>
      <AddressEdit open={!!selectedIdAddress} onExited={() => setSelectedIdAddress(null)} address={selectedAddress} />
      <AddressNew open={newAddress} onExited={() => setNewAddress(false)} />
      <FlatList
        ListFooterComponent={
          <ButtonNewAddress onPress={() => setNewAddress(true)}>
            <Text size={20}>Adicionar endereço</Text>
          </ButtonNewAddress>
        }
        style={styles.list}
        data={user?.customer.addresses}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <AccountAddressesItem address={item} handleSetSelectedIdAddress={handleSetSelectedIdAddress} />
        )}
      />
    </View>
  );
};

export default AccountAddresses;
