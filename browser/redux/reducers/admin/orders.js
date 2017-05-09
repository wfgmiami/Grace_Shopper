import axios from 'axios';

const token = localStorage.getItem( 'token' );

const initialState = {
  scope: 'all',
  orders: []
};

const orders = ( state = initialState, action ) => {
  switch ( action.type ) {
  case 'LOAD_ORDERS':
    state = Object.assign( {}, state, action.payload );
    break;
  case 'MODIFY_ORDER':
    state = Object.assign( {}, state, action.payload );
    state.orders = state.orders.map( order => {
      if ( order.id === action.payload.order.id ) {
        order.status = action.order.status;
      }
      return order;
    } ).filter( order => order.status === state.scope );
    break;
  default:
    break;
  }
  return state;
};

export const getOrders = scope => dispatch => {
  return axios.get( `/api/admin/order/${token}`, { params: { scope } || { scope: 'all' } } )
    .then( ( { data } ) => dispatch( { type: 'LOAD_ORDERS', payload: { orders: data, scope } } ) );
};

export const modifyOrder = ( order, status ) => dispatch => {
  return axios.put( `/api/admin/order/${token}/${order.id}`, { status } )
    .then( modOrder => dispatch( { type: 'MODIFY_ORDER', payload: { order: modOrder } } ) );
};

export default orders;

