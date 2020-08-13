import { Cart } from '../../../../@types/cart';
import { Promotion } from '../../../../@types/promotion';

export function checkValue(cart: Cart, promotion: Promotion): boolean {
  if (promotion.order_value) {
    const { order_value: orderValue } = promotion.order_value;
    const response = cart.subtotal >= orderValue;
    return response;
  }

  return false;
}
