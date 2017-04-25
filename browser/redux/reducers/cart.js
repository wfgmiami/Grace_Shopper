import { LOAD_PRODUCTS_SUCCESS } from '../constants';
import axios from 'axios';

const cartReducer = ( state = {}, action ) => {

  switch ( action.type ) {
  case 'UPDATE_CART':
    state = action.cart;
    break;
  default:
    break;
  }
  return state;
};

const loadProductSuccess = ( products ) => ( {
  type: LOAD_PRODUCTS_SUCCESS,
  products: products
} );

const addToCart = item => dispatch => {
  let currentCart = JSON.parse( localStorage.getItem( 'cart' ) );
  if (!currentCart) currentCart = {};
  currentCart[item.name] = currentCart[item.name] ? 1 : currentCart[item.name] + item.quantity;
  localStorage.setItem( 'cart', JSON.stringify( currentCart ) );
  console.log(currentCart);
  dispatch( { type: 'UPDATE_CART', cart: currentCart } );
};

const removeFromCart = item => dispatch => {
  let currentCart = JSON.parse( localStorage.getItem( 'cart' ) );
  delete currentCart[item.name];
  localStorage.setItem( 'cart', JSON.stringify( currentCart ) );
  console.log(currentCart);
  dispatch( { type: 'UPDATE_CART', cart: currentCart } );
};

export { addToCart, removeFromCart };
export default cartReducer;

