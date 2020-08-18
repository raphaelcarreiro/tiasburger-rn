import { Product } from './product';
import { Coupon } from './coupon';

export type CartRestaurantConfigs = {
  pizza_calculate: 'higher_value' | 'average_value';
  tax_mode: 'district' | 'distance' | 'no_tax' | 'order_value';
  tax_value: number;
  order_minimum_value: number;
};

export interface CartProduct extends CartPrepareProduct {
  additionalPrice: number;
  complementsPrice: number;
  promotion: { id: number; name: string } | null;
  product_price: number;
  final_price: number;
  formattedFinalPrice: string;
  formattedProductPrice: string;
  fromPromotion?: boolean;
}

interface CartPrepareProduct extends Product {
  amount: number;
}

export interface Cart {
  products: CartProduct[];
  product: CartPrepareProduct | null;
  total: number;
  history: CartProduct[];
  configs: CartRestaurantConfigs;
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
