// store.js
import { createStore, combineReducers } from 'redux';
import dropdownReducer from './reducers';

const rootReducer = combineReducers({
  dropdown: dropdownReducer,
});

const store = createStore(rootReducer);

export default store;