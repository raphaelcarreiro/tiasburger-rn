import React, { useContext } from 'react';
import { UserState } from 'src/context-api/user-customer/reducer';

export type AccountValidation = {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
};

interface AccountContextData {
  userCustomer: UserState;
  dispatch(action: any): void;
  validation: AccountValidation;
  handleValidation(): void;
  setValidation(validation: AccountValidation): void;
}

export const AccountContext = React.createContext({} as AccountContextData);

export function useAccount(): AccountContextData {
  const context = useContext(AccountContext);
  return context;
}
