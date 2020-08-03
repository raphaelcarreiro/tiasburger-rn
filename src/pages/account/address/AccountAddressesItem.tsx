import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Address } from '../../../store/modules/user/reducer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface AccountAddressesItemProps {
  address: Address;
}

const AccountAddressesItem: React.FC<AccountAddressesItemProps> = ({ address }) => {
  return (
    <TouchableOpacity>
      <Text>{address.address}</Text>
    </TouchableOpacity>
  );
};

export default AccountAddressesItem;
