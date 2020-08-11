import { createContext, useContext } from 'react';
import { Product } from '../../@types/product';

export type ProductContextData = {
  handleSelectProduct(product: Product | null): void;
  selectedProduct: Product | null;
  handleAddProductToCart(): void;
  handlePrepareProduct(product: Product, amount?: number): void;
  isComplement: boolean;
  isPizza: boolean;
  isSimple: boolean;
};

export const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export function useProduct(): ProductContextData {
  const context = useContext(ProductContext);
  return context;
}
