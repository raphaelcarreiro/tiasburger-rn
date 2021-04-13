import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { CartProduct } from '../../../../@types/cart';
import { Product } from '../../../../@types/product';

type ProductType = Product | CartProduct;

export type ProductSimpleValue = {
  product: ProductType | null;
  setProduct: Dispatch<SetStateAction<Product | null>> | Dispatch<SetStateAction<CartProduct | null>>;
  handleClickAdditional(additionalId: number, amount: number): void;
  handleClickIngredient(ingredientId: number): void;
};

const ProductSimpleContext = createContext<ProductSimpleValue>({} as ProductSimpleValue);
export const ProductSimpleProvider = ProductSimpleContext.Provider;

export function useProductSimple(): ProductSimpleValue {
  const context = useContext(ProductSimpleContext);
  return context;
}
