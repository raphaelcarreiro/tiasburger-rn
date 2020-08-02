import { combineReducers } from 'redux';
import restaurant from './modules/restaurant/reducer';
import user from './modules/user/reducer';

const reducers = combineReducers({ restaurant, user });

export default reducers;
