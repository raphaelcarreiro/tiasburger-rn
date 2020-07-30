import React from 'react';
import { Container, MessageText, CloseButton, CloseButtonText, MessageTextContainer } from './styles';

interface MessageProps {
  message: string;
  open: boolean;
  handleClose(): void;
}

const Message: React.FC<MessageProps> = ({ message, open, handleClose }) => {
  return (
    <>
      {open && (
        <Container>
          <MessageTextContainer>
            <MessageText>{message}</MessageText>
          </MessageTextContainer>
          <CloseButton onPress={handleClose}>
            <CloseButtonText>Fechar</CloseButtonText>
          </CloseButton>
        </Container>
      )}
    </>
  );
};

export default Message;
