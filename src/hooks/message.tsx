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

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(
    (messageParam: string) => {
      if (open) {
        setOpen(false);
        setTimeout(() => {
          setMessage(messageParam);
          setOpen(true);
        }, 350);
        return;
      }

      setMessage(messageParam);
      setOpen(true);
    },
    [open],
  );

  return (
    <MessageContext.Provider value={{ handleOpen, handleClose }}>
      {children}
      <Message message={message} open={open} handleClose={handleClose} />
    </MessageContext.Provider>
  );
};

export default MessageProvider;
