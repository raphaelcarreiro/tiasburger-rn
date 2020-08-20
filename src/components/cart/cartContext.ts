import { createContext, useContext } from 'react';
import { CartProduct } from '../../@types/cart';

export type CartContextData = {
  handleSelectProduct(product: CartProduct | null): void;
  selectedProduct: CartProduct | null;
  handleUpdateCartProduct(product: CartProduct, amount: number): void;
  isComplement: boolean;
  isPizza: boolean;
  isSimple: boolean;
};

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function useCart(): CartContextData {
  const context = useContext(CartContext);
  return context;
}
