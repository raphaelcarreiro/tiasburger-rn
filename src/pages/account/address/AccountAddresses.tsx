import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from '../../../store/selector';
import AccountAddressesItem from './AccountAddressesItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AccountAddresses: React.FC = () => {
  const user = useSelector(state => state.user);
  return (
    <View style={styles.container}>
      <FlatList
        data={user?.customer.addresses}
        keyExtractor={item => item.address}
        renderItem={({ item }) => <AccountAddressesItem address={item} />}
      />
    </View>
  );
};

export default AccountAddresses;
