import React, { useContext, useCallback, useState, useEffect } from 'react';
import Message from '../components/message/Message';

interface MessageContextData {
  handleOpen(message: string): void;
  handleClose(): void;
}

const MessageContext = React.createContext({} as MessageContextData);

export function useMessage(): MessageContextData {
  const context = useContext(MessageContext);
  return context;
}

const MessageProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open)
      setTimeout(() => {
        setOpen(false);
      }, 6000);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback((messageParam: string) => {
    setMessage(messageParam);
    setOpen(true);
  }, []);

  return (
    <MessageContext.Provider value={{ handleOpen, handleClose }}>
      {children}
      <Message message={message} open={open} handleClose={handleClose} />
    </MessageContext.Provider>
  );
};

export default MessageProvider;
