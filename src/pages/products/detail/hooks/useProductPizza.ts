import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { CartProduct } from '../../../../@types/cart';
import { Complement, Product } from '../../../../@types/product';

export type ProductPizzaValue = {
  product: Product | CartProduct | null;
  filteredProduct: Product | CartProduct | null;
  setProduct: Dispatch<SetStateAction<Product | null>> | Dispatch<SetStateAction<CartProduct | null>>;
  handleSearch(categoryId: number, searchValue: string): void;
  handleClickPizzaComplements(complementCategoryId: number, complementId: number): void;
  complementSizeSelected: Complement;
  setComplementCategoryIdSelected: Dispatch<SetStateAction<number | null>>;
  setComplementIdSelected: Dispatch<SetStateAction<number | null>>;
  complementCategoryIdSelected: number | null;
  complementIdSelected: number | null;
};

const ProductPizzaContext = createContext<ProductPizzaValue>({} as ProductPizzaValue);
export const ProductPizzaProvider = ProductPizzaContext.Provider;

export function useProductPizza(): ProductPizzaValue {
  const context = useContext(ProductPizzaContext);
  return context;
}
