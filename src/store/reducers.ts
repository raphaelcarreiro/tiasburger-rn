import { combineReducers } from 'redux';
import restaurant from './modules/restaurant/reducer';

const reducers = combineReducers({ restaurant });

export default reducers;
