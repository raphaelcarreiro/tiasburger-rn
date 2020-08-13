import React from 'react';
import AppBarAction from '../../../../components/appbar/AppBarAction';

interface ActionProps {
  handleSubmit(): void;
  saving: boolean;
  handleDelete(): void;
}

const AddressFormActions: React.FC<ActionProps> = ({ handleSubmit, saving, handleDelete }) => {
  return (
    <>
      <AppBarAction iconName="delete" onPress={handleDelete} disabled={saving} />
      <AppBarAction iconName="check" onPress={handleSubmit} disabled={saving} />
    </>
  );
};

export default AddressFormActions;
