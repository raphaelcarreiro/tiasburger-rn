import React from 'react';
import AppBarAction from '../../../../components/appbar/AppBarAction';

interface ActionProps {
  handleSubmit(): void;
  saving: boolean;
}

const AddressFormActions: React.FC<ActionProps> = ({ handleSubmit, saving }) => {
  return (
    <>
      <AppBarAction iconName="check" onPress={handleSubmit} disabled={saving} />
    </>
  );
};

export default AddressFormActions;
