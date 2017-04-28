import { UPDATE_CART } from '../constants';
import axios from 'axios';
import store from '../store';

const cartReducer = ( state = [], action ) => {

  switch ( action.type ) {
  case UPDATE_CART:
    state = action.cart;
    break;
  default:
    break;
  }
  return state;
};

const addToCart = item => dispatch => {
  const token = localStorage.getItem( 'token' );
  let currentCart;
  if ( token ) {
    currentCart = store.getState().cart;

    // Check if item is alrady in the cart
    const itemInCart = currentCart.filter(glass => glass.id === item.id).length;
    let itemQuantity = 1;

    if (itemInCart) {
      currentCart = currentCart.map(glass => {
        if (glass.id === item.id) {
          glass.lineitems.quantity++;
          itemQuantity = glass.lineitems.quantity;
        }
        return glass;
      });
    } else {
      currentCart.push(item);
    }

    item.quantity = itemQuantity;

    axios.post( `/api/order/pending/${token}`, {
      cart: [ item ]
    } )
    .then(({data}) => {
      if (data === 'Created') {
        dispatch( { type: UPDATE_CART, cart: currentCart } );
      }
    });
  } else {
    currentCart = JSON.parse( localStorage.getItem( 'cart' ) );
    if ( !currentCart ) currentCart = [];

    currentCart.push( item );

    localStorage.setItem( 'cart', JSON.stringify( currentCart ) );
    dispatch( { type: UPDATE_CART, cart: currentCart } );
  }
  console.log( currentCart );
};

const removeFromCart = item => dispatch => {
  let currentCart = JSON.parse( localStorage.getItem( 'cart' ) );

  currentCart = currentCart.filter( lineitem => lineitem.id !== item.id );

  localStorage.setItem( 'cart', JSON.stringify( currentCart ) );
  console.log( currentCart );
  dispatch( { type: UPDATE_CART, cart: currentCart } );
};

const loadCart = token => dispatch => {
  axios.get( `/api/order/pending/${token}` )
    .then( ( { data } ) => {
      dispatch( { type: UPDATE_CART, cart: data } );
    } );
};

const getCart = () => dispatch => {
  const token = localStorage.getItem( 'token' );

  if ( token ) {
    dispatch( loadCart( token ) );
  } else {
    let currentCart = localStorage.getItem( 'cart' );
    if ( !currentCart ) {
      localStorage.setItem( 'cart', JSON.stringify( [] ) );
    }
    currentCart = localStorage.getItem( 'cart' );

    dispatch( { type: 'UPDATE_CART', cart: currentCart } );
  }
};

export { addToCart, removeFromCart, getCart };
export default cartReducer;

