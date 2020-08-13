import { PromotionTypeActions, SET_PROMOTIONS } from './type';
import { Promotion } from '../../../@types/promotion';

export function setPromotions(promotions: Promotion[]): PromotionTypeActions {
  return {
    type: SET_PROMOTIONS,
    promotions,
  };
}
