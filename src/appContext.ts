import { useContext, createContext } from 'react';

export type RedirectScreens = 'Home' | 'Account' | 'Checkout' | 'Menu' | 'Orders' | 'Order' | null;

type AppContextProps = {
  handleCartVisibility(): void;
  isCartVisible: boolean;
  setRedirect(screen: RedirectScreens): void;
  redirect: RedirectScreens;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function useApp(): AppContextProps {
  const context = useContext(AppContext);
  return context;
}
