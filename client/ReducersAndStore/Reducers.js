import { combineReducers } from 'redux';

// import all reducers here
import userReducers from './userReducers';


// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  user: userReducers,
});

// make the combined reducers available for import
export default reducers;
