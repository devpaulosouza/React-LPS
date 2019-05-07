import { call, put, takeEvery } from 'redux-saga/effects';
import { firebase } from '../../../firebase';
import {
  authSuccess,
  authFailure,
  registerFailure,
  registerSuccess,
  logoutFailure,
  logoutSuccess,
} from './actions';
import { AuthTypes } from './types';

function* login(action) {
  try {
    const { payload } = action;

    const data = yield call(
      firebase.auth.signInWithEmailAndPassword,
      payload.email,
      payload.password,
    );

    yield put(authSuccess(data.user));
  } catch (err) {
    yield put(authFailure(err));
  }
}

function* register(action) {
  try {
    const { payload } = action;

    const data = yield call(
      firebase.auth.createUserWithEmailAndPassword,
      payload.email,
      payload.password,
    );
    yield put(registerSuccess(data.user));
  } catch (err) {
    yield put(registerFailure(err));
  }
}

function* logout(action) {
  try {
    yield call(firebase.auth.signOut);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailure(err));
  }
}

export function* watchLogin() {
  yield takeEvery(AuthTypes.AUTHENTICATE_REQUEST, login);
}

export function* watchRegister() {
  yield takeEvery(AuthTypes.REGISTER_REQUEST, register);
}

export function* watchLogout() {
  yield takeEvery(AuthTypes.LOGOUT_REQUEST, logout);
}
