import axios from 'axios';

const token = localStorage.getItem( 'token' );

const users = ( state = [], action ) => {
  switch ( action.type ) {
  case 'LOAD_ORDERS':
    state = action.users;
    break;
  case 'MODIFY_ORDER':
    state = state.map( order => {
      if (order.id === action.order.id) {
        order.status = action.order.status;
      }
      return order;
    } );
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

export const modifyOrder = ( order, status ) => dispatch => {
  axios.put( `/api/admin/order/${token}/${order.id}`, { status } )
    .then( modOrder => dispatch( { type: 'MODIFY_ORDER', order: modOrder } ) );
};

export default users;

