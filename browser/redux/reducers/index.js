// Just combine reducers defined in other files in this folder

import { combineReducers } from 'redux';

import rootReducer from './root';

export default combineReducers({
  app: rootReducer
});
