import React from 'react';
import { Address } from '../../../../store/modules/user/reducer';
import Modal from '../../../../components/modal/Modal';
import AccountFormEdit from '../edit/AccountFormEdit';

interface AddressEditProps {
  address: Address | null;
  open: boolean;
  onExited(): void;
}

const AddressEdit: React.FC<AddressEditProps> = ({ address, open, onExited }) => {
  return (
    <Modal title="Alterar endereço" open={open} handleClose={onExited}>
      <AccountFormEdit address={address} />
    </Modal>
  );
};

export default AddressEdit;
