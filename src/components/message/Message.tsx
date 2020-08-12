import React, { useEffect, useCallback, useRef } from 'react';
import { Container, MessageText, CloseButton, CloseButtonText, MessageTextContainer } from './styles';
import { Animated } from 'react-native';

interface MessageProps {
  message: string;
  open: boolean;
  handleClose(): void;
}

const Message: React.FC<MessageProps> = ({ message, open, handleClose }) => {
  const slide = useRef(new Animated.Value(300)).current;

  const hide = useCallback(() => {
    Animated.timing(slide, {
      useNativeDriver: true,
      toValue: 300,
      duration: 100,
    }).start();
  }, [slide]);

  const show = useCallback(() => {
    Animated.timing(slide, {
      useNativeDriver: true,
      toValue: 0,
      duration: 100,
    }).start();
  }, [slide]);

  useEffect(() => {
    if (open) show();
    else hide();
  }, [open, show, hide]);

  return (
    <Container style={{ transform: [{ translateY: slide }] }}>
      <MessageTextContainer>
        <MessageText>{message}</MessageText>
      </MessageTextContainer>
      <CloseButton onPress={handleClose}>
        <CloseButtonText>Fechar</CloseButtonText>
      </CloseButton>
    </Container>
  );
};

export default Message;
