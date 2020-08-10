import React from 'react';
import { Appbar } from 'react-native-paper';

interface ActionProps {
  handleSubmit(): void;
  saving: boolean;
  handleDelete(): void;
}

const AddressFormActions: React.FC<ActionProps> = ({ handleSubmit, saving, handleDelete }) => {
  return (
    <Appbar.Header style={{ elevation: 0 }}>
      <Appbar.Action icon="delete" onPress={handleDelete} disabled={saving} />
      <Appbar.Action icon="check" onPress={handleSubmit} disabled={saving} />
    </Appbar.Header>
  );
};

export default AddressFormActions;
