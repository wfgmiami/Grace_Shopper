import { LOAD_PRODUCTS_SUCCESS } from '../constants';
import axios from 'axios';

const initialState = {
  products: [],
  offset: 1,
  count: 950
};

const productsReducer = ( state = initialState, action ) => {

  switch ( action.type ) {
  case LOAD_PRODUCTS_SUCCESS:
    state = Object.assign( {}, state, action.payload );
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

const loadProducts = ( offset, filters ) => {
  return ( dispatch ) => {
    axios.get( `/api/glasses/${offset}`, { params: { shape: 'Square', ideal_face_shape: 'Round' } } )
      .then( response => dispatch( loadProductSuccess( response.data.glasses, offset, response.data.count ) ) );
  };
};

export { loadProducts };
export default productsReducer;

