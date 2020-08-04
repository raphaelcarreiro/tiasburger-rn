import React, { useContext } from 'react';
import { UserState } from 'src/context-api/user-customer/reducer';

interface AccountContextData {
  userCustomer: UserState;
  dispatch(action: any): void;
}

export const AccountContext = React.createContext({} as AccountContextData);

export function useAccount(): AccountContextData {
  const context = useContext(AccountContext);
  return context;
}
