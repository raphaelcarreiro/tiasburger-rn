import React from 'react';
import { Appbar } from 'react-native-paper';

interface ActionProps {
  handleSubmit(): void;
}

const AccountFormEditActions: React.FC<ActionProps> = ({ handleSubmit }) => {
  return (
    <Appbar.Header style={{ elevation: 0 }}>
      <Appbar.Action icon="check" onPress={handleSubmit} />
    </Appbar.Header>
  );
};

export default AccountFormEditActions;
