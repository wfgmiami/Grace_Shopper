import { UPDATE_CART } from '../constants';
import axios from 'axios';
import store from '../store';

const cartReducer = ( state = [], action ) => {

  switch ( action.type ) {
  case UPDATE_CART:
    console.log(action.cart);
    state = action.cart.slice();
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
    let newInfo = newCart( store.getState().cart, item );
    currentCart = newInfo.currentCart;
    item = newInfo.item;

    axios.post( `/api/order/pending/${token}`, {
        cart: [ item ]
      } )
      .then( () => {
        dispatch( { type: UPDATE_CART, cart: currentCart } );
      } );
  } else {
    currentCart = JSON.parse( localStorage.getItem( 'cart' ) );
    item.lineitems.price = item.price;

    currentCart = newCart( currentCart, item ).currentCart;

    localStorage.setItem( 'cart', JSON.stringify( currentCart ) );
    dispatch( { type: UPDATE_CART, cart: currentCart } );
  }
  console.log( currentCart );

  function newCart( cart, insItem ) {
    // Check if item is alrady in the cart
    const itemInCart = cart.filter( glass => glass.id === insItem.id ).length;
    let itemQuantity = 1;
    let updatedCart = cart;

    if ( itemInCart ) {
      updatedCart = cart.map( glass => {
        if ( glass.id === insItem.id ) {
          glass.lineitems.quantity++;
          itemQuantity = glass.lineitems.quantity;
        }
        glass.lineitems.price = glass.price || glass.lineitems.price;
        return Object.assign( {}, glass );
      } );
      insItem.lineitems = { quantity: itemQuantity, price: item.price };
    } else {
      insItem.lineitems = { quantity: 1, price: insItem.price };
      updatedCart.push( insItem );
    }
    return { currentCart: updatedCart, item: insItem };
  }
};

const removeFromCart = item => dispatch => {
  const token = localStorage.getItem( 'token' );
  let currentCart = JSON.parse( localStorage.getItem( 'cart' ) ) || store.getState().cart;
  currentCart = currentCart.filter( lineitem => lineitem.id !== item.id );
  if ( token ) {
    axios.delete( `/api/order/pending/${token}/${item.id}` )
      .then( ( { data } ) => console.log( data ) );
  } else {
    localStorage.setItem( 'cart', JSON.stringify( currentCart ) );
  }
  console.log( currentCart );
  dispatch( { type: UPDATE_CART, cart: currentCart } );
};

const integrateCart = ( localCart, token ) => {
  return axios.post( `/api/order/integrate/${token}`, { cart: JSON.parse( localCart ) } );
};

const loadCart = ( token, dispatch ) => {
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
    console.log(currentCart);
    if ( !currentCart ) {
      localStorage.setItem( 'cart', '[]' );
    }
    currentCart = localStorage.getItem( 'cart' );

    dispatch( { type: UPDATE_CART, cart: currentCart } );
  }
};

export { addToCart, removeFromCart, getCart };
export default cartReducer;

