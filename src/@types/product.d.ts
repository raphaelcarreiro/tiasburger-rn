import { Image } from './image';
import { Category } from './category';

export interface Product {
  id: number;
  name: string;
  url: string;
  activated: boolean;
  description: boolean;
  price: number;
  special_price: number | null;
  promotion_activated: boolean;
  formattedPrice: string;
  formattedSpecialPrice: string | null;
  image: Image;
  category: Category;
}
