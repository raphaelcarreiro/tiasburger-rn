export interface Coupon {
  id: number;
  name: string;
  description: string;
  discount: number;
  discount_type: string;
  valid_at: Date;
  usage_amount: number;
  activated: boolean;
}
