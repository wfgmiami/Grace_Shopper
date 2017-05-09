import axios from 'axios';

const orders = ( state = { list: [] }, action ) => {
  switch ( action.type ) {
  case 'LOAD_ORDERS':
    state = Object.assign( {}, state, action.payload );
    break;
  default:
    break;
  }
  return state;
};


export const loadOrders = () => dispatch => {
  const token = localStorage.getItem( 'token' );

  return axios.get( `/api/order/all/${token}` )
    .then( ( { data } ) => {
      dispatch( { type: 'LOAD_ORDERS', payload: { list: data } } );
    } );
};

export default orders;

