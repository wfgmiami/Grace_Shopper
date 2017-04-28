import { LOAD_CATEGORIES_SUCCESS } from '../constants';
import axios from 'axios';

const initialState = {
  color: [],
  shape: [],
  ideal_face_shape: [],
  material: []
};

const categoriesReducer = ( state = initialState, action ) => {

  switch ( action.type ) {
  case LOAD_CATEGORIES_SUCCESS:
    state = action.categories;
    break;
  default:
    break;
  }
  return state;
};

const loadCategorieSuccess = ( categories ) => ( {
  type: LOAD_CATEGORIES_SUCCESS,
  categories
} );

const loadCategories = () => {
  return ( dispatch ) => {
    axios.get( '/api/categories' )
      .then( ( { data } ) => {
        data = data.reduce( ( memo, cat ) => {
          if ( !memo[ cat.name ] ) {
            memo[ cat.name ] = [ cat.value ];
          } else {
            memo[ cat.name ].push( cat.value );
          }
          return memo;
        }, Object.assign( {}, initialState ) );

        Object.keys( data ).forEach( category => { data[ category ] = data[ category ].sort(); } );

        dispatch( loadCategorieSuccess( data ) );
      } );
  };
};

export { loadCategories };
export default categoriesReducer;

