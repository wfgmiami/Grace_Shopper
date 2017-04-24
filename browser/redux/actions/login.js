import axios from 'axios';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const loginSuccess = ( user ) => ( {
  type: LOGIN_SUCCESS,
  user
} );

const login = ( credentials ) => {
  return ( dispatch ) => {
    return axios.post( '/api/session', credentials )
      .then( response => response.data )
      .then( data => {
        localStorage.setItem( 'token', data.token );
        return axios.get( `/api/session/${data.token}` );
      } )
      .then( response => response.data )
      .then( user => dispatch( loginSuccess( user ) ) );
  };
};

export default login;

