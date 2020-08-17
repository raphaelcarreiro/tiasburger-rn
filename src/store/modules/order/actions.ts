import {
  OrderTypeActions,
  SET_CUSTOMER,
  SET_SHIPMENT_ADDRESS,
  SET_SHIPMENT_METHOD,
  SET_PAYMENT_METHOD,
  SET_PRODUCTS,
  SET_CHANGE,
  CHANGE_CREDITCARD,
  CHANGE,
  SET_INITIAL_STATE,
  CLEAR_CARD,
  SET_COUPON,
  SET_TAX,
  SET_SCHEDULE,
  SET_DISCOUNT,
  SET_CARD,
} from './types';
import { Customer } from '../../../@types/customer';
import { OrderShipment, CreditCart } from '../../../@types/order';
import { PaymnentMethod } from '../../../@types/paymentMethod';
import { CartProduct } from '../../../@types/cart';
import { Coupon } from '../../../@types/coupon';

export function setCustomer(customer: Customer): OrderTypeActions {
  return {
    type: SET_CUSTOMER,
    customer,
  };
}

export function setShipmentAddress(address: OrderShipment): OrderTypeActions {
  return {
    type: SET_SHIPMENT_ADDRESS,
    address,
  };
}

export function setShipmentMethod(shipmentMethod: 'delivery' | 'customer_collect'): OrderTypeActions {
  return {
    type: SET_SHIPMENT_METHOD,
    shipmentMethod,
  };
}

export function setPaymentMethod(paymentMethod: PaymnentMethod): OrderTypeActions {
  return {
    type: SET_PAYMENT_METHOD,
    paymentMethod,
  };
}

export function setProducts(products: CartProduct[]): OrderTypeActions {
  return {
    type: SET_PRODUCTS,
    products,
  };
}

export function setChange(value: number): OrderTypeActions {
  return {
    type: SET_CHANGE,
    value,
  };
}

export function changeCreditCard(index: string, value: string): OrderTypeActions {
  return {
    type: CHANGE_CREDITCARD,
    index,
    value,
  };
}

export function orderChange(index: string, value: string): OrderTypeActions {
  return {
    type: CHANGE,
    index,
    value,
  };
}

export function setInitialState(): OrderTypeActions {
  return {
    type: SET_INITIAL_STATE,
  };
}

export function clearCard(): OrderTypeActions {
  return {
    type: CLEAR_CARD,
  };
}

export function setCoupon(coupon: Coupon): OrderTypeActions {
  return {
    type: SET_COUPON,
    coupon,
  };
}

export function setTax(tax: number): OrderTypeActions {
  return {
    type: SET_TAX,
    tax,
  };
}

export function setSchedule(date: Date | null): OrderTypeActions {
  return {
    type: SET_SCHEDULE,
    date,
  };
}

export function setDiscount(discount: number): OrderTypeActions {
  return {
    type: SET_DISCOUNT,
    discount,
  };
}

export function setCard(card: CreditCart): OrderTypeActions {
  return {
    type: SET_CARD,
    card,
  };
}
