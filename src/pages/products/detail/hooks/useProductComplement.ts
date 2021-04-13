import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { CartProduct } from '../../../../@types/cart';
import { Product } from '../../../../@types/product';

export type ProductComplementValue = {
  product: (Product | CartProduct) | null;
  setProduct: Dispatch<SetStateAction<Product | null>> | Dispatch<SetStateAction<CartProduct | null>>;
  handleClickComplements(complementCategoryId: number, complementId: number): void;
};

const ProductComplementContext = createContext<ProductComplementValue>({} as ProductComplementValue);
export const ProductComplementProvider = ProductComplementContext.Provider;

export function useProductComplement(): ProductComplementValue {
  const context = useContext(ProductComplementContext);
  return context;
}
