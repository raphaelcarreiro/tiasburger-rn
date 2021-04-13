import { createContext, useContext } from 'react';
import { Product } from '../../@types/product';

export type ProductsContextData = {
  handleSelectProduct(product: Product | null): void;
  selectedProduct: Product | null;
  handleAddProductToCart(): void;
  handlePrepareProduct(product: Product, amount?: number): void;
  isComplement: boolean;
  isPizza: boolean;
  isSimple: boolean;
};

export const ProductContext = createContext<ProductsContextData>({} as ProductsContextData);

export function useProducts(): ProductsContextData {
  const context = useContext(ProductContext);
  return context;
}
