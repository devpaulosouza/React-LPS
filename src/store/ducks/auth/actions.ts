import { action } from 'typesafe-actions';
import { AuthTypes, User } from './types';

export const authRequest = (user: User) => action(AuthTypes.AUTHENTICATE_REQUEST, user);

export const authSuccess = (user: User) => action(AuthTypes.AUTHENTICATE_SUCCESS, user);

export const authFailure = (message: string) => action(AuthTypes.AUTHENTICATE_FAILURE, message);

export const registerRequest = (user: User) => action(AuthTypes.REGISTER_REQUEST, user);

export const registerSuccess = (user: User) => action(AuthTypes.REGISTER_SUCCESS, user);

export const registerFailure = (message: string) => action(AuthTypes.REGISTER_FAILURE, message);

export const logoutRequest = () => action(AuthTypes.LOGOUT_REQUEST);

export const logoutSuccess = () => action(AuthTypes.LOGOUT_SUCCESS);

export const logoutFailure = (message: string) => action(AuthTypes.LOGOUT_FAILURE);
