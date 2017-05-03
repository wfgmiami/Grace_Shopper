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
    const itemInCart = currentCart.filter( glass => glass.id === item.id ).length;
    let itemQuantity = 1;

    if ( itemInCart ) {
      currentCart = currentCart.map( glass => {
        if ( glass.id === item.id ) {
          glass.lineitems.quantity++;
          itemQuantity = glass.lineitems.quantity;
        }
        return glass;
      } );
    } else {
      currentCart.push( item );
    }

    item.quantity = itemQuantity;

    axios.post( `/api/order/pending/${token}`, {
        cart: [ item ]
      } )
      .then( ( { data } ) => {
        if ( data === 'Created' ) {
          dispatch( { type: UPDATE_CART, cart: currentCart } );
        }
      } );
  } else {
    currentCart = JSON.parse( localStorage.getItem( 'cart' ) );
    if ( !currentCart ) currentCart = [];

    // Check if item is alrady in the cart
    const itemInCart = currentCart.filter( glass => glass.id === item.id ).length;
    // let itemQuantity = 1;

    if ( itemInCart ) {
      currentCart = currentCart.map( glass => {
        if ( glass.id === item.id ) {
          glass.lineitems.quantity++;
          // itemQuantity = glass.lineitems.quantity;
        }
        return glass;
      } );
    } else {
      currentCart.push( item );
    }

    localStorage.setItem( 'cart', JSON.stringify( currentCart ) );
    dispatch( { type: UPDATE_CART, cart: currentCart } );
  }
  console.log( currentCart );
};

const removeFromCart = item => dispatch => {
  let currentCart = JSON.parse( localStorage.getItem( 'cart' ) );
  console.log(item)
  currentCart = currentCart.filter( lineitem => lineitem.id !== item.id );

  localStorage.setItem( 'cart', JSON.stringify( currentCart ) );
  console.log( currentCart );
  dispatch( { type: UPDATE_CART, cart: currentCart } );
};

const integrateCart = ( localCart, token ) => {
  console.log( 'integrateCart' );
  return axios.post( `api/order/integrate/${token}`, { cart: JSON.parse( localCart ) } );
};

const loadCart = ( token, dispatch ) => {
  console.log( 'loadCart' );
  axios.get( `/api/order/pending/${token}` )
    .then( ( { data } ) => {
      dispatch( { type: UPDATE_CART, cart: data } );
    } )
    // If something goes wrong, it's because of the token
    .catch( () => localStorage.removeItem( 'token' ) );
};

const retrieveCart = token => dispatch => {
  if ( localStorage.getItem( 'cart' ) ) {
    integrateCart( localStorage.getItem( 'cart' ), token )
      .then( () => localStorage.removeItem( 'cart' ) )
      .then( () => {
        console.log( 'loading cart' );
        loadCart( token, dispatch );
      } );
  } else {
    loadCart( token, dispatch );
  }
};

const getCart = () => dispatch => {
  const token = localStorage.getItem( 'token' );

  if ( token ) {
    dispatch( retrieveCart( token ) );
  } else {
    let currentCart = localStorage.getItem( 'cart' );
    if ( !currentCart ) {
      localStorage.setItem( 'cart', JSON.stringify( [] ) );
    }
    currentCart = localStorage.getItem( 'cart' );

    dispatch( { type: UPDATE_CART, cart: currentCart } );
  }
};

export { addToCart, removeFromCart, getCart };
export default cartReducer;

