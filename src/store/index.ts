import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { cartMiddlware } from './modules/cart/middleware';
import reactotron from '../config/reactotron';

function middlewares() {
  if (__DEV__) {
    return compose(applyMiddleware(cartMiddlware), reactotron.createEnhancer());
  } else return applyMiddleware(cartMiddlware);
}

// const store = createStore(reducers, applyMiddleware(cartMiddlware));
const store = createStore(reducers, middlewares());

export { store };
