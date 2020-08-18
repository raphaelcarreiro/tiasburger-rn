import React, { useContext } from 'react';
import { UserCustomer } from '../../../context-api/user-customer/types';

export type AccountValidation = {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
};

interface AccountContextData {
  userCustomer: UserCustomer;
  dispatch(action: any): void;
  validation: AccountValidation;
  handleValidation(): void;
  setValidation(validation: AccountValidation): void;
  saving: boolean;
}

export const AccountContext = React.createContext({} as AccountContextData);

export function useAccount(): AccountContextData {
  const context = useContext(AccountContext);
  return context;
}
