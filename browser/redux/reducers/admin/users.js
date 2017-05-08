import axios from 'axios';

const token = localStorage.getItem( 'token' );

const users = ( state = [], action ) => {
  switch ( action.type ) {
  case 'LOAD_USERS':
    state = action.users;
    break;
  case 'DELETE_USER':
    state = state.filter( user => user.id !== action.user.id );
    break;
  default:
    break;
  }
  return state;
};

export const getUsers = () => dispatch => {
  return axios.get( `/api/admin/users/${token}` )
    .then( ( { data } ) => dispatch( { type: 'LOAD_USERS', users: data } ) );
};

export const destroyUser = user => dispatch => {
  return axios.delete( `/api/admin/users/${token}/${user.id}` )
    .then( () => dispatch( { type: 'DELETE_USER', user } ) );
};

export const modifyUser = (user, mods) => dispatch => {
  return axios.put( `/api/admin/users/${token}/${user.id}`, mods)
    .then( modUser => dispatch( { type: 'MODIFY_USER', user: modUser }));
};

export default users;

