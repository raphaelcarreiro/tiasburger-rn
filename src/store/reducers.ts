import { combineReducers } from 'redux';
import restaurant from './modules/restaurant/reducer';
import user from './modules/user/reducer';
import order from './modules/order/reducer';
import promotions from './modules/promotion/reducer';
import cart from './modules/cart/reducer';

const reducers = combineReducers({ restaurant, user, order, promotions, cart });

export default reducers;
