export enum AuthTypes {
  AUTHENTICATE_REQUEST = '@auth/AUTHENTICATE_REQUEST',
  AUTHENTICATE_SUCCESS = '@auth/AUTHENTICATE_SUCCESS',
  AUTHENTICATE_FAILURE = '@auth/AUTHENTICATE_FAILURE',
  REGISTER_REQUEST = '@auth/REGISTER_REQUEST',
  REGISTER_SUCCESS = '@auth/REGISTER_SUCCESS',
  REGISTER_FAILURE = '@auth/REGISTER_FAILURE',
}

export interface User {
  email: string;
  password: string;
}

export interface AuthState {
  readonly logged: boolean;
  readonly error: boolean;
  readonly loading: boolean;
  readonly user: User;
}
