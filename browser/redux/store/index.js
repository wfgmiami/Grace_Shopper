import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import { loadProducts } from '../reducers/products';
import { loadCategories } from '../reducers/categories';
import { loadCart } from '../reducers/cart';
import { me } from '../reducers/auth';
import reducer from '../reducers';


let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;

store.dispatch(loadProducts());
store.dispatch(loadCategories());
store.dispatch(me());

let token = localStorage.getItem('token');

if (token) {
  store.dispatch(loadCart(token));
} else {
  let currentCart = localStorage.getItem('cart');
  if (!currentCart) {
    localStorage.setItem('cart', JSON.stringify({}));
  }
  currentCart = localStorage.getItem('cart');
  console.log(currentCart);

  store.dispatch({ type: 'UPDATE_CART', cart: currentCart });
}
