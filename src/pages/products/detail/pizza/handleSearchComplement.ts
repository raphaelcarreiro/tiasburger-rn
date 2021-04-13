import { CartProduct } from '../../../../@types/cart';
import { Product } from '../../../../@types/product';

export function handleSearchComplement<T extends Product | CartProduct>(
  product: T,
  searchValue: string,
  searchedCategoryId: number,
): T {
  product = JSON.parse(JSON.stringify(product));

  const category = product.complement_categories.find(c => c.id === searchedCategoryId);

  if (!category) return product;

  category.complements = category.complements.filter(complement => {
    const complementName = complement.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return complementName.indexOf(searchValue.toLowerCase()) !== -1;
  });

  return {
    ...product,
    complement_categories: product.complement_categories.map(category => {
      if (category.id === searchedCategoryId) {
        return category;
      }
      return category;
    }),
  };
}
