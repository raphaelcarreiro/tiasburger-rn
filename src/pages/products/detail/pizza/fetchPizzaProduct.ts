import { Complement, Product } from '../../../../@types/product';
import { moneyFormat } from '../../../../helpers/numberFormat';
import api from '../../../../services/api';

export async function fetchPizzaProduct(productId: number): Promise<{ product: Product; sizeSelected: Complement }> {
  let sizeSelected: Complement = {} as Complement;

  const response = await api.get<Product>(`/products/${productId}`);
  const product = response.data;

  const categories = product.complement_categories.map(category => {
    category.product_complement_category_id = category.id;
    category.complements = category.complements.map(complement => {
      complement.product_complement_id = complement.id;
      complement.formattedPrice = complement.price && moneyFormat(complement.price);
      if (category.is_pizza_size && category.complements.length === 1) {
        complement.selected = true;
        sizeSelected = complement;
      } else complement.selected = !!complement.selected;

      complement.prices = complement.prices.map((price, index) => {
        price.product_complement_price_id = price.id;
        price.formattedPrice = price.price && moneyFormat(price.price);
        price.selected = index === 0;
        return price;
      });

      complement.ingredients = complement.ingredients.map(ingredient => {
        ingredient.product_complement_ingredient_id = ingredient.id;
        return ingredient;
      });

      complement.additional = complement.additional.map(additional => {
        additional.product_complement_additional_id = additional.id;
        additional.prices = additional.prices.map(price => {
          price.product_complement_additional_price_id = price.id;
          price.selected = price.product_complement_size_id === sizeSelected.id;
          price.formattedPrice = price.price && moneyFormat(price.price);
          return price;
        });
        return additional;
      });
      return complement;
    });
    return category;
  });

  return {
    product: {
      ...product,
      ready: false,
      complement_categories: categories,
    },
    sizeSelected,
  };
}
