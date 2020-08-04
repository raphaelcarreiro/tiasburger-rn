import React, { useState, useMemo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from '../../../store/selector';
import AccountAddressesItem from './AccountAddressesItem';
import AddressEdit from './edit/AddressEdit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  list: {
    flex: 1,
    width: '100%',
  },
});

const AccountAddresses: React.FC = () => {
  const user = useSelector(state => state.user);
  const [selectedIdAddress, setSelectedIdAddress] = useState<number | null>(null);

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
      <FlatList
        style={styles.list}
        data={user?.customer.addresses}
        keyExtractor={item => item.address}
        renderItem={({ item }) => (
          <AccountAddressesItem address={item} handleSetSelectedIdAddress={handleSetSelectedIdAddress} />
        )}
      />
    </View>
  );
};

export default AccountAddresses;
