import {
  SET_CART,
  PREPARE_PRODUCT,
  ADD_PRODUCT,
  PROMOTION_ADD_PRODUCT,
  REMOVE_PRODUCT,
  PROMOTION_REMOVE_PRODUCT,
  INACTIVE_PROMOTION_REMOVE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_HISTORY,
  RESTORE_CART,
  CLEAR_CART,
  SET_CONFIGS,
  SET_COUPON,
  REMOVE_COUPON,
  UPDATE_TOTAL,
  SET_TAX,
  SET_DISCOUNT,
  CartTypeActions,
} from './types';
import { Cart, CartRestaurantConfigs, CartProduct } from '../../../@types/cart';
import { Promotion } from '../../../@types/promotion';
import { Coupon } from '../../../@types/coupon';
import { Product } from '../../../@types/product';

export function setCart(cart: Cart): CartTypeActions {
  return {
    type: SET_CART,
    cart,
  };
}

export function prepareProduct(product: Product, amount: number): CartTypeActions {
  return {
    type: PREPARE_PRODUCT,
    product,
    amount,
  };
}

export function addToCart(): CartTypeActions {
  return {
    type: ADD_PRODUCT,
  };
}

export function promotionAddToCart(promotionId: number, promotionName: string): CartTypeActions {
  return {
    type: PROMOTION_ADD_PRODUCT,
    promotionId,
    promotionName,
  };
}

export function removeFromCart(productUid: number): CartTypeActions {
  return {
    type: REMOVE_PRODUCT,
    productUid,
  };
}

export function promotionRemoveFromCart(promotionId: number): CartTypeActions {
  return {
    type: PROMOTION_REMOVE_PRODUCT,
    promotionId,
  };
}

export function inactivePromotionRemoveFromCart(promotions: Promotion[]): CartTypeActions {
  return {
    type: INACTIVE_PROMOTION_REMOVE_PRODUCT,
    promotions,
  };
}

export function updateProductFromCart(product: CartProduct, amount: number): CartTypeActions {
  return {
    type: UPDATE_PRODUCT,
    product,
    amount,
  };
}

export function createHistory(products: CartProduct[]): CartTypeActions {
  return {
    type: CREATE_HISTORY,
    products,
  };
}

export function restoreCart(): CartTypeActions {
  return {
    type: RESTORE_CART,
  };
}

export function clearCart(): CartTypeActions {
  return {
    type: CLEAR_CART,
  };
}

export function setConfigs(configs: CartRestaurantConfigs): CartTypeActions {
  return {
    type: SET_CONFIGS,
    configs,
  };
}

export function setCoupon(coupon: Coupon): CartTypeActions {
  return {
    type: SET_COUPON,
    coupon,
  };
}

export function removeCoupon(): CartTypeActions {
  return {
    type: REMOVE_COUPON,
  };
}

export function updateTotal(shipmentMethod: 'delivery' | 'customer_collect'): CartTypeActions {
  return {
    type: UPDATE_TOTAL,
    shipmentMethod,
  };
}

export function setTax(tax: number): CartTypeActions {
  return {
    type: SET_TAX,
    tax,
  };
}

export function setDiscount(discountType: 'percent' | 'value', discount: number): CartTypeActions {
  return {
    type: SET_DISCOUNT,
    discount,
    discountType,
  };
}
