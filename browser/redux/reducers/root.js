// This state will be shared across the whole app
// This state is called 'app' in /browser/redux/reducers/index.js

const initialState = {};

export default ( state = initialState, action ) => {
  let newState = null;
  switch ( action.type ) {
  case 'TODO': // Should be changed
    break;
  default:
    break;
  }

  return newState;
};

