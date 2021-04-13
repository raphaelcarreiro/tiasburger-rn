import { Cart } from '../../../../@types/cart';
import { Promotion } from '../../../../@types/promotion';

type Complement = {
  complement_id: number;
  test: boolean;
};

type CheckComplement = {
  complement_category_id: number;
  complements: Complement[];
};

export function checkProducts(cart: Cart, promotion: Promotion): boolean {
  // promoção com regras de produtos
  const cartProducts = cart.products;

  const response = promotion.products.every(promotionProduct => {
    const products = cartProducts.filter(cp => cp.id === promotionProduct.product_id);

    let matches = 0;

    if (products.length > 0) {
      products.forEach(cartProduct => {
        let checkedComplements: CheckComplement[] = [];
        promotionProduct.complement_categories.forEach(category => {
          const cartComplementCategory = cartProduct.complement_categories.find(
            cc => cc.id === category.product_complement_category_id,
          );

          category.complements.forEach(complement => {
            if (cartComplementCategory) {
              const checkedCategory = checkedComplements.some(
                c => c.complement_category_id === cartComplementCategory.id,
              );
              if (!checkedCategory)
                checkedComplements.push({
                  complement_category_id: cartComplementCategory.id,
                  complements: [],
                });
              const test = cartComplementCategory.complements.some(
                cartComplement =>
                  cartComplement.product_complement_id === complement.product_complement_id && cartComplement.selected,
              );
              checkedComplements = checkedComplements.map(_category => {
                if (_category.complement_category_id === cartComplementCategory.id)
                  _category.complements = [
                    ..._category.complements,
                    {
                      complement_id: complement.product_complement_id,
                      test,
                    },
                  ];

                return _category;
              });
            } else {
              checkedComplements.push({
                complement_category_id: category.id,
                complements: [],
              });
            }
          });
        });

        const test = checkedComplements.every(category => {
          const checkedComplement = category.complements.some(complement => complement.test);
          return checkedComplement;
        });

        matches = test ? matches + 1 * cartProduct.amount : matches;
      });

      return matches >= promotionProduct.amount;
    }

    return false;
  });

  return response;
}
