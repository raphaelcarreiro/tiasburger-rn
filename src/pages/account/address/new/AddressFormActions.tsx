import React from 'react';
import { Appbar } from 'react-native-paper';

interface ActionProps {
  handleSubmit(): void;
  saving: boolean;
}

const AddressFormActions: React.FC<ActionProps> = ({ handleSubmit, saving }) => {
  return (
    <Appbar.Header style={{ elevation: 0 }}>
      <Appbar.Action icon="check" onPress={handleSubmit} disabled={saving} />
    </Appbar.Header>
  );
};

export default AddressFormActions;
