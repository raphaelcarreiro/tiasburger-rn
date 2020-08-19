import { Customer } from './customer';
import { CartProduct } from './cart';
import { Coupon } from './coupon';
import { PaymentMethod } from './paymentMethod';
import { AreaRegion } from './address';
import { CreatedOrderProduct } from './product';

export interface CreditCart {
  number: string;
  name: string;
  card_id?: string;
  expiration_date: string;
  cvv: string;
  cpf: string;
}

export interface OrderShipment {
  id: number;
  order_id?: number;
  customer_address_id?: number;
  restaurant_address_id?: number;
  address: string;
  number: string;
  complement: string | null;
  postal_code: string;
  district: string;
  city: string;
  region: string;
  shipment_method: 'delivery' | 'customer_collect';
  scheduled_at: string | null;
  formattedScheduledAt: string | null;
  area_region: AreaRegion | null;
  distance: number | null;
  distance_tax: number | null;
}

interface OrderStatus {
  id: number;
  status: OrderStatusOptions;
  statusName: string;
  created_at: string;
  formattedDate?: string;
}

export interface Order {
  id?: number;
  formattedId?: string;
  shipment: OrderShipment;
  customer: Customer | null;
  paymentMethod: PaymentMethod | null;
  products: CartProduct[];
  change: number;
  creditCard: CreditCart;
  coupon: Coupon | null;
  tax: number;
  discount: number;
  formattedChange: string;
  formattedTax: string;
}

export type OrderStatusOptions = 'p' | 'o' | 'a' | 'd' | 'c' | 'x';

interface PicPayPayment {
  payment_url: string;
}
export interface CreatedOrder {
  id: number;
  formattedId: string;
  customer: Customer;
  payment_method: PaymentMethod;
  shipment: OrderShipment;
  products: CreatedOrderProduct[];
  coupon: Coupon;
  encrypted_id: string;
  formattedId: string;
  created_at: string;
  formattedDate: string;
  dateDistance: string;
  subtotal: number;
  formattedSubtotal: string;
  formattedDiscount: string;
  tax: number;
  formattedTax: string;
  discount: number;
  formattedDiscount: string;
  change: number;
  formattedChange: string;
  total: number;
  formattedTotal: string;
  order_status: OrderStatus[];
  status: OrderStatusOptions;
  statusName: string;
  picpay_payment: PicPayPayment;
}
