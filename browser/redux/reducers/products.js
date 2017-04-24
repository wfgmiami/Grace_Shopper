import { LOAD_PRODUCTS_SUCCESS } from '../constants';
import axios from 'axios';

const productsReducer = ( state = [], action ) => {

  switch ( action.type ) {
  case LOAD_PRODUCTS_SUCCESS:
    state = action.products;
    break;
  default:
    break;
  }
  return state;
};

const loadProductSuccess = ( products ) => ( {
  type: LOAD_PRODUCTS_SUCCESS,
  products: products
} );

const loadProducts = () => {
  return ( dispatch ) => {
    axios.get( '/api/glasses' )
      .then( response => dispatch( loadProductSuccess( response.data ) ) );
  };
};

export { loadProducts };
export default productsReducer;

