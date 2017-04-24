// Just combine reducers defined in other files in this folder

import { combineReducers } from 'redux';

import rootReducer from './root';
import products from './products';
import categories from './categories';
import authReducer from './auth';

export default combineReducers( {
  app: rootReducer,
  auth: authReducer,
  products,
  categories
} );

