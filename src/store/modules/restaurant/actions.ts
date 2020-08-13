import { RestaurantActionTypes, SET_RESTAURANT, SET_RESTAURANT_IS_OPEN } from './types';
import { Restaurant } from '../../../@types/restaurant';

export function setRestaurant(restaurant: Restaurant): RestaurantActionTypes {
  return {
    type: SET_RESTAURANT,
    restaurant,
  };
}

export function setRestaurantIsOpen(state: boolean): RestaurantActionTypes {
  return {
    type: SET_RESTAURANT_IS_OPEN,
    state,
  };
}
