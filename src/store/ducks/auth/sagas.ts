import { call, put, takeEvery } from 'redux-saga/effects';
import { firebase } from '../../../firebase';
import { authSuccess, authFailure, registerFailure, registerSuccess } from './actions';
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
  console.log('registrando');
  try {
    const { payload } = action;

    console.log(payload);

    const data = yield call(
      firebase.auth.createUserWithEmailAndPassword,
      payload.email,
      payload.password,
    );
    console.log(data);
    yield put(registerSuccess(data.user));
  } catch (err) {
    console.log(err);
    yield put(registerFailure(err));
  }
}

export function* watchLogin() {
  yield takeEvery(AuthTypes.AUTHENTICATE_REQUEST, login);
}

export function* watchRegister() {
  yield takeEvery(AuthTypes.REGISTER_REQUEST, register);
}
