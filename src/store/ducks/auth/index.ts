import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

export const INITIAL_STATE: AuthState = {
  user: { email: '', password: '' },
  loading: false,
  error: false,
  logged: false,
};

export const AuthenticationReducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.AUTHENTICATE_REQUEST || AuthTypes.REGISTER_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.AUTHENTICATE_SUCCESS || AuthTypes.REGISTER_SUCCESS:
      return { ...state, logged: true, loading: false, error: false, user: action.payload };
    case AuthTypes.AUTHENTICATE_FAILURE || AuthTypes.REGISTER_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
