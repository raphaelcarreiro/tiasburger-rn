import { Customer } from '../../../@types/customer';
import { OrderShipment, CreditCart } from '../../../@types/order';
import { PaymentMethod } from '../../../@types/paymentMethod';
import { CartProduct } from '../../../@types/cart';
import { Coupon } from '../../../@types/coupon';

export const SET_CUSTOMER = '@order/SET_CUSTOMER';
export const SET_SHIPMENT_ADDRESS = '@order/SET_SHIPMENT_ADDRESS';
export const SET_SHIPMENT_METHOD = '@order/SET_SHIPMENT_METHOD';
export const SET_PAYMENT_METHOD = '@order/SET_PAYMENT_METHOD';
export const SET_PRODUCTS = '@order/SET_PRODUCTS';
export const SET_CHANGE = '@order/SET_CHANGE';
export const CHANGE_CREDITCARD = '@order/CHANGE_CREDITCARD';
export const CHANGE = '@order/CHANGE';
export const SET_INITIAL_STATE = '@order/SET_INITIAL_STATE';
export const CLEAR_CARD = '@order/CLEAR_CARD';
export const SET_COUPON = '@order/SET_COUPON';
export const SET_TAX = '@order/SET_TAX';
export const SET_SCHEDULE = '@order/SET_SCHEDULE';
export const SET_DISCOUNT = '@order/SET_DISCOUNT';
export const SET_CARD = '@order/SET_CARD';

interface SetCustomerAction {
  type: typeof SET_CUSTOMER;
  customer: Customer;
}

interface SetShipmentAddressAction {
  type: typeof SET_SHIPMENT_ADDRESS;
  address: OrderShipment;
}

interface SetShipmentMethodAction {
  type: typeof SET_SHIPMENT_METHOD;
  shipmentMethod: 'delivery' | 'customer_collect';
}

interface SetPaymentMethodAction {
  type: typeof SET_PAYMENT_METHOD;
  paymentMethod: PaymentMethod | null;
}

interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  products: CartProduct[];
}

interface SetChangeAction {
  type: typeof SET_CHANGE;
  value: number;
}

interface ChangeCreditCardAction {
  type: typeof CHANGE_CREDITCARD;
  index: string;
  value: string | number;
}

interface ChangeAction {
  type: typeof CHANGE;
  index: string;
  value: string | number;
}

interface SetInitialStateAction {
  type: typeof SET_INITIAL_STATE;
}

interface ClearCardAction {
  type: typeof CLEAR_CARD;
}
interface SetCouponAction {
  type: typeof SET_COUPON;
  coupon: Coupon | null;
}

interface SetTaxAction {
  type: typeof SET_TAX;
  tax: number;
}

interface SetScheduleAction {
  type: typeof SET_SCHEDULE;
  date: Date | null;
}

interface SetDiscountAction {
  type: typeof SET_DISCOUNT;
  discount: number;
}

interface SetCardAction {
  type: typeof SET_CARD;
  card: CreditCart;
}

export type OrderTypeActions =
  | SetCardAction
  | SetDiscountAction
  | SetScheduleAction
  | SetTaxAction
  | SetCouponAction
  | ClearCardAction
  | SetInitialStateAction
  | ChangeAction
  | ChangeCreditCardAction
  | SetChangeAction
  | SetProductsAction
  | SetPaymentMethodAction
  | SetShipmentMethodAction
  | SetShipmentAddressAction
  | SetCustomerAction
  | SetCouponAction
  | SetCardAction;
