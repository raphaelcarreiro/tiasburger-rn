import { Promotion } from '../../../@types/promotion';

export const SET_PROMOTIONS = '@promotion/SET_PROMOTIONS';

interface SetPromotionAction {
  type: typeof SET_PROMOTIONS;
  promotions: Promotion[];
}

export type PromotionTypeActions = SetPromotionAction;
