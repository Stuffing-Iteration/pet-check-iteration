import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import petReducers from './petReducer';


// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(
  petReducers,
  composeWithDevTools()
);

export default store;