import { LOAD_PRODUCTS_SUCCESS } from '../constants';
import axios from 'axios';

const initialState = {
  products: [],
  offset: 1,
  count: 950,
  filter: {}
};

const productsReducer = ( state = initialState, action ) => {

  switch ( action.type ) {
  case LOAD_PRODUCTS_SUCCESS:
    state = Object.assign( {}, state, action.payload );
    break;
  case 'CHANGE_FILTER':
    state = Object.assign( {}, state, action.filter );
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

const changeFilter = ( offset, filter) => dispatch => {
  dispatch({ type: 'CHANGE_FILTER', filter});
  dispatch(loadProducts( offset, filter ));
};

const loadProducts = ( offset, filter ) => {
  return ( dispatch ) => {
    axios.get( `/api/glasses/${offset}`, { params: filter } )
      .then( response => dispatch( loadProductSuccess( response.data.glasses, offset, response.data.count ) ) );
  };
};

export { loadProducts, changeFilter };
export default productsReducer;

