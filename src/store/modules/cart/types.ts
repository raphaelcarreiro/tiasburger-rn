import { Cart, CartRestaurantConfigs, CartProduct } from '../../../@types/cart';
import { Promotion } from '../../../@types/promotion';
import { Coupon } from '../../../@types/coupon';
import { Product } from '../../../@types/product';

export const SET_CART = '@cart/SET_CART';
export const PREPARE_PRODUCT = '@cart/PREPARE_PRODUCT';
export const ADD_PRODUCT = '@cart/ADD_PRODUCT';
export const PROMOTION_ADD_PRODUCT = '@cart/PROMOTION_ADD_PRODUCT';
export const REMOVE_PRODUCT = '@cart/REMOVE_PRODUCT';
export const PROMOTION_REMOVE_PRODUCT = '@cart/PROMOTION_REMOVE_PRODUCT';
export const INACTIVE_PROMOTION_REMOVE_PRODUCT = '@cart/INACTIVE_PROMOTION_REMOVE_PRODUCT';
export const UPDATE_PRODUCT = '@cart/UPDATE_PRODUCT';
export const RESTORE_CART = '@cart/RESTORE_CART';
export const CREATE_HISTORY = '@cart/CREATE_HISTORY';
export const CLEAR_CART = '@cart/CLEAR_CART';
export const SET_CONFIGS = '@cart/SET_CONFIGS';
export const SET_COUPON = '@cart/SET_COUPON';
export const REMOVE_COUPON = '@cart/REMOVE_COUPON';
export const SET_TAX = '@cart/SET_TAX';
export const SET_DISCOUNT = '@cart/SET_DISCOUNT';
export const UPDATE_TOTAL = '@cart/UPDATE_TOTAL';

interface SetCartAction {
  type: typeof SET_CART;
  cart: Cart;
}
interface PrepareProductAction {
  type: typeof PREPARE_PRODUCT;
  amount: number;
  product: Product;
}
interface AddProductAction {
  type: typeof ADD_PRODUCT;
}
interface PromotionAddProductAction {
  type: typeof PROMOTION_ADD_PRODUCT;
  promotionId: number;
  promotionName: string;
}
interface RemoveProductAction {
  type: typeof REMOVE_PRODUCT;
  productUid: number;
}
interface PromotionRemoveProductAction {
  type: typeof PROMOTION_REMOVE_PRODUCT;
  promotionId: number;
}
interface InactivePromotionRemoveProduct {
  type: typeof INACTIVE_PROMOTION_REMOVE_PRODUCT;
  promotions: Promotion[];
}
interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  product: CartProduct;
  amount: number;
}
interface RestoreCartAction {
  type: typeof RESTORE_CART;
}
interface CreateHistoryAction {
  type: typeof CREATE_HISTORY;
  products: CartProduct[];
}
interface ClearCartAction {
  type: typeof CLEAR_CART;
}
interface SetConfigsAction {
  type: typeof SET_CONFIGS;
  configs: CartRestaurantConfigs;
}
interface SetCouponAction {
  type: typeof SET_COUPON;
  coupon: Coupon;
}
interface RemoveCouponAction {
  type: typeof REMOVE_COUPON;
}
interface SetTaxAction {
  type: typeof SET_TAX;
  tax: number;
}
interface SetDiscountAction {
  type: typeof SET_DISCOUNT;
  discount: number;
  discountType: 'percent' | 'value';
}
interface UpdateTotalAction {
  type: typeof UPDATE_TOTAL;
  shipmentMethod: 'delivery' | 'customer_collect';
}

export type CartActions =
  | SetCartAction
  | PrepareProductAction
  | AddProductAction
  | PromotionAddProductAction
  | RemoveProductAction
  | PromotionRemoveProductAction
  | InactivePromotionRemoveProduct
  | UpdateProductAction
  | RestoreCartAction
  | CreateHistoryAction
  | ClearCartAction
  | SetConfigsAction
  | SetCouponAction
  | RemoveCouponAction
  | SetTaxAction
  | SetDiscountAction
  | UpdateTotalAction;
