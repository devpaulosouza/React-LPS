import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

export const INITIAL_STATE: AuthState = {
  user: { email: '', password: '' },
  loading: false,
  error: false,
  logged: false,
  errorCode: '',
};

export const AuthenticationReducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.AUTHENTICATE_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        logged: true,
        loading: false,
        error: false,
        user: action.payload,
        errorCode: '',
      };
    case AuthTypes.AUTHENTICATE_FAILURE:
      return { ...state, loading: false, error: true, errorCode: action.payload };
    case AuthTypes.REGISTER_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.REGISTER_SUCCESS:
      return { ...state, logged: true, loading: false, error: false, user: action.payload };
    case AuthTypes.REGISTER_FAILURE:
      return { ...state, loading: false, error: true, errorCode: action.payload };
    case AuthTypes.LOGOUT_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.LOGOUT_SUCCESS:
      return { ...state, loading: false, logged: false };
    case AuthTypes.LOGOUT_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
