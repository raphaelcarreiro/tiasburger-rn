import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Text from '../../../components/bases/typography/Text';
import { Address } from '../../../@types/address';

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 6,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.16,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  text: {
    fontSize: 18,
  },
});

interface AccountAddressesItemProps {
  address: Address;
  handleSetSelectedIdAddress(addressId: number): void;
}

const AccountAddressesItem: React.FC<AccountAddressesItemProps> = ({ address, handleSetSelectedIdAddress }) => {
  function handlePress(addressId: number): void {
    handleSetSelectedIdAddress(addressId);
  }

  return (
    <>
      <TouchableOpacity style={styles.listItem} onPress={() => handlePress(address.id)}>
        <Text size={22}>
          {address.address}, {address.number}
        </Text>
        <Text>{address.district}</Text>
        <Text>
          {address.city}, {address.region}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AccountAddressesItem;
