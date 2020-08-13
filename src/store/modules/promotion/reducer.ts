import { moneyFormat } from '../../../helpers/numberFormat';
import { Promotion } from '../../../@types/promotion';
import { PromotionTypeActions, SET_PROMOTIONS } from './type';

export const INITIAL_STATE: Promotion[] = [];

export default function promotions(state = INITIAL_STATE, action: PromotionTypeActions): Promotion[] {
  switch (action.type) {
    case SET_PROMOTIONS: {
      const promotions = action.promotions.map(promotion => {
        promotion.offered_products = promotion.offered_products.map(product => {
          product.additional = product.additional.map(additional => {
            additional.formattedPrice = moneyFormat(additional.price);
            additional.selected = false;
            return additional;
          });
          product.ingredients = product.ingredients.map(ingredient => {
            ingredient.selected = true;
            return ingredient;
          });
          return product;
        });
        return promotion;
      });
      return promotions;
    }

    default: {
      return state;
    }
  }
}
