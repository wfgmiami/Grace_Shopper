import axios from 'axios';

const token = localStorage.getItem( 'token' );

const users = ( state = [], action ) => {
  switch ( action.type ) {
  case 'LOAD_USERS':
    state = action.users;
    break;
  default:
    break;
  }
  return state;
};

export const getUsers = () => dispatch => {
  axios.get( `/api/admin/users/${token}` )
    .then( ( { data } ) => dispatch({ type: 'LOAD_USERS', users: data }) );
};

export default users;

