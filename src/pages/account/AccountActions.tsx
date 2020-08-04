import React from 'react';
import { Appbar } from 'react-native-paper';
import { useAccount } from './context/account';
import { imageDelete } from '../../context-api/user-customer/actions';

interface AccountActionsProps {
  handleSubmit(): void;
}

const AccountActions: React.FC<AccountActionsProps> = ({ handleSubmit }) => {
  const { userCustomer, dispatch } = useAccount();

  function handleImageDelete() {
    dispatch(imageDelete());
  }

  return (
    <Appbar.Header style={{ elevation: 0 }}>
      {userCustomer.isImageSelected ? (
        <Appbar.Action icon="delete" onPress={handleImageDelete} />
      ) : (
        <Appbar.Action icon="check" onPress={handleSubmit} />
      )}
    </Appbar.Header>
  );
};

export default AccountActions;
