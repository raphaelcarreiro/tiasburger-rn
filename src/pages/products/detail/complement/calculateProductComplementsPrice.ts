import { CartProduct } from '../../../../@types/cart';
import { Product } from '../../../../@types/product';

export function calculateProductComplementsPrice<T extends Product | CartProduct>(product: T): number {
  const price = product.complement_categories.reduce((value, category) => {
    const categoryPrice = category.complements.reduce((sum, complement) => {
      return complement.selected && complement.price ? sum + complement.price : sum;
    }, 0);
    return categoryPrice + value;
  }, 0);

  return price;
}
