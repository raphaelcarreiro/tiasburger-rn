import { Product } from './product';
import { RestaurantConfig } from './restaurant';
import { Coupon } from './coupon';

export interface Cart {
  products: Product[];
  product: Prodct | null;
  total: number;
  history: Product[];
  configs: RestaurantConfig | null;
  coupon: Coupon | null;
  discount: number;
  subtotal: number;
  tax: number;
  formattedTax: string;
  formattedSubtotal: string;
  formattedDiscount: string;
  formattedTax: string;
  formattedTotal: string;
}
