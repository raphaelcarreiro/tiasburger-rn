import { createContext, useContext } from 'react';

type DialogContextProps = {
  handleCancelPress(): void;
};

export const DialogContext = createContext<DialogContextProps>({} as DialogContextProps);

export function useDialog(): DialogContextProps {
  const context = useContext(DialogContext);
  return context;
}
