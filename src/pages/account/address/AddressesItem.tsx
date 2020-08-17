import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../../../components/bases/typography/Text';
import { Address } from '../../../@types/address';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconButton from '../../../components/bases/icon-button/IconButton';
import Options from '../../../components/options/Options';
import Button from '../../../components/bases/button/Button';
import { useTheme } from 'styled-components';

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  text: {
    fontSize: 18,
  },
  iconButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    marginBottom: 10,
  },
  star: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

interface AccountAddressesItemProps {
  address: Address;
  handleSetSelectedIdAddress(addressId: number): void;
  openModalEditAddress(): void;
  handleDelete(): void;
  handleSetMainAddress(): void;
  selectedAddress: Address | null;
}

const AccountAddressesItem: React.FC<AccountAddressesItemProps> = ({
  address,
  handleSetSelectedIdAddress,
  openModalEditAddress,
  handleDelete,
  handleSetMainAddress,
  selectedAddress,
}) => {
  const [optionsShown, setOptionsShown] = useState(false);
  const theme = useTheme();

  function handlePress(addressId: number): void {
    handleSetSelectedIdAddress(addressId);
  }

  function handleMorePress(addressId: number): void {
    handleSetSelectedIdAddress(addressId);
    setOptionsShown(true);
  }

  function handleEditPress() {
    openModalEditAddress();
    setOptionsShown(!optionsShown);
  }

  function handleMainAddressPress() {
    setOptionsShown(!optionsShown);
    handleSetMainAddress();
  }

  return (
    <>
      {optionsShown && (
        <Options open={true} handleClose={() => setOptionsShown(!optionsShown)}>
          <Button variant="text" onPress={handleEditPress}>
            Alterar
          </Button>
          {selectedAddress && !selectedAddress.is_main && (
            <Button variant="text" onPress={handleMainAddressPress}>
              Marcar como principal
            </Button>
          )}
          <Button style={styles.button} variant="text" color="error" onPress={handleDelete}>
            Excluir
          </Button>
        </Options>
      )}
      <TouchableOpacity style={styles.listItem} onPress={() => handlePress(address.id)}>
        <Text size={22}>
          {address.address}, {address.number}
        </Text>
        <Text>{address.district}</Text>
        <Text>
          {address.city}, {address.region}
        </Text>
        <IconButton
          style={styles.iconButton}
          onPress={() => handleMorePress(address.id)}
          Icon={<Icon name="more-vert" size={24} color="#666" />}
        />
        {address.is_main && <Icon style={styles.star} name="star" size={20} color={theme.primary} />}
      </TouchableOpacity>
    </>
  );
};

export default AccountAddressesItem;
