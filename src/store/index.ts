import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { cartMiddlware } from './modules/cart/middleware';

const store = createStore(reducers, applyMiddleware(cartMiddlware));

export { store };
