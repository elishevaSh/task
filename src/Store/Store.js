import { combineReducers, createStore } from 'redux';
import userReducer from './Reducers/user';
const reducer = combineReducers({ userReducer });
const store = createStore(reducer);
window.store = store;
export default store;