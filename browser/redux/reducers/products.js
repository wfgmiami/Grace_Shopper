import { LOAD_PRODUCTS_SUCCESS } from '../constants';
import axios from 'axios';
import { browserHistory } from 'react-router';

const initialState = {
  products: [],
  offset: 1,
  count: 950,
  filter: {},


};

const productsReducer = ( state = initialState, action ) => {

  switch ( action.type ) {
  case LOAD_PRODUCTS_SUCCESS:
    state = Object.assign( {}, state, action.payload );
    break;
  case 'CHANGE_FILTER':
    state = Object.assign( {}, state, action.filter );
    break;
  case 'SEARCH_FILTER':
    state = Object.assign( {}, state, action.search );
    break;
  default:
    break;

  }
  return state;
};

const loadProductSuccess = ( products, offset, count ) => ( {
  type: LOAD_PRODUCTS_SUCCESS,
  payload: { products, offset, count }
} );

const loadProducts = ( offset, filter ) => {
  return ( dispatch ) => {
    return axios.get( `/api/glasses/${offset}`, { params: filter } )
      .then( response => dispatch( loadProductSuccess( response.data.glasses, offset, response.data.count ) ) );
  };
};

const loadSearchProducts = ( input ) => {
  return ( dispatch ) => {
    return axios.get( `/api/glasses/search`, { params: input } )
      .then( res => dispatch( loadProductSuccess( res.data.glasses, offset, res.data.count ) ) );
  };
};

const changeFilter = ( offset, filter ) => dispatch => {
  // const query = Object.keys(filter).map(k => filter[k].map(flt => `${k}[]=${encodeURIComponent(flt)}`)).join('&');
  dispatch( { type: 'CHANGE_FILTER', filter } );
  dispatch( loadProducts( offset, filter ) );
  // console.log(query);
};

const searchFilter = ( input ) => dispatch => {
  dispatch( { type: 'SEARCH_FILTER', search: { products: input } } );
};

export { loadProducts, changeFilter, searchFilter };
export default productsReducer;

