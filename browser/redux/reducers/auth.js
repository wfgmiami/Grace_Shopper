import { LOGIN_SUCCESS, LOGOUT_SUCCESS, INVALID_LOGIN } from '../constants';
import axios from 'axios';

const loginSuccess = ( user ) => ( {
  type: LOGIN_SUCCESS,
  user
} );

const logoutSuccess = () => ( {
  type: LOGOUT_SUCCESS
} );

const loginFail = () => ( {
  type: INVALID_LOGIN
} );

const invalidLogin = () => {
  return ( dispatch ) => {
    dispatch( loginFail() );
  };
};

const me = () => {
  return ( dispatch ) => {
    const token = localStorage.getItem( 'token' );
    if ( !token ) return;
    return axios.get( `/api/session/${token}` )
      .then( response => response.data )
      .then( user => dispatch( loginSuccess( user ) ) );
  };
};

const logout = ( user ) => {
  localStorage.setItem( 'token', '' );
  return ( dispatch ) => {
    dispatch( logoutSuccess() );
  };
};

const login = ( credentials ) => {
  return ( dispatch ) => {
    axios.post( '/api/session', credentials )
      .then( response => response.data )
      .then( ( { token } ) => {
        localStorage.setItem( 'token', token );
        return axios.get( `/api/session/${token}` )
          .then( response => response.data )
          .then( user => dispatch( loginSuccess( user ) ) );
      } )
      .catch( () => dispatch( invalidLogin( loginFail() ) ) );
  };
};

const authReducer = ( state = {}, action ) => {
  switch ( action.type ) {
  case LOGIN_SUCCESS:
    state = Object.assign( {}, state, { user: action.user, invalidLogin: false } );
    break;
  case LOGOUT_SUCCESS:
    state = Object.assign( {}, state, { user: '' } );
    break;
  case INVALID_LOGIN:
    state = Object.assign( {}, state, { invalidLogin: true } );
    break;
  default:
    break;
  }
  return state;
};

export { login, me, logout };

export default authReducer;

