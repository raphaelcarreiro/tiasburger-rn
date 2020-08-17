import { Customer } from './customer';
import { CartProduct } from './cart';
import { Coupon } from './coupon';
import { PaymentMethod } from './paymentMethod';
import { AreaRegion } from './address';

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
  scheduled_at: Date | null;
  formattedScheduledAt: string | null;
  area_region: AreaRegion | null;
  distance: number | null;
  distance_tax: number | null;
}

export interface Order {
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
