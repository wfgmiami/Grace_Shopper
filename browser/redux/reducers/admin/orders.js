import axios from 'axios';

const token = localStorage.getItem( 'token' );

const users = ( state = [], action ) => {
  switch ( action.type ) {
  case 'LOAD_ORDERS':
    state = action.users;
    break;
  case 'MODIFY_ORDER':
    state = state.filter( user => user.id !== action.user.id );
    break;
  default:
    break;
  }
  return state;
};

export const getOrders = scope => dispatch => {
  axios.get( `/api/admin/order/${token}`, { params: { scope } || { scope: 'all' } } )
    .then( ( { data } ) => dispatch( { type: 'LOAD_ORDERS', users: data } ) );
};

export const modifyOrder = ( order, mods ) => dispatch => {
  axios.put( `/api/admin/order/${token}/${order.id}`, mods )
    .then( modOrder => dispatch( { type: 'MODIFY_ORDER', user: modOrder } ) );
};

export default users;

