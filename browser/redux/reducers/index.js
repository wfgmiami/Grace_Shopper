// Just combine reducers defined in other files in this folder

import { combineReducers } from 'redux';

import rootReducer from './root';
import products from './products';
import categories from './categories';
import authReducer from './auth';
import cart from './cart';
import users from './admin/users';

export default combineReducers( {
  app: rootReducer,
  auth: authReducer,
  products,
  categories,
  cart,
  users
} );

