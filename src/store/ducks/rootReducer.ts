import { combineReducers } from 'redux';
import { AuthenticationReducer } from './auth';

export default combineReducers({
  auth: AuthenticationReducer,
});
