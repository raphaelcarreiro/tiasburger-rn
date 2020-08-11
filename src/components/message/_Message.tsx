import React from 'react';
// import { Container, MessageText, CloseButton, CloseButtonText, MessageTextContainer } from './styles';
import { Snackbar } from 'react-native-paper';

interface MessageProps {
  message: string;
  open: boolean;
  handleClose(): void;
}

const Message: React.FC<MessageProps> = ({ message, open, handleClose }) => {
  return (
    <>
      <Snackbar
        style={{ backgroundColor: '#2a2a2a' }}
        visible={open}
        onDismiss={handleClose}
        action={{
          label: 'Fechar',
          onPress: () => {
            // Do something
          },
        }}
      >
        {message}
      </Snackbar>
    </>
  );
};

export default Message;
