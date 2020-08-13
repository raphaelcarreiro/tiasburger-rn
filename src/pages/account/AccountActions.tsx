import React from 'react';
import { useAccount } from './context/account';
import { imageDelete } from '../../context-api/user-customer/actions';
import AppBarAction from '../../components/appbar/AppBarAction';

interface AccountActionsProps {
  handleSubmit(): void;
}

const AccountActions: React.FC<AccountActionsProps> = ({ handleSubmit }) => {
  const { userCustomer, dispatch } = useAccount();

  function handleImageDelete() {
    dispatch(imageDelete());
  }

  return (
    <>
      {userCustomer.isImageSelected ? (
        <AppBarAction iconName="delete" onPress={handleImageDelete} />
      ) : (
        <AppBarAction iconName="check" onPress={handleSubmit} />
      )}
    </>
  );
};

export default AccountActions;
